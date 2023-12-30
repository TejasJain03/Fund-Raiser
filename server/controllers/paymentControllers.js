const Razorpay = require('razorpay')
const crypto = require('crypto')
// const sendEmail = require('../utils/ticketMail')
// const generateRandomID = require('../utils/getRandomId')

const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_API_KEY,
  key_secret: process.env.PAYMENT_SECRET_KEY,
})

exports.creatOrder = async (req, res) => {
  console.log(req.body.amount)
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: 'order_receipt_123',
  }

  const response = await razorpay.orders.create(options)
  if (response.error) {
    console.log("THis is error")
    console.log(response.error)
  } else {
    res.send(response)
  }
}

exports.getKey = async (req, res) => {
  res.send({ key: process.env.PAYMENT_API_KEY })
}

exports.paymentVerification = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body

  console.log(req.body)

  const body = razorpay_order_id + '|' + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac('sha256', 'UKTbLcz90bxadSWJrS76VTCm')
    .update(body.toString())
    .digest('hex')

  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    console.log('Payment Succesful')
    res.json({ message: 'Payment Successful' })
  } else {
    console.log('Payment Unsuccessful')
    res.json({ message: 'Payment Unsuccessful' })
  }
}
