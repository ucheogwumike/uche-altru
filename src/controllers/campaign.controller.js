const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { campaignService } = require('../services');

const createCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.createCampaign(req.user, req.body);
  res.status(httpStatus.CREATED).send(campaign);
});

const getCampaigns = catchAsync(async (req, res) => {
  const result = await campaignService.queryCampaigns();
  res.send(result);
});

const getCampaignById = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.campaignId);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  res.send(campaign);
});

const getCampaignByUserId = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignByUserId(req.params.userId);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  res.send(campaign);
});
const getCampaignByCategory = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignByCategory(req.params.categoryName);
  res.send(campaign);
});

const getCampaignByLocation = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignByLocation(req.params.location);
  res.send(campaign);
});

const updateCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.updateCampaignById(req.user, req.params.campaignId, req.body);
  res.send(campaign);
});

const updateCampaignStatus = catchAsync(async (req, res) => {
  const campaign = await campaignService.updateCampaignStatus(req.params.campaignId, req.params.status);
  res.send(campaign);
});

const deleteCampaign = catchAsync(async (req, res) => {
  await campaignService.deleteCampaignById(req.user, req.params.campaignId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  getCampaignByCategory,
  getCampaignByLocation,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
  getCampaignByUserId,
};
