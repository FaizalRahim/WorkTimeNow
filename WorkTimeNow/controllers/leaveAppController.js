const { Staff } = require('../models/staffMgt');
const { Option } = require('../models/option');
const { validateLeave } = require('./validation');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user || {};
    next();
  } else {
    res.redirect('/login');
  }
};

const createLeave = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.send('Staff not found');
    }
    // check if the staffId in the request params matches the userId of the authenticated user
    const staffObjectId = staff._id.toString();
    if (req.user.userId !== staffObjectId) {
      return res.send('Unauthorized');
    }
    const { leaveType, startDate, endDate } = req.body;
    const selectedLeaveOption = await Option.findOne({ leaveType: leaveType });
    if (!selectedLeaveOption) {
      return res.send('Leave option not found');
    }
    // Validate the leave data
    const validationResult = validateLeave({ leaveType, startDate, endDate });
    if (validationResult.error) {
      return res.send(validationResult.error);
    }

    const newLeave = {
      leaveType: selectedLeaveOption._id,
      startDate,
      endDate,
      approval:'pending',
    };
    staff.leave.push(newLeave);
    await staff.save();
    res.redirect(`/staff/${staff._id}/leave`);
  } catch (err) {
    res.send(err.message);
  }
};


// All Staff
const getAllLeave = async (req, res) => {
  try {
    if (!req.user || !req.user.staffId) {
      // Redirect to login page if user is not authenticated
      return res.redirect('/login');
    }
    const staffId = req.user.staffId;
    const staff = await Staff.findOne({ staffId: staffId }).populate('leave.leaveType');
    if (!staff) {
      return res.send('Staff not found');
    }
    const leaves = staff.leave;
    const leaveOptions = await Option.find({});

    res.render('leaveAll', { staff: staff, leaves: leaves ,leaveOptions: leaveOptions });
  } catch (err) {
    res.send(err.message);
  }
};


module.exports = {
  getAllLeave,
  createLeave,
  isAuthenticated,

};

