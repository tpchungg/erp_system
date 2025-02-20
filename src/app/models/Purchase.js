const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Purchase = new Schema({
    TenSP: String,
    AnhSP: String,
    SoLuongSP: Number,
    GiaThanhSP: Number,
    GiaThanhSPFormatted: String,
});
module.exports = mongoose.model('Purchase', Purchase); //export model Purchase