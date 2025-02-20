const express = require('express');
const router = express.Router();
const upload = require('../midleware/upload/script.js');
const employeeController = require('../app/controllers/EmployeeController'); //lấy file index.js trong thư mục controllers
router.get('/bo-loc', employeeController.filter);
router.get('/tim-kiem', employeeController.search);
router.get('/them-nhan-vien', employeeController.add);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.delete);
router.get('/:id/edit', employeeController.edit);
router.post('/luu-nhan-vien', upload.single("AnhNV"), employeeController.store);
router.get('/:slug', employeeController.show);
router.use('/', employeeController.index); //EmployeeController.index là hàm index trong file index.js trong thư mục controllers nó đã bao gồm req và res trong đó 
module.exports = router; //export router để file khác có thể sử dụng được