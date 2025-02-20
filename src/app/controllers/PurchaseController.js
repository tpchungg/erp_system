const { render } = require('node-sass');
const Purchase = require('../models/Purchase');
const Customer = require('../models/Customer');
const Bill = require('../models/Bill');
const Transaction = require('../models/Transaction');
const { multipleMongooseToObject } = require('../../util/mongoose');
class PurchaseController {
  //GET /mua-hang
  async index(req, res, next) {
    Purchase.find({})
    .then(purchase => {
      purchase = purchase.map(purchase=> purchase.toObject())
      res.render('purchase', { purchase });
    })
    .catch(error => next());
  }

    // Hiển thị chi tiết sản phẩm khi click vào nhân viên với slug là mã nhân viên
    async show(req, res, next) {
      Purchase.findOne({TenSP: req.params.slug })
      .then(purchaseDetail => {
        purchaseDetail = purchaseDetail.toObject();
        purchaseDetail.GiaThanhSPFormatted = purchaseDetail.GiaThanhSP.toLocaleString('vi-VN', 
          { style: 'currency', 
            currency: 'VND' 
          }
        );
        res.render('purchaseDetail', {purchaseDetail});
        })
        .catch(error => next());
    }
    // Quy trình hóa đơn
      async bill(req, res, next){
      const customer = await Customer.findOne({SoDienThoaiKH: req.body.SoDienThoaiKH });
      // Nếu khách hàng chưa tồn tại, tạo mới
      if (!customer) {
      const newCustomer = new Customer({
        TenKH: req.body.TenKH,
        SoDienThoaiKH: req.body.SoDienThoaiKH,
        DiaChiLienLac: req.body.DiaChiKH,
        SoSanPhamTieuThu: parseInt(req.body.SoLuongSP),
        SoTienTieuThu: parseFloat(req.body.TongGiaThanhSP),
      });
      newCustomer.SoTienTieuThuFormatted = newCustomer.SoTienTieuThu.toLocaleString('vi-VN', 
        { style: 'currency', 
          currency: 'VND' 
        }
      );
      await newCustomer.save();
      } 
      else {
        // Nếu khách hàng đã tồn tại, cập nhật thông tin đơn hàng
        customer.SoSanPhamTieuThu += parseInt(req.body.SoLuongSP);
        customer.SoTienTieuThu += parseFloat(req.body.TongGiaThanhSP);
        customer.SoTienTieuThuFormatted =  customer.SoTienTieuThu.toLocaleString('vi-VN', 
          { style: 'currency', 
            currency: 'VND' 
          }
        );
        await customer.save();
      }
      const bill = new Bill({
        MaDonHang: req.body.MaDonHang,
        TenSP: req.body.TenSP,
        SoLuongSP: req.body.SoLuongSP,
        SoDienThoaiGiaoDich: req.body.SoDienThoaiKH,
        TrangThaiDonHang: false,
      })
      await bill.save()
      const transaction  = new Transaction({
        SoDienThoaiGiaoDich: req.body.SoDienThoaiKH,
        SoLuongSPGiaoDich: req.body.SoLuongSP,
        ThoiGianGiaoDichFormatted: req.body.ThoiGianGiaoDichFormatted,
        TenSPGiaoDich: req.body.TenSP,
      })
      transaction.TongGiaThanhGiaoDichFormatted = req.body.TongGiaThanhSP.toLocaleString('vi-VN', {
        style: 'currency', currency: 'VND'  
      })
      transaction.save()
      res.redirect('/mua-hang')
    }
}
module.exports = new PurchaseController;