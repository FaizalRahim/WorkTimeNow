const { Staff }= require('../models/staffMgt');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const saltRounds = 10;
const mongoose = require('mongoose');



const login = async(req,res)=> {
  try {
    const { staffId, password } = req.body;

    // Query staff document by staffId field
    const staff = await Staff.findOne({ staffId });

    if(!staff){
      return res.render('login',{msg: 'Invalid staffId or password'});
    }

    const isMatch = await bcrypt.compare(password,staff.password);
    if (!isMatch) {
      return res.render('login',{msg:'Invalid staffId or password'})
    }

    req.session.user = {
      userId: staff._id,
      staffId: staff.staffId,
      adminAccess: staff.adminAccess,
    };
    

    if (staff.adminAccess) {
      res.redirect(`/staff`);
    } else {
      res.redirect(`/staff/${staff._id}/leave`);
    }
  } catch (error){
    console.error(error);
    res.send('Internal Server Error')
  }
};


module.exports = {
  login,
};