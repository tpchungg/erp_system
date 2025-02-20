
const employeeRouter = require('./employee.js'); //lấy file employee.js trong thư mục routes
const customerRouter = require('./customer.js'); //lấy file customer.js trong thư mục routes
const financeRouter = require('./finance.js'); //lấy file finance.js trong thư mục routes
const manufactureRouter = require('./manufacture.js'); //lấy file manufacture.js trong thư mục routes
const purchaseRouter = require('./purchase.js'); //lấy file purchase.js trong thư mục routes
const siteRouter = require('./site.js'); //lấy file site.js trong thư mục routes
const loginRouter = require('./login.js');
const { engine } = require ('express-handlebars');
const path = require('path');
function route(app) {
    
    app.use('/nhan-vien', employeeRouter); //EmployeeController.index là hàm index trong file index.js trong thư mục controllers nó đã bao gồm req và res trong đó
    app.use('/khach-hang', customerRouter); 
    app.use('/tai-chinh', financeRouter);
    app.use('/san-xuat', manufactureRouter);
    app.use('/mua-hang', purchaseRouter);
    app.use('/dang-nhap', loginRouter);
    app.use('/', siteRouter);
}

module.exports = route;