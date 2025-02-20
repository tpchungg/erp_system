const priceProductElement = document.querySelector('.priceProduct');
// Lấy input số lượng sản phẩm
const quantityInput = document.getElementById('SoLuongSP');
// Lấy phần tử input với id "MaDonHang"
const orderIdInput = document.getElementById("MaDonHang");

// Gọi hàm generateOrderId() để tạo mã đơn hàng ngẫu nhiên
const orderId = generateOrderId();

// Đặt giá trị của input "MaDonHang" bằng mã đơn hàng vừa tạo
orderIdInput.value = orderId;


function updateCurrentDate() {
    const currentDate = new Date().toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    document.getElementById('current-time').value= currentDate;
  }
  // Gọi hàm để cập nhật ngày mỗi giây
  setInterval(updateCurrentDate, 1000);

// Cập nhật giá trị khi số lượng thay đổi
quantityInput.addEventListener('input', calculatePrice);
// Hàm tính toán giá sản phẩm
function calculatePrice() {
  const priceProduct = parseFloat(priceProductElement.textContent.replace(/,/g, ''));
    // Lấy số lượng sản phẩm từ input
  const quantity = parseInt(quantityInput.value);
  const totalPrice = priceProduct * quantity;
  const taxAmount = totalPrice * 0.1;
// Hiển thị các giá trị với định dạng tiền tệ
document.getElementById('GiaSPChuaThue').value = priceProduct.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
document.getElementById('ThueSP').value = taxAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
document.getElementById('GiaThanhSP').value = totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
document.getElementById('TongGiaThanhSP').value = totalPrice;
}


// Tính toán giá ban đầu
calculatePrice();

const updateButton = document.querySelector('.price-info-wrapper button');
updateButton.addEventListener('click', calculatePrice);

function generateOrderId() {
  // Tạo một mã đơn hàng ngẫu nhiên, ví dụ: "DH123456"
  return "DH" + Math.floor(Math.random() * 900000) + 1;
}


