const Joi = require('joi');

const createPermission = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getPermission = {
  params: Joi.object().keys({
    permissionId: Joi.string().required(),
  }),
};

const updatePermission = {
  params: Joi.object().keys({
    permissionId: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const deletePermission = {
  params: Joi.object().keys({
    permissionId: Joi.string(),
  }),
};

module.exports = {
  createPermission,
  getPermission,
  updatePermission,
  deletePermission,
};
