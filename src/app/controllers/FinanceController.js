const { render } = require('node-sass');
const Finance = require('../models/Finance');
const { multipleMongooseToObject } = require('../../util/mongoose');
class FinanceController {
  //GET /tai-chinh
  async index(req, res, next) {
    Finance.find({})
    .then(finance => {
      res.render('finance', { 
        finance: multipleMongooseToObject(finance) 
      });
    })
    .catch(error => next());
  }

  //GET /tai-chinh/phieu-chi
  async show(req, res, next) {
    Finance.find({})
    .then(paymentSlip => {
        res.render('paymentSlip', {
          paymentSlip: multipleMongooseToObject(paymentSlip)
        });
      })
    .catch(error => next());
  }

  //GET /tai-chinh/phieu-thu
  async show(req, res, next) {
    Finance.find({})
    .then(bill => {
        res.render('bill', {
          bill: multipleMongooseToObject(bill)
        });
      })
    .catch(error => next());
  }

  //GET /tai-chinh/luong-thuong
    
}
module.exports = new FinanceController;