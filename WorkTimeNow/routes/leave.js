const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveAppController');
const { isAuthenticated } = leaveController;

// Route to handle form submission for creating a new leave application
router.get('/:id/leave',isAuthenticated, leaveController.getAllLeave);
router.post('/:id/leave',isAuthenticated, leaveController.createLeave);

module.exports = router;