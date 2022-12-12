/* eslint-disable no-console */
const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const { userService } = require('../services');
const request = require('request');
// eslint-disable-next-line no-unused-vars
const { initializePayment, verifyPayment } = require('../config/paystack')(request);
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { donationService } = require('../services');
// const logger = require('../config/logger');

const createDonation = catchAsync(async (req, res) => {
  const donationData = req.body;

  // intializing paystack gateway
  console.log('checkmate');
  donationData.amount *= 100;
  console.log(donationData);

  donationData.metadata = {
    donorName: donationData.donorName,
    campaignId: donationData.campaignId,
  };
  console.log(donationData);

  initializePayment(donationData, async (error, body) => {
    if (error) {
      // handle errors
      // eslint-disable-next-line no-console
      console.log(`error is ${error}`);
      return;
    }
    console.log('no error, moving on');
    console.log(body);
    const response = JSON.parse(body);
    console.log(response);

//     res.redirect(response.data.authorization_url);
    res.send(response.data.authorization_url);
  });
});

const paystackCallback = catchAsync(async (req, res) => {
  console.log('EntryPoint');
  console.log(req.query);
  const ref = req.query.reference;
  console.log('testLogs');
  verifyPayment(ref, async (error, body) => {
    if (error) {
      // handle errors appropriately
      console.log(error);
      return res.redirect('/error');
    }
    const response = await JSON.parse(body);
    console.log(response);

    const donationData = {
      donorName: response.data.metadata.donorName,
      email: response.data.customer.email,
      amount: response.data.amount,
      campaignId: response.data.metadata.campaignId,
      reference: response.data.reference,
    };
    const donation = await donationService.createDonation(donationData);
    res.redirect(`http://localhost:3000/payment`);
  });
});

const getDonations = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await donationService.queryDonations();
  res.send(result);
});

const getDonationById = catchAsync(async (req, res) => {
  const donation = await donationService.getDonationById(req.params.donationId);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

const updateDonation = catchAsync(async (req, res) => {
  const donation = await donationService.updateDonationById(req.params.donationId, req.body);
  res.send(donation);
});

const deleteDonation = catchAsync(async (req, res) => {
  await donationService.deleteDonationById(req.params.donationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDonationByDate = catchAsync(async (req, res) => {
  const donation = await donationService.queryDonationsByDate(req.params.start, req.params.end);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

module.exports = {
  createDonation,
  paystackCallback,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonationByDate,
};
