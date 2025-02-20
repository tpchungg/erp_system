const { render } = require('node-sass');
const Customer = require('../models/Customer');
const Transaction = require('../models/Transaction');
const { multipleMongooseToObject } = require('../../util/mongoose');
class CustomerController {
  //GET /khach-hang (Hiển thị danh sách khách hàng)
  async index(req, res, next) {
    try {
      const customers = await Customer.find({});
  
      // Phân loại khách hàng
      const newCustomers = [];
      const pontentialCustomers = [];
      const VIPCustomers = [];
  
      customers.forEach(customer => {
        const customerObject = customer.toObject();
        if (customerObject.SoTienTieuThu > 15000000) {
          VIPCustomers.push(customerObject);
        } else if (customerObject.SoTienTieuThu > 10000000) {
          pontentialCustomers.push(customerObject);
        } else if (customerObject.SoTienTieuThu > 5000000) {
          newCustomers.push(customerObject);
        }
      });
      // Truyền dữ liệu vào template
      res.render('customer', {
        newCustomers: newCustomers,
        pontentialCustomers: pontentialCustomers,
        VIPCustomers: VIPCustomers
      });
    } catch (error) {
      next(error);
    }
  }
  // Hiển thị chi tiết khách hàng khi click vào khách hàng với slug là Tên khách hàng
  async show(req, res, next) {
    try {
      const customerDetail = await Customer.findOne({ TenKH: req.params.slug });
      if (!customerDetail) {
        return next();
      }
      const customerObject = customerDetail.toObject();
      const transactions = await Transaction.find({ SoDienThoaiGiaoDich: customerObject.SoDienThoaiKH });
      const transactionsObject = transactions.map(transactions => transactions.toObject())
      res.render('customerDetail', { customerDetail: customerObject, transactions: transactionsObject });
    } catch (error) {
      next(error);
    }
  }
  
  
  // Thêm khách hàng vào trong danh sách
  async add(req, res, next){
    res.render('addCustomer');
  }

  //[POST]
  async store(req, res, next){
    const customer = new Customer(req.body);
    customer.save()
    .then(() => res.redirect('/khach-hang'))
    .catch(error => next());
  }

  // Chỉnh sửa thông tin khách hàng
  async edit(req, res, next){
    Customer.findById(req.params.id)
    .then(customerDetail => {
      customerDetail = customerDetail.toObject()
      res.render('editCustomer', {customerDetail});
    })
    .catch(error => next());
  }

  // [PUT] Lưu thông tin khách hàng đã chỉnh sửa
  async update(req, res, next){
    Customer.updateOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('/', MaKH))
    .catch(error => next());
  }

}
module.exports = new CustomerController;