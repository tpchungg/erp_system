const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = new Schema({
    MaKH: String,
    HoKH: String,
    TenKH: String,
    SoSanPhamTieuThu: Number,
    SoTienTieuThu: Number,
    EmailLienLac: String,
    DiaChiLienLac: String,
    SoDienThoaiKH: String,
    SoTienTieuThuFormatted: String,
});
module.exports = mongoose.model('Customer', Customer); //export model Customer
