const Joi = require('joi');

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    status: Joi.string().required(),
  }),
};

const getCategory = {
  params: Joi.object().keys({
    categoryName: Joi.string().required(),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryName: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      status: Joi.string(),
    })
    .min(1),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryName: Joi.string(),
  }),
};

module.exports = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
