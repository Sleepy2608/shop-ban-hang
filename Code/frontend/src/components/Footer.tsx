import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <span className="brand-dot"></span>
            <span className="brand-name">SLYBYTE<span className="brand-accent"> SHOP</span></span>
          </div>
          <p className="footer-desc">
            Hệ sinh thái thiết bị công nghệ chính hãng Slybyte. Cung cấp Laptop cao cấp, Smartphone Flagship và giải pháp phần cứng tiêu chuẩn.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Sản phẩm</h4>
            <ul>
              <li><span>Apple MacBook & iMac</span></li>
              <li><span>Laptop Gaming & Đồ họa</span></li>
              <li><span>Smartphone Flagship</span></li>
              <li><span>Linh kiện & Phụ kiện</span></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><span>Chính sách bảo hành</span></li>
              <li><span>Phương thức thanh toán</span></li>
              <li><span>Vận chuyển & Giao nhận</span></li>
              <li><span>Liên hệ kỹ thuật</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>© {new Date().getFullYear()} Slybyte Shop (Slybyte). All rights reserved.</p>
          <p className="footer-subtext">Designed with Precision & Technical Standards.</p>
        </div>
      </div>
    </footer>
  );
};
