const Joi = require('joi');
// const { objectId } = require('./custom.validation');

const createHistory = {
  body: Joi.object().keys({
    campaignId: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const getHistories = {
  query: Joi.object().keys({
    amount: Joi.number(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getHistory = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const updateHistory = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().required(),
    })
    .min(1),
};

const deleteHistory = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createHistory,
  getHistories,
  getHistory,
  updateHistory,
  deleteHistory,
};
