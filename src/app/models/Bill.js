const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Bill = new Schema({
    MaDonHang: String,
    TenSP: String,
    SoLuongSP: String,
    TrangThaiDonHang: Boolean,
    TongGiaThanhGiaoDichFormatted: String,
    SoDienThoaiGiaoDich: String,
});
module.exports = mongoose.model('Bill', Bill); //export model Bill
