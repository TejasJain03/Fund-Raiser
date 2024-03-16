const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation' },
  payment_id: { type: String },
  order_id: { type: String },
  amount: { type: Number },
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
