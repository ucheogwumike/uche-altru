const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a Category
 * @param {ObjectCategoryBody}
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  return db.categories.create(categoryBody);
};

const getCategories = async () => {
  const categories = await db.categories.findAll();
  return categories;
};

/**
 * Get category by name
 * @param {ObjectId} name
 * @returns {Promise<Category>}
 */
const getCategory = async (name) => {
  const category = await db.categories.findOne({ where: { name } });
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
};

/**
 * Update category by Id
 * @param {name} categoryName
 * @param {Object} updateBody
 * @returns {Promise<category>}
 */
const updateCategory = async (categoryName, updateBody) => {
  const category = await getCategory(categoryName);
  Object.assign(category, updateBody);
  await db.categories.update(category.dataValues, { where: { name: categoryName } });
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryName
 * @returns {Promise<Category>}
 */
const deleteCategory = async (categoryName) => {
  const category = await getCategory(categoryName);
  await db.categories.destroy({ where: { name: categoryName } });
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
