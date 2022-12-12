const Joi = require('joi');

const createComplaint = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
};

const getComplaint = {
  params: Joi.object().keys({
    complaintId: Joi.string(),
  }),
};

const updateComplaint = {
  params: Joi.object().keys({
    complaintId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      description: Joi.string(),
      firstname: Joi.string(),
      lastname: Joi.string(),
      email: Joi.string().email(),
    })
    .min(1),
};

const updateComplaintStatus = {
  params: Joi.object().keys({
    complaintId: Joi.required(),
    status: Joi.string().required().valid('pending', 'approved', 'disabled'),
  }),
};

const deleteComplaint = {
  params: Joi.object().keys({
    complaintId: Joi.string(),
  }),
};

module.exports = {
  createComplaint,
  getComplaint,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
};
