const express = require('express')
const route = express.Router()
const catchAsync = require('../utils/catchAsync')
const campaignControllers = require('../controllers/campaignControllers')
const authMiddleware = require('../middleware/authMiddleware')
const { upload } = require('../config/cloudinary')

route.get(
  '/getcampaign/:campaignId',
  catchAsync(campaignControllers.getCampaign),
)
route.get('/getallcampaign', catchAsync(campaignControllers.getAllCampaigns))
route.get(
  '/createcampaign',
  authMiddleware,
  catchAsync(campaignControllers.getcreateCampaign),
)
route.get(
  '/getusercampaign',
  authMiddleware,
  catchAsync(campaignControllers.getUserCampaigns),
)
route.post(
  '/createcampaign',
  authMiddleware,
  upload.single('image'),
  catchAsync(campaignControllers.createCampaign),
)
route.put(
  '/updatecampaign/:campaignId',
  catchAsync(campaignControllers.updateCampaign),
)
route.delete(
  '/deletecampaign/:campaignId',
  catchAsync(campaignControllers.deleteCampaign),
)

module.exports = route
