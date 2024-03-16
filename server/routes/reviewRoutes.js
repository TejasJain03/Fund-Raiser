const express = require('express')
const route = express.Router()
const catchAsync = require('../utils/catchAsync')
const authMiddleware = require('../middleware/authMiddleware')
const reviewControllers=require('../controllers/reviewControllers')

route.post('/:campaignId/givereview',catchAsync(reviewControllers.createReview))
route.delete('/:campaignId/deletereview/:reviewId',authMiddleware,catchAsync(reviewControllers.deleteReview))

module.exports = route
