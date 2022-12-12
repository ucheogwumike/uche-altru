const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a complaint
 * @param {Object} complaintBody
 * @returns {Promise<Object>}
 */
const createComplaint = async (complaintBody) => {
  return db.complaints.create(complaintBody);
};

/**
 * Query for complaints
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllComplaints = async () => {
  const complaints = await db.complaints.findAll();
  return complaints;
};

/**
 * Get complaint by id
 * @param {id} id
 * @returns {Promise<Complaint>}
 */
const getComplaintById = async (id) => {
  const complaint = await db.complaints.findOne({ where: { id } });
  if (!complaint) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Complaint not found');
  }
  return complaint;
};

/**
 * Update complaint by id
 * @param {id} complaintId
 * @param {Object} updateBody
 * @returns {Promise<Complaint>}
 */
const updateComplaintById = async (complaintId, updateBody) => {
  const complaint = await getComplaintById(complaintId);
  Object.assign(complaint, updateBody);
  await db.complaints.update(complaint.dataValues, { where: { id: complaintId } });
  return complaint;
};

/**
 * Update complaint's status by id
 * @param {id} complaintId
 * @param {Object} updateBody
 * @returns {Promise<Complaint>}
 */
const updateComplaintStatusById = async (complaintId, status) => {
  const complaint = await getComplaintById(complaintId);
  complaint.status = status;
  return complaint.save();
};

/**
 * Delete complaint by id
 * @param {id} complaintId
 * @returns {Promise<Complaint>}
 */
const deleteComplaintById = async (complaintId) => {
  const complaint = await getComplaintById(complaintId);
  await db.complaints.destroy({ where: { id: complaintId } });
  return complaint;
};

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintById,
  updateComplaintStatusById,
  deleteComplaintById,
};
