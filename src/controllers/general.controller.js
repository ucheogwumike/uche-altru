const catchAsync = require('../utils/catchAsync');
const { generalService } = require('../services');

const getAllStates = catchAsync(async (req, res) => {
  const result = await generalService.getAllStates();
  res.send(result);
});

module.exports = {
  getAllStates,
};
