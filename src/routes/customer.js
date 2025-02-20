const express = require('express');
const router = express.Router();
const customerController = require('../app/controllers/CustomerController');

router.get('/them-khach-hang', customerController.add);
router.put('/:id', customerController.update);
router.get('/:id/edit', customerController.edit);
router.post('/luu-khach-hang', customerController.store);
router.get('/:slug', customerController.show);
router.use('/', customerController.index);



module.exports = router;