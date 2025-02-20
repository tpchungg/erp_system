const mongoose = require('mongoose'); // mongoose giúp biến document trong mongodb thành các object trong javascript
const multer = require('multer');
const Schema = mongoose.Schema;

const Employee = new Schema({
    AnhNV: String,
    MaNV: String,
    HovaTenNV: String,
    NgaySinhNV: Date,
    NgaySinhNVForamtted: Date,
    NoiSinh: String,
    ThamNienLamViec: Number,
    ThoiGianBatDau: Date,
    ThoiGianBatDauFormatted: Date,
    QuocTichNV: String,
    DanTocNV: String,
    TonGiaoNV: String,
    ViTriLamViec: String,
    ChuyenMonLamViec: String,
    LoaiNV: String,
    GioiTinh: String,
    TinhTrangSucKhoe: String,
    SoDienThoaiNV: String, 
    EmailNV: String, 
    DiaChiNV: String,
    // slug: { type: String, slug: '' }
});

module.exports = mongoose.model('Employee', Employee); //export model Employee