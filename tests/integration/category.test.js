const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const category = require('../../src/models/category.model');
const { categoryOne, categoryTwo, insertCategories } = require('../fixtures/category.fixture');

setupTestDB();

describe('Category routes', () => {
  describe('POST /v1/category', () => {
    let newCategory;

    beforeEach(() => {
      newCategory = {
        status: faker.lorem(),
        category: faker.definitions.dictionary(),
      };
    });

    test('should return 201 and successfully create new category if data is ok', async () => {
      await insertCategories([categoryOne, categoryTwo]);

      const res = await request(app).post('/v1/category').send(newCategory).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
        status: newCategory.status,
        category: newCategory.category,
      });

      const dbCategory = await category.findById(res.body.id);
      expect(dbCategory).toBeDefined();
      expect(dbCategory).toMatchObject({ status: newCategory.status, category: newCategory.category });
    });
  });
});
