const Joi = require('joi');

const createComment = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

const getComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required(),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required(),
  }),
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
