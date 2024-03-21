const Campaign = require('../models/campaign')
const User = require('../models/user')
const Review = require('../models/review')
const Donation = require('../models/donation')
const mongoose = require('mongoose')

// Get a single campaign by ID
exports.getCampaign = async (req, res) => {
  const { campaignId } = req.params
  const campaign = await Campaign.findById(campaignId).populate({
    path: 'reviews',
    populate: {
      path: 'user',
    },
  })
  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }
  res.json({ success: true, campaign })
}

// Get all campaigns
exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find()
  res.json({ success: true, campaigns })
}

// Check if user is authenticated before creating a campaign
exports.getcreateCampaign = async (req, res) => {
  const userId = req.user._id
  if (userId) {
    console.log(userId)
    res.json({ success: true })
  } else {
    res.json({ success: false })
  }
}

// Create a new campaign
exports.createCampaign = async (req, res) => {
  // Extract campaign details from request body
  const {
    title,
    description,
    goalAmount,
    startDate,
    endDate,
    category,
  } = req.body;

  // Validate startDate and endDate
  if (startDate >= endDate) {
    return res.status(400).json({ success: false, message: 'Start date must be before end date' });
  }

  // Validate goalAmount
  if (goalAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Goal Amount must be greater than 0' });
  }

  try {
    let newCampaign;

    // Create a new campaign object
    if (image) {
      newCampaign = new Campaign({
        title,
        description,
        goalAmount,
        startDate,
        endDate,
        user: req.user._id,
        category,
        image: image.path,
      });
    } else {
      newCampaign = new Campaign({
        title,
        description,
        goalAmount,
        startDate,
        endDate,
        user: req.user._id,
        category,
      });
    }

    // Save the new campaign
    await newCampaign.save();

    res.json({ success: true, message: 'Successfully Added', newCampaign });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get campaigns created by the authenticated user
exports.getUserCampaigns = async (req, res) => {
  const userId = req.user._id

  // Find campaigns created by the user
  const userCampaigns = await Campaign.find({ user: userId })

  res.status(200).json({ campaigns: userCampaigns })
}

// Update an existing campaign
exports.updateCampaign = async (req, res) => {
  const { campaignId } = req.params
  const {
    title,
    description,
    goalAmount,
    startDate,
    endDate,
    category,
  } = req.body

  // Update the campaign
  const updatedCampaign = await Campaign.findByIdAndUpdate(
    campaignId,
    {
      title,
      description,
      goalAmount,
      startDate,
      endDate,
      category,
    },
    { new: true },
  )

  // If campaign is not found
  if (!updatedCampaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  // Send response with updated campaign
  res.json({
    success: true,
    message: 'Campaign updated successfully',
    updatedCampaign,
  })
}

// Delete a campaign and its associated reviews and donations
exports.deleteCampaign = async (req, res) => {
  const { campaignId } = req.params

  // Delete the campaign
  const deletedCampaign = await Campaign.findByIdAndDelete(campaignId)

  // If campaign is not found
  if (!deletedCampaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  // Delete associated reviews
  await Review.deleteMany({ campaignId: campaignId })

  // Delete associated donations
  await Donation.deleteMany({ campaign: campaignId })

  // Send response with deleted campaign
  res.json({
    success: true,
    message: 'Campaign deleted successfully',
    deletedCampaign,
  })
}
