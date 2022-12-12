const faker = require('faker');
const Feedback = require('../../src/models/feedback.model');

// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const password = 'password1';
// const salt = bcrypt.genSaltSync(8);
// const hashedPassword = bcrypt.hashSync(password, salt);

const feedbackOne = {
  userId: 1,
  campId: faker.random(),
  message: faker.lorem(),
  file: faker.image(),
};

const feedbackTwo = {
  userId: 2,
  campId: faker.random(),
  message: faker.lorem(),
  file: faker.image(),
};

const insertFeedbacks = async (feedbacks) => {
  await Feedback.insertMany(feedbacks.map((feedback) => ({ ...feedback })));
};

module.exports = {
  feedbackOne,
  feedbackTwo,
  insertFeedbacks,
};
