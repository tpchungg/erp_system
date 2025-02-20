const express = require('express');
const router = express.Router();
const employeeDetailController = require('../app/controllers/EmployeeDetailController');


router.get('/:slug', employeeDetailController.show);



module.exports = router;