const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * creates an extension model
 * @param {Object} extensionBody
 * @returns {Promise<Object>}
 */

const createExtension = async (extensionBody) => {
  const id = extensionBody.campaignId;
  if (await db.campaigns.findOne({ where: { id } })) {
    const extension = await db.extensions.create(extensionBody);
    const campaigns = await db.campaigns.findOne({ where: { id } });

    extension.oldDate = campaigns.endDate;
    campaigns.endDate = extension.newDate;
    await extension.save();
    await campaigns.save();
    return extension;
  }

  return null;
  // const extension = await db.extensions.create(extensionBody);
  // const id = extension.campaignId;
  // const campaigns = await db.campaigns.findOne({ where: { id } });
};

/**
 * Get extension by id
 * @param {ObjectId} id
 * @returns {Promise<Extension>}
 */
const getExtensionById = async (id) => {
  // return db.campaigns.findById(id);
  return db.extensions.findOne({ where: { id } });
};

/**
 * Find all the extensions
 
 * @returns {Promise<Extensions>}
 */
const queryExtensions = async () => {
  return db.extensions.findAll();
};

/**
 * Update extension by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Extension>}
 */

const updateExtensionById = async (id, updateBody) => {
  const extension = await getExtensionById(id);
  if (!extension) {
    throw new ApiError(httpStatus.NOT_FOUND, 'extension not found');
  }
  Object.assign(extension, updateBody);

  return db.extensions.update(extension.dataValues, { where: { id } });

  // return campaign;
};

/**
 * Delete extension by id
 * @param {ObjectId} extensionId
 * @returns {Promise<Campaign>}
 */
const deleteExtensionById = async (id) => {
  const extension = await getExtensionById(id);
  if (!extension) {
    throw new ApiError(httpStatus.NOT_FOUND, 'extension not found');
  }
  await db.extensions.destroy({ where: { id } });
  return extension;
};

module.exports = {
  createExtension,
  getExtensionById,
  queryExtensions,
  updateExtensionById,
  deleteExtensionById,
};
