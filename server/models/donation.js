const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  amount: {
    type: Number,
  },
  paymentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
})

const Donation = mongoose.model('Donation', donationSchema)

module.exports = Donation
