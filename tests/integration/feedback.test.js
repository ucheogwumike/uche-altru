const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const feedback = require('../../src/models/feedback.model');
const { feedbackOne, feedbackTwo, insertFeedbacks } = require('../fixtures/feedback.fixture');

setupTestDB();

describe('Feedback routes', () => {
  describe('POST /v1/feedback', () => {
    let newFeedback;

    beforeEach(() => {
      newFeedback = {
        userId: faker.random(),
        campId: faker.random(),
        message: faker.lorem(),
        file: faker.image(),
      };
    });

    test('should return 201 and successfully create new category if data is ok', async () => {
      await insertCategories([feedbackOne, feedbackTwo]);

      const res = await request(app).post('/v1/category').send(newFeedback).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        userId: newFeedback.userId,
        campId: newFeedback.campId,
        message: newFeedback.message,
        file: newFeedback.file,
      });

      const dbFeedback = await feedback.findById(res.body.id);
      expect(dbFeedback).toBeDefined();
      expect(dbFeedback).toMatchObject({
        userId: newFeedback.userId,
        campId: newFeedback.campId,
        message: newFeedback.message,
        file: newFeedback.file,
      });
    });
  });
});
