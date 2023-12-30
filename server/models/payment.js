const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  payment_id: { type: String },
  order_id: { type: String },
  amount: { type: Number },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
