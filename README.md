# Shop Bán Hàng (Đồ Công Nghệ)

## 📌 Phase 1 — Khởi Tạo Dự Án & Định Nghĩa MVP

### 1. Phân Hệ Người Dùng (User)
- Đăng ký / Đăng nhập
- Xem danh sách & Chi tiết sản phẩm (kèm thông số kỹ thuật)
- Tìm kiếm & Lọc sản phẩm theo thương hiệu / danh mục / giá
- Giỏ hàng (Thêm, sửa, xóa sản phẩm)
- Đặt hàng & Thanh toán (Checkout)
- Xem lịch sử đơn hàng

### 2. Phân Hệ Quản Trị (Admin)
- Quản lý Sản phẩm (CRUD & Cấu hình Specs)
- Quản lý Danh mục & Thương hiệu
- Quản lý Đơn hàng
- Quản lý Người dùng

### 3. Cấu Trúc Thư Mục Dự Án
```text
shop-ban-hang/
├── Docs/
│   └── MVP_SPEC.md
├── Code/
│   ├── backend/
│   │   └── src/main/java/com/example/ecommerce/
│   │       ├── config/
│   │       ├── common/
│   │       └── EcommerceApplication.java
│   ├── frontend/
│   │   └── src/
│   │       ├── components/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── types/
│   │       └── App.tsx
│   └── database/
│       └── schema.sql
└── README.md
```