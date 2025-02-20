const express = require('express');
const router = express.Router();
const customerDetailController = require('../app/controllers/CustomerDetailController');

router.get('/:slug', customerDetailController.show);

module.exports = router;