import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { authService } from '../services/authService';

interface MockProduct {
  id: number;
  name: string;
  brand: string;
  badge: string;
  specs: string[];
  price: string;
  category: string;
}

const FEATURED_PRODUCTS: MockProduct[] = [
  {
    id: 1,
    name: 'MacBook Pro 16 inch M3 Max',
    brand: 'APPLE',
    badge: 'Flagship',
    specs: ['Apple M3 Max', '36GB Unified RAM', '1TB SSD NVMe', '16.2" Liquid Retina XDR'],
    price: '79.990.000 ₫',
    category: 'Laptop',
  },
  {
    id: 2,
    name: 'ASUS ROG Strix SCAR 18 (2024)',
    brand: 'ASUS',
    badge: 'Gaming Pro',
    specs: ['Intel Core i9-14900HX', 'RTX 4080 12GB', '32GB DDR5', '18" QHD+ 240Hz Nebula'],
    price: '84.990.000 ₫',
    category: 'Laptop',
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra 5G',
    brand: 'SAMSUNG',
    badge: 'Galaxy AI',
    specs: ['Snapdragon 8 Gen 3', '12GB RAM', '512GB Storage', '200MP Camera Zoom 100x'],
    price: '29.990.000 ₫',
    category: 'Điện thoại',
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Wireless',
    brand: 'SONY',
    badge: 'Hi-Res Audio',
    specs: ['Auto NC Optimizer', 'Dual Noise Sensor', '30 Hours Battery', 'Multipoint Connection'],
    price: '7.490.000 ₫',
    category: 'Âm thanh',
  },
];

export const HomePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [apiTestResult, setApiTestResult] = useState<string | null>(null);
  const [testingApi, setTestingApi] = useState(false);

  const handleTestMeApi = async () => {
    setTestingApi(true);
    setApiTestResult(null);
    try {
      const data = await authService.getMe();
      const roleStr = data.authorities?.map((a) => a.authority).join(', ') || user?.role || 'N/A';
      setApiTestResult(`Xác thực thành công từ backend! Tài khoản: ${data.username || user?.email} | Quyền: ${roleStr}`);
    } catch {
      setApiTestResult('Không thể kết nối đến /api/auth/me hoặc Token đã hết hạn.');
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-wrapper">
          <div className="hero-badge">
            <span className="brand-dot"></span>
            SLYBYTE SHOP // Chính Hãng 2026
          </div>

          <h1 className="hero-title">
            Công nghệ tiên phong.<br />Hiệu năng không giới hạn.
          </h1>

          <p className="hero-desc">
            Hệ sinh thái Laptop chuyên dụng, thiết bị di động flagship và phụ kiện số tuyển chọn.
            Cam kết 100% xuất xứ chính hãng, tiêu chuẩn bảo hành tận nơi và chính sách đổi trả minh bạch.
          </p>

          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <a href="#featured-section" className="btn btn-primary">
                  Khám phá sản phẩm
                </a>
                <button onClick={logout} className="btn btn-secondary">
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Đăng ký tài khoản
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Đăng nhập hệ thống
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3.5rem' }}>
        {/* User Auth Banner when logged in */}
        {isAuthenticated && user && (
          <div className="auth-status-card">
            <div className="status-info">
              <div className="status-avatar">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="status-text">
                <h3>Xin chào, {user.fullName || user.email}!</h3>
                <p>
                  Tài khoản: <strong>{user.email}</strong> &bull; Phân quyền:{' '}
                  <span className="role-tag">{user.role}</span>
                </p>
              </div>
            </div>

            <div className="status-actions">
              <button
                onClick={handleTestMeApi}
                className="btn btn-secondary btn-sm"
                disabled={testingApi}
              >
                {testingApi ? 'Đang kiểm tra...' : 'Kiểm tra token (/api/auth/me)'}
              </button>
            </div>

            {apiTestResult && (
              <div
                className="alert alert-success"
                style={{ width: '100%', marginTop: '0.75rem', marginBottom: 0 }}
              >
                {apiTestResult}
              </div>
            )}
          </div>
        )}

        {/* Trust Badges */}
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon-box">✓</div>
            <div>
              <div className="trust-title">100% Phân Phối Chính Hãng</div>
              <div className="trust-sub">Đầy đủ hóa đơn VAT từ Apple, ASUS, Dell, Samsung</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">24</div>
            <div>
              <div className="trust-title">Bảo Hành 24 Tháng</div>
              <div className="trust-sub">Chính sách 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">⚡</div>
            <div>
              <div className="trust-title">Giao Hàng Siêu Tốc 2H</div>
              <div className="trust-sub">Miễn phí giao hàng toàn quốc với đơn từ 2.000.000₫</div>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box">★</div>
            <div>
              <div className="trust-title">Hỗ Trợ Kỹ Thuật 24/7</div>
              <div className="trust-sub">Đội ngũ kỹ thuật viên am hiểu kiến trúc phần cứng</div>
            </div>
          </div>
        </div>

        {/* Featured Products Showcase */}
        <section id="featured-section" className="section">
          <div className="section-header">
            <span className="section-tag">Bộ Sưu Tập Tiêu Biểu</span>
            <h2 className="section-title">Thiết Bị Công Nghệ Nổi Bật</h2>
            <p className="section-subtitle">
              Các cấu hình máy tính và thiết bị flagship được lập trình viên và người dùng chuyên nghiệp tin chọn.
            </p>
          </div>

          <div className="products-grid">
            {FEATURED_PRODUCTS.map((prod) => (
              <div key={prod.id} className="product-card">
                <div className="product-thumb-container">
                  <span className="product-badge-tag">{prod.badge}</span>
                  <span className="product-brand-tag">{prod.brand}</span>
                  <div className="product-thumb-icon">
                    {prod.category === 'Laptop' ? '💻' : prod.category === 'Điện thoại' ? '📱' : '🎧'}
                  </div>
                </div>

                <div className="product-details">
                  <h3 className="product-title">{prod.name}</h3>

                  <div className="product-specs">
                    {prod.specs.map((spec, index) => (
                      <span key={index} className="spec-chip">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="product-footer">
                    <span className="product-price">{prod.price}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => alert(`Sản phẩm: ${prod.name} sẽ được kích hoạt mua hàng ở Phase 4!`)}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
