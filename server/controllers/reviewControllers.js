const Review = require('../models/review')
const Campaign = require('../models/campaign')

exports.createReview = async (req, res) => {
  const { campaignId } = req.params
  const { reviewBody, name } = req.body

  const campaign = await Campaign.findById(campaignId)
  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  const newReview = new Review({
    user: name,
    reviewBody: reviewBody,
    datePosted: new Date(),
  })
  await newReview.save()

  campaign.reviews.push(newReview._id)
  await campaign.save()

  res
    .status(201)
    .json({ success: true, message: 'Review created successfully', newReview })
} 
