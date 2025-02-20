const listItems = document.querySelectorAll('.list-item a');

listItems.forEach(item => {
  item.addEventListener('click', () => {
    // Xóa lớp 'active' từ tất cả các phần tử
    listItems.forEach(i => i.classList.remove('active'));
    
    // Thêm lớp 'active' vào phần tử được click
    item.classList.add('active');
    
    // Chuyển hướng đến đường dẫn được chỉ định
    window.location.href = item.getAttribute('href');
  });
});
