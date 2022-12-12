const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userLogs } = require('../services');

const createLogs = catchAsync(async (req, res) => {
  const user = await userLogs.createLogs(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getAllLogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userLogs.queryLogs(filter, options);
  res.send(result);
});

const getLog = catchAsync(async (req, res) => {
  const user = await userLogs.getLogsById(req.params.historyId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Logs not found');
  }
  res.send(user);
});

/* 
const updateLogs = catchAsync(async (req, res) => {
  const user = await userLogs.updateLogsById(req.params.historyId, req.body);
  res.send(user);
});

const deleteLogs = catchAsync(async (req, res) => {
  await userLogs.deleteLogsById(req.params.historyId);
  res.status(httpStatus.NO_CONTENT).send();
}); */

module.exports = {
  createLogs,
  getAllLogs,
  getLog,
};
