const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  res.status(httpStatus.CREATED).send(role);
});

const getAllRoles = catchAsync(async (req, res) => {
  const result = await roleService.getAllRoles();
  res.send(result);
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleByName(req.params.roleName);
  res.send(role);
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRoleByName(req.params.roleName, req.body);
  res.send(role);
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleByName(req.params.roleName);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
};
