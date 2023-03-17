const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');

const optionSchema = new Schema(
    {
      leaveType: {
        type: String,
        enum: [
          "Annual Leave",
          "Medical Leave",
          "Child Care Leave",
          "Maternity / Paternity Leave",
          "Compassionate Leave",
        ],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  

  const Option = mongoose.model("Option", optionSchema);

  
  module.exports = { Option };
  