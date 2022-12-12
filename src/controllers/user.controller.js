const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const result = await userService.queryUsers();
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user, req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user, req.params.userId, req.body);
  res.send(user);
});

const updateUserRole = catchAsync(async (req, res) => {
  const user = await userService.updateUserRole(req.params.userId, req.params.roleName);
  res.send(user);
});

const verifyUserEmail = catchAsync(async (req, res) => {
  const user = await userService.verifyUserEmail(req.params.userId);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.user, req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateUserRole,
  verifyUserEmail,
  deleteUser,
};
