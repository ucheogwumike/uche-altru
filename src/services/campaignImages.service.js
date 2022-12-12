/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * creates a campaign model
 * @param {Object} campaignBody
 * @returns {Promise<Object>}
 */

const createCampaignImages = async (campaignBody) => {
  return db.campaignImages.bulkCreate(campaignBody);
};

/**
 * Get campaign by userid
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
 const getCampaignImagesByCampaignId = async (campaignId) => {
  const campaignImages = await db.campaignImages.findAll({
    where: { campaignId},

  });
  if (!campaignImages) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  return campaignImages;
};

module.exports = {
  createCampaignImages,
  getCampaignImagesByCampaignId,
};
