const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.get('/',loginController.login);
router.post('/',loginController.login);


module.exports = router;
