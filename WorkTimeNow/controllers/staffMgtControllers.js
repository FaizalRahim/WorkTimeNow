const { Staff } = require('../models/staffMgt');
const { Option } = require('../models/option');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const saltRounds = 10;
const { validateStaff } = require('./validation');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    console.log('adminAccess:', req.session.user.adminAccess);
    // Check if the user has adminAccess
    if (req.session.user.adminAccess) {
      req.user = req.session.user || {};
      next();
    } else {
      res.send('Forbidden: You do not have admin access');
    }
  } else {
    res.redirect('/login');
  }
};

// New Staff
const createStaff = async (req, res) => {
  try {
    const { name, staffId, password, adminAccess } = req.body;

    // Validate the staff data
    const validationResult = validateStaff(req.body);
    if (validationResult.error) {
      return res.send(validationResult.error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const staff = new Staff({
      name,
      staffId,
      password: hashedPassword,
      adminAccess: adminAccess ? true : false,
    });

    const result = await staff.save();
    console.log(result);
    res.redirect('/staff');
  } catch (err) {
    console.log(err);
    res.send('Internal server error');
  }
};

// Update staff details
const updateStaff = async (req, res) => {
  const staffId = req.params.id;
  const updateOps = {};

  // Hash the password before updating it in the database
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    updateOps.password = hashedPassword;
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key !== 'password') {
      if (key === 'adminAccess') {
        updateOps[key] = (value === 'true' || value === 'yes');
      } else {
        updateOps[key] = value;
      }
    }
  }

  try {
    const result = await Staff.findByIdAndUpdate(staffId, updateOps, { new: true });

    if (!result) {
      return res.send('Staff not found');
    }

    console.log(result);
    res.redirect('/staff');
  } catch (err) {
    console.log(err);
    res.send('Internal server error');
  }
};




//Fire staff   
const deleteStaff = async (req, res) => {
    try {
      const { id } = req.params;
      await Staff.findByIdAndDelete(id).exec();
      const staff = await Staff.find();
      res.render('staffAll', { staff: staff });
    } catch (err) {
      console.log(err);
      res.send('Internal server error');
    }
  };
  


// All Staff
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate('leave.leaveType').exec();
    res.render('staffAll', { staff: staff });
  } catch (err) {
    console.log(err);
    res.send('Internal server error');
  }
};

// One Staff
const getStaffById=(req,res)=>{
    const staffId = req.params.id;
    Staff.findById(staffId)
        .then(staff => {
            if (!staff){
                return res.send('Staff not found')
            }
            res.render('staffDetails',{staff});
        })
        .catch(err => {
            console.log(err);
            res.send('Internal server error');
        });
};


module.exports = { 
    createStaff,
    updateStaff,
    deleteStaff,
    getAllStaff,
    getStaffById,
    isAuthenticated,
};