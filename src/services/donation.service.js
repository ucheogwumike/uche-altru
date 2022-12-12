const httpStatus = require('http-status');
const { Op } = require('sequelize');
// const bcrypt = require('bcryptjs');
const request = require('request');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');
// eslint-disable-next-line no-unused-vars
const { initializePayment, verifyPayment } = require('../config/paystack')(request);
const logger = require('../config/logger');

/**
 * creates a donation model
 * @param {Object} donationBody
 * @returns {Promise<Object>}
 */

const createDonation = async (donationBody) => {
  // return db.campaigns.create(campaignBody)
  const don = donationBody;
  don.amount = donationBody.amount / 100;
  // eslint-disable-next-line no-console
  console.log(don);
  const donation = await db.donations.create(don);

  const id = donation.campaignId;
  const campaigns = await db.campaigns.findOne({ where: { id } });
  // campaigns.amountReceived = 0;
  const add = parseFloat(campaigns.amountReceived, 10);
  campaigns.amountReceived = parseFloat(donation.amount, 10) + add;
  await campaigns.save();
  logger.info(JSON.stringify(donation));
  logger.info(JSON.stringify(campaigns));
  return donation;
};

/**
 * Get donation by id
 * @param {ObjectId} id
 * @returns {Promise<donation>}
 */
const getDonationById = async (id) => {
  // return db.campaigns.findById(id);
  return db.donations.findOne({ where: { id } });
};

/**
 * Find all the donations
 * @param {}
 * @returns {Promise<donations>}
 */
const queryDonations = async () => {
  const donation = db.donations.findAll();
  logger.info(donation);
  return donation;
};

/**
 * Find all the donations
 * @param {}
 * @returns {Promise<donations>}
 */
const queryDonationsByDate = async (start, end) => {
  const d = new Date(start);
  const e = new Date(end);

  const donation = await db.donations.findAll({
    where: {
      createdAt: {
        // [Op.between]: [new Date(start), new Date(end)],
        [Op.and]: {
          [Op.gte]: d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000),
          [Op.lte]: e.setTime(e.getTime() - new Date().getTimezoneOffset() * 60 * 1000),
        },
      },
    },
  });
  logger.info(donation);
  return donation;
};

/**
 * Update donation by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<donation>}
 */

const updateDonationById = async (id, updateBody) => {
  const donation = await getDonationById(id);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  Object.assign(donation, updateBody);
  // db.campaigns.update(campaign);
  return db.donations.update(donation.dataValues, { where: { id } });

  // return campaign;
};

/**
 * Delete user by id
 * @param {ObjectId} donationId
 * @returns {Promise<donation>}
 */
const deleteDonationById = async (id) => {
  const donation = await getDonationById(id);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Donation not found');
  }
  await db.donations.destroy({ where: { id } });
  return donation;
};

module.exports = {
  createDonation,
  getDonationById,
  queryDonations,
  updateDonationById,
  deleteDonationById,
  queryDonationsByDate,
};
