const restify = require('restify')
const bluebird = require('bluebird')
const mongoose = require('mongoose')
const requestIp = require('request-ip')
const server = restify.createServer()
const dbOptions = {'promiseLibrary': bluebird}


const db = mongoose.createConnection(process.env.MONGO_DB_URI, dbOptions)

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
   console.log('connected')
})

const users = require('./models/users')
const tokens = require('./models/tokens')
const helpers = require('./lib/helpers')
const logs = require('./models/last_login')

const checkUserByName = helpers.checkUserByName
const checkUserById = helpers.checkUserById
const userJoinUpdate = helpers.userJoinUpdate
const saveLog = helpers.saveLog
const isAdmin = helpers.isAdmin
const User = users.User
const Token = tokens.Token
const Log = logs.Log

User.find({}, function(err, user) {
    if (err) {
       console.log(err)
    }
    console.log(user)
})

server.use(requestIp.mw())
server.use(restify.plugins.bodyParser());

server.post('/api/login', function(req, res, next) {
    User.findOne(req.body, function(err, user) {
        if (err) {
            res.json({
                'data': `Error occured: ${err}`,
                'type': false
            })
        } else if (user) {
            if (user.status === 'active') {
                userJoinUpdate(req, user)

                saveLog(req, user)

                const tokenModel = new Token({'user_id': user.id})

                tokenModel.save(function(error, token) {
                     if (error) {
                        console.log(`Error occured: ${error}`)
                    } else {
                        console.log(token)
                    }
                })
                res.json(200, {
                    'data': user,
                    'token': tokenModel.id
                })
            } else {
                res.json(400, {'data': `You status: ${user.status}`})
            }
        } else {
            res.json(400, {'data': 'incorrect email/password'})
        }
    })
    next()
});

server.get(
    '/api/users',
    isAdmin,
    function(req, res, next) {
        User.find({}, function(err, user) {
            if (err) {
               console.log(err)
            }
            res.json(200, {'data': user})
        })
        next()
    }
)

server.get(
    '/api/logs/:token',
    function(req, res, next) {
        const username = req.params.username

        Log.find({username}, function(err, log) {
            if (err) {
               console.log(err)
            }
            res.json(200, {'data': log})
        })
        next()
    }
)

server.del(
    '/api/users/:id', isAdmin,
    function(req, res, next) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) {
            console.log('Delete error', err);
        } else if (user) {
                res.send(200, 'User delete')
        } else {
            res.json(400, {
            'error_msg': 'User not found',
            'success': false
            });
        }
    })
    Token.deleteMany({'user_id': req.params.id}, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('DELETE THE TOKENS')
        }
    })
    next();
}
);


server.post(
    '/api/users', isAdmin, checkUserByName,
    function(req, res, next) {
    if (typeof req.body.username === 'string' &&
        typeof req.body.password === 'string' &&
        typeof req.body.full_name === 'string') {

        const newUser = new User(req.body)

        newUser.created_at = new Date()

        newUser.save({'validateBeforeSave': true}, function(err, user) {
            if (err) {
                res.json(400, {
                    'data': `Error occured: ${err}`,
                    'type': false
                })
            } else if (user) {
                        res.json(201, {
                        'data': user,
                        'success': true
                    })
                } else {
                    res.json(400, {
                            'error_msg': 'Duplicate name',
                            'success': false
                    })
            }
        })
    }
    next()
    }
)

server.get(
    '/api/users/:id',
    isAdmin,
    function(req, res, next) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
               console.log(err)
            }
            res.json(200, {'data': user})
        })
        next();
    }
)

server.post(
    '/api/users/:id', checkUserById,
    function(req, res, next) {
        if (typeof req.body.is_admin === 'boolean' ||
            typeof req.body.status === 'string' ||
            typeof req.body.password === 'string') {
            isAdmin(req, res, next);
        } else {

            return next()
        }
   },
    function(req, res, next) {
        Token.findById(req.header('X-Auth-Token'), function(err, tok) {
        if (err) {
            res.send(400, 'Unauthorized')

            return next(false)
        } else if (tok) {
            User.findById(tok.user_id, function(error, raw) {
                if (err) {
                    console.log(err)
                }

                if (raw.id !== req.params.id) {
                    if (raw.is_admin === true) {

                        return next()

                    }
                        res.send(400, 'YOU ARE NOT ADMIN')

                        return next(false)
                }

                return next()
            })
        }
        })
    },
    async function(req, res, next) {
        if (typeof req.body.is_admin === 'boolean' ||
            typeof req.body.status === 'string' ||
            typeof req.body.password === 'string' ||
            typeof req.body.username === 'string' ||
            typeof req.body.full_name === 'string') {

            await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {'runValidators': true},
                function(error, raw) {
                if (error) {
                    res.send(400, `Error: ${error}`)

                    return next(false)
                }
                console.log('User data updated: ', raw)

                return next()
            }
            )
        } else {
            res.json(
                400,
                {
                    'error_msg': 'Enter the correct data',
                    'success': false
                }
            )

            return next(false)
        }

        return next()
    },
    function (req, res, next) {
        User.findById(req.params.id, function(err, user) {
            if (err) {
                console.log(err)
            } else {
                res.json(
                    200,
                    {
                        'data': user,
                        'success': true
                    }
                )
            }
        })

        return next()
    }
)

server.listen(8080, '0.0.0.0', function() {
  console.log('%s listening at %s', server.name, server.url);
});

