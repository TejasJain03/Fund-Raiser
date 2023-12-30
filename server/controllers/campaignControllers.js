const Campaign = require('../models/campaign')
const User = require('../models/user')

exports.getCampaign = async (req, res) => {
  const { campaignId } = req.params

  const campaign = await Campaign.findById(campaignId)

  if (!campaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  res.json({ success: true, campaign })
}

exports.getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find()

  res.json({ success: true, campaigns })
}

exports.createCampaign = async (req, res) => {
  const {
    title,
    description,
    goalAmount,
    startDate,
    endDate,
    category,
  } = req.body

  const image = req.file
  
  if (image) {
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      startDate,
      endDate,
      user: req.user._id,
      category: category,
      image: image.path,
    })
    await newCampaign.save()

    res.json({ success: true, message: 'Successfully Added', newCampaign })
  } else {
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      startDate,
      endDate,
      user: req.user._id,
      category: category,
    })
    await newCampaign.save()

    res.json({ success: true, message: 'Successfully Added', newCampaign })
  }
}

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

  if (!updatedCampaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  res.json({
    success: true,
    message: 'Campaign updated successfully',
    updatedCampaign,
  })
}

exports.deleteCampaign = async (req, res) => {
  const { campaignId } = req.params
  const deletedCampaign = await Campaign.findByIdAndDelete(campaignId)

  if (!deletedCampaign) {
    return res
      .status(404)
      .json({ success: false, message: 'Campaign not found' })
  }

  res.json({
    success: true,
    message: 'Campaign deleted successfully',
    deletedCampaign,
  })
}
