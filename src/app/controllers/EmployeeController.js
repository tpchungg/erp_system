const { render } = require('node-sass');
const Employee = require('../models/Employee');
const { monment } = require('moment');
class EmployeeController {
  // Hiển thị danh sách nhân viên và thêm thẻ nếu có thêm nhân viên mới vào
  async index(req, res, next) {
    Employee.find({})
    .then(employee => {
      employee = employee.map(employee => employee.toObject())
      res.render('employee', { employee });
    })
    .catch(error => next());
  }
  // Hiển thị chi tiết nhân viên khi click vào nhân viên với slug là mã nhân viên
  async show(req, res, next) {
    Employee.findOne({ MaNV: req.params.slug })
    .then(employeeDetail => {
      employeeDetail = employeeDetail.toObject();
      employeeDetail.ThamNienLamViec= ThamNienLamViec(employeeDetail.ThoiGianBatDau);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      employeeDetail.ThoiGianBatDauFormatted = employeeDetail.ThoiGianBatDau.toLocaleDateString('vi-VN', options);
      employeeDetail.NgaySinhNVFormatted = employeeDetail.NgaySinhNV.toLocaleDateString('vi-VN', options);
      res.render('employeeDetail', {employeeDetail});
      })
      .catch(error => next());
  }
    // Thêm nhân viên vào trong danh sách
  async add(req, res, next){
    res.render('addEmployee');
  }
  //[POST]
  async store(req, res, next){
    const employee = new Employee(req.body);
    employee.ThamNienLamViec = ThamNienLamViec(employee.ThoiGianBatDau);
    if(req.file){
      employee.AnhNV = req.file.filename;
    }
    employee.save()
    .then(() => res.redirect('/nhan-vien'))
    .catch(error => next());
  }

  // Chỉnh sửa thông tin nhân viên
  async edit(req, res, next){
    Employee.findById(req.params.id)
    .then(employeeDetail => {
      employeeDetail = employeeDetail.toObject();
      res.render('editEmployee', {employeeDetail});
    })
    .catch(error => next());
  }
  // [PUT] Lưu thông tin nhân viên đã chỉnh sửa
  async update(req, res, next){
    Employee.updateOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('/', MaNV))
    .catch(error => next());
  }

  // [GET] Bộ lọc nhân viên theo bộ phận, chức vụ, giới tính, và thâm niên làm việc
  async filter(req,res,next){
  await Employee.find({
    GioiTinh: req.query.GioiTinh || { $exists: true }, 
    LoaiNV:req.query.LoaiNV|| { $exists: true },
    ChuyenMonLamViec:req.query.ChuyenMonLamViec|| { $exists: true },
    ThamNienLamViec:{ $gte: req.query.minExperience || 0, $lte: req.query.maxExperience || Infinity},
  })
  .then(employee => {
    employee = employee.map(employee => employee.toObject())
    res.render('employee', { employee });
  })
  .catch(error => next());
  }
  // [GET] Tìm kiếm
  async search(req, res, next){
    const search = req.query.search;
    await Employee.find({TenNV:{$regex:search, $option:"i"}})
    .then(employee => {
      employee = employee.map(employee => employee.toObject())
      res.render('employee', { employee });
    })
    .catch(error => next());
    }
  // [DELETE]
  async delete(req, res, next){
    Employee.deleteOne({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(error => next());
  }
}
module.exports = new EmployeeController;

    // Tính thông niên làm việc
    function ThamNienLamViec(ThoiGianBatDau) {
       // Tính toán thời gian làm việc
  const currentYear = new Date();
  const workingYears = currentYear.getFullYear() - ThoiGianBatDau.getFullYear();
  return workingYears;
  }
