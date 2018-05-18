const bluebird = require('bluebird')
const mongoose = require('mongoose')
const dbOptions = {'promiseLibrary': bluebird}

const db = mongoose.createConnection(process.env.MONGO_DB_URI, dbOptions)
const Schema = mongoose.Schema


const UserSchema = new Schema({
    'created_at': Date,
    'full_name': {
        'maxlength': 50,
        'minlength': 4,
        'pattern': '^[a-zA-Z]+$',
        'required': true,
        'type': String
    },
    'is_admin': {
        'default': false,
        'type': Boolean
    },
    'joined_at': Date,
    'last_login_at': {
        'default': new Date(),
        'type': Date
    },
    'modified_at': Date,
    'password': {
        'maxlength': 25,
        'minlength': 4,
        'pattern': '^[a-zA-Z]+$',
        'required': true,
        'type': String
    },
    'status': {
        'default': 'active',
            'enum': [
                'active',
                'blocked',
                'not_confirmed'
            ],
        'type': String
    },
    'username': {
        'maxlength': 15,
        'minlength': 4,
        'pattern': '^[a-zA-Z]+$',
        'required': true,
        'type': String,
        'unique': true
    }
})

const User = db.model('User', UserSchema)

module.exports.User = User
