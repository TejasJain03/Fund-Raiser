const Review = require('../models/review')
const Campaign = require('../models/campaign')

exports.createReview = async (req, res) => {
  const { campaignId } = req.params
  const { reviewBody } = req.body

  const userId = req.user._id
  const campaign = await Campaign.findById(campaignId)
  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  const newReview = new Review({
    user: userId,
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

exports.deleteReview = async (req, res) => {
  const { campaignId, reviewId } = req.params

  const campaign = await Campaign.findById(campaignId)
  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  if (!campaign.reviews.includes(reviewId)) {
    return res
      .status(404)
      .json({ success: false, message: 'Review not found in the campaign' })
  }

  await Review.findByIdAndDelete(reviewId)

  campaign.reviews = campaign.reviews.filter(id => id.toString() !== reviewId.toString());
  await campaign.save()

  res.json({ success: true, message: 'Review deleted successfully' })
}
