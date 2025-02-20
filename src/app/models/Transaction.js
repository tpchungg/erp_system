const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Transaction = new Schema({
    SoDienThoaiGiaoDich: String,
    SoLuongSPGiaoDich: Number,
    ThoiGianGiaoDich: Date,
    ThoiGianGiaoDichFormatted: String,
    TenSPGiaoDich: String,
    TongGiaThanhGiaoDichFormatted: String,
});
module.exports = mongoose.model('Transaction', Transaction); //export model Transaction
