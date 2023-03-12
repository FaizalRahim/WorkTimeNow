const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffMgtSchema = new Schema(
    {
        name: {type:String},
        staffId: {type:String},
        password: {type:String},
        adminAccess: {type:Boolean},
    },
    {
      timestamps: true,
    }
  );
  module.exports = mongoose.model("Staff", staffMgtSchema);
  