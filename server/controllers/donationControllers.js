const Campaign = require('../models/campaign');
const Payment = require('../models/payment');
const Donation = require('../models/donation');

/**
 * Controller function to make a donation to a campaign
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.makeDonation = async (req, res) => {
  const { formData, response } = req.body;
  const { campaignId } = req.params;

  // Find the campaign by its ID
  const campaign = await Campaign.findById(campaignId);

  // If campaign not found, return error response
  if (!campaign) {
    return res.status(404).json({ success: false, message: 'Campaign not found' });
  }

  // Create a new donation object with provided form data
  const donation = new Donation({
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    amount: formData.amount,
    campaign: campaignId,
  });

  // Save the donation to the database
  await donation.save();

  // Create a new payment object with payment response details
  const payment = new Payment({
    donor_id: donation._id,
    payment_id: response.razorpay_payment_id,
    order_id: response.razorpay_order_id,
    amount: formData.amount,
  });

  // Save the payment to the database
  await payment.save();

  // Update the currentAmount of the campaign and check if goal is reached
  campaign.currentAmount = parseInt(campaign.currentAmount) + parseInt(formData.amount);
  if (campaign.currentAmount >= campaign.goalAmount) {
    campaign.status = 'completed';
  }

  // Save the updated campaign status
  await campaign.save();

  // Send success response with donation and payment details
  res.json({ success: true, message: 'Successfully Donated', donation, payment });
};
