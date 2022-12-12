const express = require('express');
const { generalController } = require('../../controllers');

const router = express.Router();

router.route('/states').get(generalController.getAllStates);

module.exports = router;
