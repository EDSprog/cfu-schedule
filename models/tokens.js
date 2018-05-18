const bluebird = require('bluebird')
const mongoose = require('mongoose')
const dbOptions = {'promiseLibrary': bluebird}

const db = mongoose.createConnection(process.env.MONGO_DB_URI, dbOptions)

const Schema = mongoose.Schema

const TokenSchema = new Schema({
    'created_at': Date,
    'is_valid': {
                    'default': true,
                    'type': Boolean
                },
    'modified_at': Date,
    'user_id': String
})

const Token = db.model('Token', TokenSchema)

module.exports.Token = Token
