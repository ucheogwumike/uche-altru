const Joi = require('joi');

const createCampaign = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    target: Joi.number().required(),
    location: Joi.string()
      .required()
      .valid(
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Benue',
        'Borno',
        'Bayelsa',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Federal Capital Territory',
        'Gombe',
        'Jigawa',
        'Imo',
        'Kaduna',
        'Kebbi',
        'Kano',
        'Kogi',
        'Lagos',
        'Katsina',
        'Kwara',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Rivers',
        'Oyo',
        'Osun',
        'Sokoto',
        'Plateau',
        'Taraba',
        'Yobe',
        'Zamfara'
      ),
    description: Joi.string().required(),
    accountNum: Joi.string().required(),
    accountName: Joi.string().required(),
    bankName: Joi.string().required(),
    launchDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('launchDate')).required(),
    categoryName: Joi.string().required().valid('Business', 'Health', 'Education', 'Physiological'),
  }),
};

const getCampaign = {};

const queryCampaigns = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
  }),
};

const getCampaignByCategory = {
  params: Joi.object().keys({
    categoryName: Joi.string().required(),
  }),
};

const getCampaignByLocation = {
  params: Joi.object().keys({
    location: Joi.string().required(),
  }),
};

const updateCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      target: Joi.number(),
      location: Joi.string(),
      description: Joi.string(),
      images: Joi.string(),
      accountNum: Joi.string(),
      accountName: Joi.string(),
      bankName: Joi.string(),
    })
    .min(1),
};

const updateCampaignStatus = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
    status: Joi.string().required().valid('pending', 'approved', 'disabled'),
  }),
};

const deleteCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
  }),
};

module.exports = {
  createCampaign,
  getCampaign,
  queryCampaigns,
  getCampaignByCategory,
  getCampaignByLocation,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
};
