const validator = require('validator');

const validateStaff = (staff) => {
    const { staffId, password}= staff;

    // Validate staffId
    if (!validator.isAlphanumeric(staffId) || !validator.isLength(staffId, { min: 3, max: 15 })) {
        return { error: 'Staff ID should be alphanumeric and between 3 and 15 characters' };
      }

      // Validate password
    if (!validator.isLength(password, { min: 6 })) {
        return { error: 'Password should be at least 6 characters long' };
    }

    // If all validation passed
        return { error: null };

};
    // Validate date range
const validateLeave = ({ startDate, endDate }) => {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  if (startDateObj >= endDateObj) {
    return { error: 'Start date should be before the end date' };
  }

  // If all validation passed
  return { error: null };
};


module.exports = { validateStaff, validateLeave };