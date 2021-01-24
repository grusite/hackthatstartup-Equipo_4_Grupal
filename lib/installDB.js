'use strict'

require('dotenv').config() // loading environment variables from .env file
const debug = require('debug')('nodepop:installDB')
const db = require('./db')
const User = require('../models/User')
const initUsers = require('./initUsers.json')
const Payment = require('../models/Payment')
const initPayment = require('./initPayments.json')

db.connect()

db.connection.once('open', async () => {
    try {
        debug('deleting rows')
        await User.deleteMany()
        await Payment.deleteMany()
        debug('deleted rows')
        debug('inserting rows')
        await User.insertMany(initUsers.users)
        await Payment.insertMany(initPayment.payments)
        debug('inserted rows')
        db.disconnect()
    } catch (err) {
        debug('error', err)
    }
})