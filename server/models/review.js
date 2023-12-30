const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewBody: {
    type: String,
  },
  datePosted: { type: Date },
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
