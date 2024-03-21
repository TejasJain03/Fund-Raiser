const Razorpay = require('razorpay')
const crypto = require('crypto')

// Initialize Razorpay instance with API keys
const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_API_KEY,
  key_secret: process.env.PAYMENT_SECRET_KEY,
})


exports.createOrder = async (req, res) => {
  // Extract amount from request body
  const { amount } = req.body

  // Define options for creating the order
  const options = {
    amount: amount * 100, // Amount in smallest currency unit (e.g., paisa)
    currency: 'INR',
    receipt: 'order_receipt_123', // Unique identifier for the order
  }

  // Create a new order using Razorpay API
  const response = await razorpay.orders.create(options)

  // If there's an error in the response, log it
  if (response.error) {
    console.log('Error creating order:', response.error)
  } else {
    // Send the response back to the client
    res.send(response)
  }
}


exports.getKey = async (req, res) => {
  // Send the Razorpay API key to the client
  res.send({ key: process.env.PAYMENT_API_KEY })
}


exports.paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

  // Concatenate order ID and payment ID
  const body = razorpay_order_id + '|' + razorpay_payment_id

  // Generate expected signature using secret key
  const expectedSignature = crypto
    .createHmac('sha256', 'YOUR_RAZORPAY_SECRET_KEY')
    .update(body.toString())
    .digest('hex')

  // Check if the received signature matches the expected signature
  const isAuthentic = expectedSignature === razorpay_signature

  // Send appropriate response based on signature verification
  if (isAuthentic) {
    console.log('Payment Successful')
    res.json({ message: 'Payment Successful' })
  } else {
    console.log('Payment Unsuccessful')
    res.json({ message: 'Payment Unsuccessful' })
  }
}
