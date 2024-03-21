const Review = require('../models/review')
const Campaign = require('../models/campaign')


exports.createReview = async (req, res) => {
  const { campaignId } = req.params
  const { reviewBody, name } = req.body

  // Find the campaign by ID
  const campaign = await Campaign.findById(campaignId)
  if (!campaign) {
    return res.status(404).json({ success: false, message: 'Campaign not found' })
  }

  // Create new review
  const newReview = new Review({
    user: name,
    campaignId: campaignId,
    reviewBody: reviewBody,
    datePosted: new Date(),
  })
  await newReview.save()

  // Add review to campaign
  campaign.reviews.push(newReview._id)
  await campaign.save()

  res.status(201).json({ success: true, message: 'Review created successfully', newReview })
}
