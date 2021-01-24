const debug = require('debug')('app:payment');
const Payment = require('../models/Payment');

/**
   * GET /payment
   * Return all transactions in the DB
   */
exports.listPayments = async (req, res) => {
    return Payment.find()
}

/**
   * GET /payment/:reference
   * Return a transaction with specified reference
   */
exports.readPayment = async (req, res) => {
    const [transaction] = await Payment.find({ reference: req.params.reference })
    if (!transaction) throw new Error('Payment not found')
    return transaction
}

/**
   * GET /payment/:email
   * Returns transactions with specified user email
   */
  exports.listByEmail = async (req, res) => {
    const [transactions] = await Payment.find({ user_email: req.params.email })
    if (!transactions) throw new Error(`User ${req.params.email} has no transactions`)
    return transactions
}

/**
   * POST /payment
   * Create Payment
   */
exports.addPayment = async (req, res) => {
    const data = req.body
    const newPayment = new Payment(data)
    const paymentSaved = await newPayment.save()
    return paymentSaved
}
