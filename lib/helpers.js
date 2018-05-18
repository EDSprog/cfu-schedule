
const users = require('../models/users')
const tokens = require('../models/tokens')
const logs = require('../models/last_login')

const User = users.User
const Token = tokens.Token
const Log = logs.Log

const isAdmin = function (req, res, next) {
    const token = req.header('X-Auth-Token')

    Token.findById(token, function(err, tok) {
        if (err) {
            res.send(400, 'Unauthorized')

            return next(false)

        } else if (tok) {

            User.findById(tok.user_id, function(error, raw) {
                if (err) {
                    console.log(err)
                }

                if (raw.is_admin === true) {

                    return next()

                }
                res.send(400, 'YOU ARE NOT ADMIN')

                return next(false)
            })
        } else {
            res.send(400, 'Unauthorized')

            return next(false)
        }
    })
}

const userJoinUpdate = function(req, user) {
    if (typeof user.joined_at !== 'object') {
        User.updateOne(
            req.body,
            {'joined_at': new Date()},
            function(error) {
                if (error) {
                    console.log('Error: ', error)
                }
            }
        )
    }
    User.updateOne(
        req.body,
        {'last_login_at': new Date()},
        function(error, raw) {
            if (error) {
                console.log('Error: ', error)
            } else {
                console.log('UPDATE last_login_at: ', raw)
            }
        }
    )
}

const saveLog = function(req, user) {
    const LogModel = new Log({
        'username': user.username,
        'login': new Date(),
        'userAgent': req.header('User-Agent'),
        'ip': req.clientIp
    })

    LogModel.save(function(error, log) {
        if (error) {
            console.log('Error: ', error)
        } else {
            console.log('Save Log: ', log)
        }
    })
}

const checkUserByName = async function (req, res, next) {
    if (req.body.username) {

        const user = await User.findOne({'username': req.body.username})

        if (user) {
            res.json(400, {
                'error_msg': 'Duplicate username',
                'success': false
            })

            return next(false)
        }

    }
    console.log('point user false')

    return next()
}

const checkUserById = function(req, res, next) {
    User.findById(req.params.id, function(err) {
        if (err) {
            res.send(400, 'The user is not found')

            return next(false)
        }

        return next()
    })
}

module.exports.checkUserByName = checkUserByName
module.exports.checkUserById = checkUserById
module.exports.isAdmin = isAdmin
module.exports.userJoinUpdate = userJoinUpdate
module.exports.saveLog = saveLog
