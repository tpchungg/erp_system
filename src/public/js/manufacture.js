const productList = document.querySelector('.product-list');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const currentPageEl = document.querySelector('.current-page');

let currentPage = 1;
const itemsPerPage = 6; // Số sản phẩm hiển thị trên mỗi trang

function displayProducts(page) {
  // Tính toán vị trí bắt đầu và kết thúc của sản phẩm trên trang hiện tại
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Hiển thị các sản phẩm trên trang hiện tại
  productList.innerHTML = '';
  for (let i = startIndex; i < endIndex && i < manufacture.length; i++) {
    const product = manufacture[i];
    productList.innerHTML += `
      <div class="product-item">
        <img src="/img/${product.AnhSP}" alt="${product.TenSP}">
        <h3>${product.TenSP}</h3>
        <p>Số lượng: ${product.SoLuongSP}</p>
        <p>Đơn giá: ${product.GiaThanhSPFormatted}</p>
      </div>
    `;
  }

  // Cập nhật số trang hiện tại
  currentPageEl.textContent = page;
}

prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts(currentPage);
  }
});

nextPageBtn.addEventListener('click', () => {
  if (currentPage < Math.ceil(manufacture.length / itemsPerPage)) {
    currentPage++;
    displayProducts(currentPage);
  }
});

// Hiển thị sản phẩm trên trang đầu tiên
displayProducts(currentPage);
