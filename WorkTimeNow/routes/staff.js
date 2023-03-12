const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffMgtControllers');

// Route to handle form submission for creating a new staff
router.get('/', staffController.getAllStaff);
router.post('/', staffController.createStaff);

// Route to handle form submission for updating an existing staff
router.post('/:id', staffController.updateStaff);

// Route to handle deletion of an existing staff
router.delete('/', staffController.deleteStaff);

// Route to display all staff
router.get('/', staffController.getAllStaff);

// Route to display details of a specific staff
router.get('/:id', staffController.getStaffById);

module.exports = router;