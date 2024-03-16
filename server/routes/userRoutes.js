const express = require('express')
const route = express.Router()
const userControllers = require('../controllers/userControllers')
const catchAsync = require('../utils/catchAsync')
const authMiddleware = require('../middleware/authMiddleware')

  route.route('/register').post(catchAsync(userControllers.registerUser))
  route.route('/login').post(catchAsync(userControllers.loginUser))

  route
    .route('/logout')
    .get(authMiddleware, catchAsync(userControllers.logoutUser))

  
module.exports = route
