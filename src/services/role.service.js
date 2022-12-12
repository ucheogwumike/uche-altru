const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Object>}
 */
const createRole = async (roleBody) => {
  return db.roles.create(roleBody);
};

const getAllRoles = async () => {
  const roles = await db.roles.findAll();
  return roles;
};

/**
 * Get role by name
 * @param {id} name
 * @returns {Promise<Role>}
 */
const getRoleByName = async (name) => {
  const role = await db.roles.findOne({ where: { name } });
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return role;
};

/**
 * Update role by name
 * @param {name} roleName
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleByName = async (roleName, updateBody) => {
  const role = await getRoleByName(roleName);
  Object.assign(role, updateBody);
  await db.roles.update(role.dataValues, { where: { name: roleName } });
  return role;
};

/**
 * Delete role by name
 * @param {name} roleName
 * @returns {Promise<Role>}
 */
const deleteRoleByName = async (roleName) => {
  const role = await getRoleByName(roleName);
  await db.roles.destroy({ where: { name: roleName } });
  return role;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleByName,
  updateRoleByName,
  deleteRoleByName,
};
