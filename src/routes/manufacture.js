const express = require('express');
const router = express.Router();
const upload = require('../midleware/upload/script.js');
const manufactureController = require('../app/controllers/ManufactureController');
router.put('/:slug', manufactureController.confirm);
router.post('/them-hang-hoa', upload.single("AnhSP"), manufactureController.store);
router.use('/', manufactureController.index);

module.exports = router;