const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  
  userCampaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
  dateRegistered: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
