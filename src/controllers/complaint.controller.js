const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { complaintService } = require('../services');

const createComplaint = catchAsync(async (req, res) => {
  const complaint = await complaintService.createComplaint(req.body);
  res.status(httpStatus.CREATED).send(complaint);
});

const getAllComplaints = catchAsync(async (req, res) => {
  const result = await complaintService.getAllComplaints();
  res.send(result);
});

const getComplaint = catchAsync(async (req, res) => {
  const complaint = await complaintService.getComplaintById(req.params.complaintId);
  res.send(complaint);
});

const updateComplaint = catchAsync(async (req, res) => {
  const complaint = await complaintService.updateComplaintById(req.params.complaintId, req.body);
  res.send(complaint);
});

const updateComplaintStatus = catchAsync(async (req, res) => {
  const complaint = await complaintService.updateComplaintStatusById(req.params.complaintId, req.body);
  res.send(complaint);
});

const deleteComplaint = catchAsync(async (req, res) => {
  await complaintService.deleteComplaintById(req.params.complaintId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComplaint,
  getAllComplaints,
  getComplaint,
  updateComplaint,
  updateComplaintStatus,
  deleteComplaint,
};
