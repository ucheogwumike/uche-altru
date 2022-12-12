const faker = require('faker');
const Category = require('../../src/models/category.model');

const categoryOne = {
  _id: 1,
  status: faker.lorem(),
  category: faker.definitions.dictionary(),
};

const categoryTwo = {
  _id: 2,
  status: faker.lorem(),
  category: faker.definitions.dictionary(),
};

const insertCategories = async (categories) => {
  await Category.insertMany(categories.map((category) => ({ ...category })));
};

module.exports = {
  categoryOne,
  categoryTwo,
  insertCategories,
};
