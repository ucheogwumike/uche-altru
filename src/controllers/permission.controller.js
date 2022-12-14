const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { permissionService } = require('../services');

const createPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(httpStatus.CREATED).send(permission);
});

const getAllPermissions = catchAsync(async (req, res) => {
  const permissions = await permissionService.getAllPermissions();
  res.send(permissions);
});

const getPermission = catchAsync(async (req, res) => {
  const permission = await permissionService.getPermissionById(req.params.permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  res.send(permission);
});

const updatePermission = catchAsync(async (req, res) => {
  const permission = await permissionService.updatePermissionById(req.params.permissionId, req.body);
  res.send(permission);
});

const deletePermission = catchAsync(async (req, res) => {
  await permissionService.deletePermissionById(req.params.permissionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPermission,
  getAllPermissions,
  getPermission,
  updatePermission,
  deletePermission,
};
