const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Manufacture = new Schema({
    TenSP: String,
    AnhSP: String,
    SoLuongSP: Number,
    GiaThanhSP: Number,
    GiaThanhSPFormatted: String,
});
module.exports = mongoose.model('Manufacture', Manufacture); //export model Manufacture