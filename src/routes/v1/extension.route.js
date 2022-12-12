const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const extensionController = require('../../controllers/extension.controller');

const router = express.Router();

router.route('/').post(extensionController.createExtension).get(extensionController.getExtensions);

router
  .route('/:extensionId')
  .get(extensionController.getExtensionById)
  .patch(extensionController.updateExtension)
  .delete(extensionController.deleteExtension);

module.exports = router;
