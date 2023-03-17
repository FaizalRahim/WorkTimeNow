const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const { Option } = require('./option')


const leaveAppSchema = new Schema(
  {
    leaveType: { type: Schema.Types.ObjectId, ref: "Option", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);


const staffMgtSchema = new Schema(
  {
    name: { type: String, required: true },
    staffId: { type: String, required: true , unique:true},
    password: { type: String, required: true },
    adminAccess: { type: Boolean, required: true },
    leave: [leaveAppSchema],
  },
  {
    timestamps: true,
  }
);


const Staff = mongoose.model("Staff", staffMgtSchema);

module.exports = { Staff };
