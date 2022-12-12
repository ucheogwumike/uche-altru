const httpStatus = require('http-status');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * creates a campaign model
 * @param {Object} campaignBody
 * @returns {Promise<Object>}
 */

const createCampaign = async (user, campaignBody) => {
  if (!user.isEmailVerified) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Kindly verify your email first!');
  }
  const newCampaign = campaignBody;
  newCampaign.amountReceived = 0;
  newCampaign.userId = user.id;
  return db.campaigns.create(newCampaign);
};

/**
 * Get campaign by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCampaignById = async (id) => {
  return db.campaigns.findOne({
    where: { id },
    include: {
      model: db.comments,
      attributes: {
        exclude: ['campaignId'],
      },
    },
  });
};

/**
 * Get campaign by userid
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
const getCampaignByUserId = async (userId) => {
  const campaign = await db.campaigns.findAll({
    where: { userId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  return campaign;
};

/**
 * Find all the campaigns
 * @param {ObjectId} id
 * @returns {Promise<Campaign>}
 */
const queryCampaigns = async () => {
  return db.campaigns.findAll({
    include: {
      model: db.comments,
      attributes: {
        exclude: ['campaignId'],
      },
    },
  });
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Campaign>}
 */

const updateCampaignById = async (user, id, updateBody) => {
  const campaign = await getCampaignById(id);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'campaign not found');
  }
  if (user.roleName !== 'admin' && campaign.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't edit others campaign");
  }
  Object.assign(campaign, updateBody);
  await db.campaigns.update(campaign.dataValues, { where: { id } });
  return campaign;
};

const updateCampaignStatus = async (id, status) => {
  const campaign = await getCampaignById(id);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'campaign not found');
  }

  campaign.launchStatus = status;
  await db.campaigns.update(campaign.dataValues, { where: { id } });
  return campaign;
};

/**
 * Delete user by id
 * @param {ObjectId} campaignId
 * @returns {Promise<Campaign>}
 */
const deleteCampaignById = async (user, id) => {
  const campaign = await getCampaignById(id);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  if (user.roleName !== 'admin' && campaign.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't delete others campaign");
  }
  await db.campaigns.destroy({ where: { id } });
  return campaign;
};

/**
 * withdraw from campaign
 * @param {ObjectId} campaignId
 * @returns {Promise<Campaign>}
 */
const withdrawByCampaignId = async (user, id) => {
  const campaign = await getCampaignById(id);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  if (campaign.userId !== user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't withdraw from this Campaign");
  }

  await db.campaigns.destroy({ where: { id } });
  return campaign;
};

module.exports = {
  createCampaign,
  getCampaignById,
  queryCampaigns,
  updateCampaignById,
  updateCampaignStatus,
  deleteCampaignById,
  getCampaignByUserId,
  withdrawByCampaignId,
};
