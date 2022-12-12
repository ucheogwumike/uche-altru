/* eslint-disable prettier/prettier */
const express = require('express');
const upload = require('../../config/multer');
const campaignImagesController = require('../../controllers/campaignImages.controller');



const router = express.Router();

router.route('/image/:campaignId').get(campaignImagesController.findCampaignImagesById);
router.route('/:id').post(upload.array('image',5), campaignImagesController.createCampaignImages);

module.exports = router;
