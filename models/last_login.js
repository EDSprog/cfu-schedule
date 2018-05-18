const bluebird = require('bluebird')
const mongoose = require('mongoose')
const dbOptions = {'promiseLibrary': bluebird}

const db = mongoose.createConnection(process.env.MONGO_DB_URI, dbOptions)

const Schema = mongoose.Schema

const LogSchema = new Schema({
    'login_at': Date,
    'username': String,
    'userAgent': String,
    'ip': String
})

const Log = db.model('Log', LogSchema)

module.exports.Log = Log
