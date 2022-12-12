const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const donationController = require('../../controllers/donation.controller');

const router = express.Router();

// eslint-disable-next-line prettier/prettier
router
  .route('/')
  .post(donationController.createDonation)
  .get(donationController.getDonations);

// eslint-disable-next-line prettier/prettier

router.route('/paystack/callback').get(donationController.paystackCallback);

router
  .route('/:donationId')
  .get(donationController.getDonationById)
  .patch(donationController.updateDonation)
  .delete(donationController.deleteDonation);

router.route('/:start/:end').get(donationController.getDonationByDate);

module.exports = router;
