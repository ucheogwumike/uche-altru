/* eslint-disable prettier/prettier */
/* eslint-disable no-plusplus */
/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
const httpStatus = require('http-status');
const fs = require('fs');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
// const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');
const { campaignImagesService } = require('../services');
const { campaignService } = require('../services');

const createCampaignImages = catchAsync(async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, 'images');
  const urls = [];
  const { files } = req;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  
  const campaignid = await campaignService.getCampaignById(req.params.id);
  console.log(campaignid.dataValues.id);
  if (!campaignid) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  } else {
    
    const campaign = await campaignImagesService.createCampaignImages(urls.map((Urls) => ({ ...Urls, campaignId:campaignid.dataValues.id })));
    res.status(httpStatus.CREATED).send(campaign);
  }
});

const findCampaignImagesById = catchAsync(async (req, res)=>{
  const campaignImages = await campaignImagesService.getCampaignImagesByCampaignId(req.params.campaignId);
  console.log(campaignImages)
  if (!campaignImages) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Images not found');
  }
  res.send(campaignImages);
});

module.exports = {
  createCampaignImages,
  findCampaignImagesById,
};
