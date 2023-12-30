const Campaign = require('../models/campaign')
const Payment = require('../models/payment')
const Donation = require('../models/donation')

exports.makeDonation = async (req, res) => {
  const { formData, response } = req.body
  const { campaignId } = req.params
  const campaign = await Campaign.findById(campaignId)

  console.log(response)
  res.json({ response })

  const donation = new Donation({
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    amount: formData.amount,
    campaign: campaignId,
  })
  donation.save()

  const payment = new Payment({
    payment_id: response.razorpay_payment_id,
    order_id: response.razorpay_order_id,
    amount: formData.amount,
  })
  payment.save()

  campaign.paymentDetails = payment._id

  campaign.currentAmount += formData.amount
  if (campaign.currentAmount >= campaign.goalAmount) {
    campaign.status = 'completed'
  }
  campaign.save()
  res.json({ success: true, message: 'Successfully Donated', donation })
  res.redirect('')
}
