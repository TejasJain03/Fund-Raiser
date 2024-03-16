const Campaign = require('../models/campaign');
const Payment = require('../models/payment');
const Donation = require('../models/donation');

exports.makeDonation = async (req, res) => {
    const { formData, response } = req.body;
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    

    const donation = new Donation({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      amount: formData.amount,
      campaign: campaignId,
    });

    await donation.save();

    const payment = new Payment({
      donor_id: donation._id,
      payment_id: response.razorpay_payment_id,
      order_id: response.razorpay_order_id,
      amount: formData.amount,
    });

    await payment.save();

    console.log(payment._id);

    campaign.currentAmount = parseInt(campaign.currentAmount) + parseInt(formData.amount);

    if (campaign.currentAmount >= campaign.goalAmount) {
      campaign.status = 'completed';
    }

    await campaign.save();

    res.json({ success: true, message: 'Successfully Donated', donation,payment });
};
