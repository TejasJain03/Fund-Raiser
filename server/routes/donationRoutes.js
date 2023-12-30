const express=require('express')
const route=express.Router()
const catchAsync=require("../utils/catchAsync")
const donationControllers=require('../controllers/donationControllers')


route.post('/:campaignId/makedonation',catchAsync(donationControllers.makeDonation))

module.exports=route