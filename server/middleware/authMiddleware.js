const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ExpressError = require('../middleware/ExpressError').default
require('dotenv').config()

const isLoggedIn = async (req, res, next) => {
  // Check if token exists in cookies
  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).json({
      success: false,
      status: 'logout',
      message: 'Please Login!!!',
    })
  }

  // Verify token
  const data = jwt.verify(token, process.env.JWT_SECRET)
  if (!data) {
    // Clear expired token
    res.clearCookie('access_token', { httpOnly: true, expires: new Date(0) })
    return res.status(401).send('Session Expired. Login Again!')
  }

  // Find user by ID from token and attach to request object
  req.user = await User.findById(data.userId).select('-password')
  if (!req.user) throw new ExpressError(400, false, 'User was not found')

  // Continue to next middleware or route handler
  next()
}

module.exports = isLoggedIn
