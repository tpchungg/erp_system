const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Finance = new Schema({
    MaTaiKhoan: String,
    SoDu: Number,
    NgayTao: Date,
    NgayCapNhat: Date,
    TrangThai: String,
    MaKhachHang: String,
});
module.exports = mongoose.model('Finance', Finance); //export model Finance