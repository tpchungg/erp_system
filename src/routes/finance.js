const express = require('express');
const router = express.Router();
const financeController = require('../app/controllers/FinanceController');


router.get('/phieu-thu', financeController.show);
router.get('/phieu-chi', financeController.show);
router.use('/', financeController.index);


module.exports = router;