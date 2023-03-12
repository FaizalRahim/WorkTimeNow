const Staff = require('../models/staffMgt');


// New Staff
const createStaff = (req,res,next)=>{
    const {name,staffId,password,adminaccess} = req.body;
    const staff = new Staff ({
        name,
        staffId,
        password,
        adminAccess: adminaccess ? true: false,
    });
    staff.save()
    .then(result => {
        console.log(result);
        res.redirect('/staff');
    })
        .catch(err=>{
        console.log(err);
        res.status(500).send('Internal server error');
    });
};

// Update staff details
const updateStaff = (req,res,next)=> {
    const staffId = req.params.id;
    const {name, staffId:updatedStaffId, password, adminaccess}= req.body;
    Staff.findById(staffId)
        .then(staff => {
            if(!staff){
            return res.send.status(404).send('Staff not found');
        }
        staff.name = name;
        staff.staffId = updatedStaffId;
        staff.password = password;
        staff.adminAccess= adminaccess ? true: false;
        return staff.save();
    })
    .then(result => {
        console.log(result);
        res.redirect('/staff');
    })
        .catch(err=>{
        console.log(err);
        res.status(500).send('Internal server error');
    });

};

//Fire staff   
const deleteStaff = async (req, res, next) => {
    try {
      const staffId = req.params.id;
      await Staff.findByIdAndDelete(staffId, { skipValidation: true });
      const staff = await Staff.find();
      res.render('staff', { staff: staff });
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    }
  };
  


// All Staff
const getAllStaff = (req, res, next) => {
    Staff.find()
      .then((staff) => {
        res.render('staffAll', { staff: staff });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Internal server error');
      });
  };

// One Staff
const getStaffById=(req,res,next)=>{
    const staffId = req.params.id;
    Staff.findById(staffId)
        .then(staff => {
            if (!staff){
                return res.status(404).send('Staff not found')
            }
            res.render('staffDetails',{staff});
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Internal server error');
        });
};


module.exports = { 
    createStaff,
    updateStaff,
    deleteStaff,
    getAllStaff,
    getStaffById,
};