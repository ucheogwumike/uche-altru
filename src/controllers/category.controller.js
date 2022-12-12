const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategory(req.params.categoryName);
  res.send(category);
});

const getCategories = catchAsync(async (req, res) => {
  const category = await categoryService.getCategories();
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.categoryName, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.categoryName);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
