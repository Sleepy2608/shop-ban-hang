# MVP SPECIFICATION - SLYBYTE SHOP (ĐỒ CÔNG NGHỆ)

## 1. Xác Định MVP (Minimum Viable Product)

### 👤 Phân Hệ Khách Hàng (User / Customer)
- **Xác thực & Tài khoản**: Đăng ký, Đăng nhập (JWT), Xem/sửa thông tin cá nhân.
- **Sản phẩm & Danh mục**:
  - Xem danh mục sản phẩm (Laptop, Điện thoại, Phụ kiện, Linh kiện...).
  - Xem danh sách sản phẩm (Lọc theo danh mục, mức giá, hãng/thương hiệu).
  - Tìm kiếm sản phẩm theo từ khóa.
  - Xem chi tiết sản phẩm (Hình ảnh, thông số kỹ thuật, giá, tình trạng kho).
- **Giỏ hàng & Đặt hàng**:
  - Thêm / Xóa / Cập nhật số lượng sản phẩm trong giỏ hàng.
  - Checkout (Điền thông tin nhận hàng, chọn phương thức thanh toán COD / Chuyển khoản cơ bản).
- **Đơn hàng**: Xem lịch sử đơn hàng và trạng thái đơn (Chờ duyệt, Đang giao, Đã giao, Đã hủy).

---

### 🛠️ Phân Hệ Quản Trị (Admin)
- **Quản lý Danh mục (Categories)**: CRUD danh mục ngành hàng công nghệ.
- **Quản lý Thương hiệu (Brands)**: CRUD hãng sản xuất (Apple, Samsung, Asus, Dell...).
- **Quản lý Sản phẩm (Products & Specs)**:
  - CRUD sản phẩm, cấu hình giá, số lượng tồn kho, hình ảnh.
  - Thông số kỹ thuật (RAM, CPU, ROM, Card đồ họa...).
- **Quản lý Đơn hàng (Orders)**: Xem danh sách, cập nhật trạng thái đơn (Pending -> Processing -> Shipped -> Delivered / Cancelled).
- **Quản lý Người dùng (Users)**: Xem danh sách khách hàng, khóa/mở khóa tài khoản.

---

## 2. Thiết Kế Database (MVP)

1. `users` (id, full_name, email, password_hash, phone, address, role, created_at, updated_at)
2. `categories` (id, name, slug, description, parent_id, created_at)
3. `brands` (id, name, slug, logo_url)
4. `products` (id, category_id, brand_id, name, slug, description, original_price, sale_price, stock_quantity, thumbnail, status, created_at, updated_at)
5. `product_images` (id, product_id, image_url, is_primary)
6. `product_specs` (id, product_id, spec_key, spec_value) — *Đặc thù cho đồ công nghệ (CPU, RAM, Pin, Màn hình...)*
7. `carts` (id, user_id, created_at, updated_at)
8. `cart_items` (id, cart_id, product_id, quantity, price)
9. `orders` (id, user_id, order_code, total_amount, shipping_address, phone, recipient_name, payment_method, payment_status, order_status, notes, created_at, updated_at)
10. `order_items` (id, order_id, product_id, product_name, price, quantity, total_price)
11. `payments` (id, order_id, amount, payment_method, transaction_id, status, paid_at)

---

## 3. Cấu Trúc Dự Án (Phase 1 — Khởi Tạo)

```text
SlyByte-Shop/
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
