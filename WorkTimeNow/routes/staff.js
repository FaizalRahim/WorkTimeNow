const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffMgtControllers');
const { isAuthenticated } = staffController;

// Route to handle form submission for creating a new staff
router.get('/',isAuthenticated,staffController.getAllStaff);
router.post('/',isAuthenticated, staffController.createStaff);

// Route to handle form submission for updating an existing staff
router.put('/:id',isAuthenticated, staffController.updateStaff);

// Route to handle deletion of an existing staff
router.delete('/:id',isAuthenticated, staffController.deleteStaff);

// Route to display details of a specific staff
router.get('/:id',isAuthenticated, staffController.getStaffById);

module.exports = router;

