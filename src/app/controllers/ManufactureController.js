const { render } = require('node-sass');
const Manufacture = require('../models/Manufacture');
const { multipleMongooseToObject } = require('../../util/mongoose');
const Purchase = require('../models/Purchase');
const Bill = require('../models/Bill');
class ManufactureController {
  async index(req, res, next) {
    try {
      const manufacture = await Manufacture.find({}).lean();
      const bills = await Bill.find({}).lean();

      const billWait = bills.filter(bill => !bill.TrangThaiDonHang);
      const billConfirmed = bills.filter(bill => bill.TrangThaiDonHang);

      res.render('manufacture', { manufacture, billWait, billConfirmed });
    } catch (error) {
      next(error);
    }
  }
  //[POST]
  async store(req, res, next){
    const manufacture = new Manufacture(req.body);
    if(req.file){
      manufacture.AnhSP = req.file.filename;
    }
    const options ={ style: 'currency', currency: 'VND'}
    manufacture.GiaThanhSPFormatted = manufacture.GiaThanhSP.toLocaleString('vi-VN', options);
    manufacture.save()
    .then(() => {
      const purchase = new Purchase({
        AnhSP: manufacture.AnhSP,
        TenSP: manufacture.TenSP,
        GiaThanhSPFormatted: manufacture.GiaThanhSPFormatted,
        GiaThanhSP: manufacture.GiaThanhSP,
      })
      purchase.save()
      .then(() => res.redirect('/san-xuat'))
      .catch(error => next())
    })
    .catch(error => next());
  }
  async confirm(req, res, next) {
    await Bill.updateOne({MaDonHang: req.body.MaDonHang}, {TrangThaiDonHang: true})
    // Cập nhật số lượng sản phẩm trong Manufacture
    const manufacture = await Manufacture.findOne({TenSP: req.body.TenSP });
    manufacture.SoLuongSP -= parseInt(req.body.SoLuongSP);
    await manufacture.save();
    res.redirect('back')
  }
  }
  module.exports = new ManufactureController;