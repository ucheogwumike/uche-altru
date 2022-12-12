const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a permission
 * @param {Object} permissionBody
 * @returns {Promise<Object>}
 */
const createPermission = async (permissionBody) => {
  return db.permissions.create(permissionBody);
};

/**
 * Query for permissions
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllPermissions = async () => {
  const permissions = await db.permissions.findAll();
  return permissions;
};

/**
 * Get permission by id
 * @param {id} id
 * @returns {Promise<Permission>}
 */
const getPermissionById = async (id) => {
  return db.permissions.findOne({ where: { id } });
};

/**
 * Update permission by id
 * @param {id} permissionId
 * @param {Object} updateBody
 * @returns {Promise<Permission>}
 */
const updatePermissionById = async (permissionId, updateBody) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  Object.assign(permission, updateBody);
  await db.permissions.update(permission.dataValues, { where: { id: permissionId } });
  return permission;
};

/**
 * Delete permission by id
 * @param {id} permissionId
 * @returns {Promise<Permission>}
 */
const deletePermissionById = async (permissionId) => {
  const permission = await getPermissionById(permissionId);
  if (!permission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Permission not found');
  }
  await db.permissions.destroy({ where: { id: permissionId } });
  return permission;
};

module.exports = {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermissionById,
  deletePermissionById,
};
