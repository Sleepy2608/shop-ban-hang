import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar-content">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-dot"></span>
          <span className="brand-name">SLYBYTE<span className="brand-accent"> SHOP</span></span>
        </Link>

        {/* Categories navigation */}
        <nav className="navbar-nav">
          <Link to="/" className="nav-link active">Trang chủ</Link>
          <span className="nav-link disabled" title="Đang phát triển ở Phase 4">Sản phẩm</span>
          <span className="nav-link disabled" title="Đang phát triển ở Phase 4">Laptop</span>
          <span className="nav-link disabled" title="Đang phát triển ở Phase 4">Điện thoại</span>
        </nav>

        {/* User / Auth action */}
        <div className="navbar-actions">
          {isAuthenticated && user ? (
            <div className="user-menu">
              <div className="user-badge">
                <span className="user-avatar">{user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}</span>
                <span className="user-name">{user.fullName || user.email}</span>
                {user.role === 'ADMIN' && <span className="role-tag">ADMIN</span>}
              </div>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm" title="Đăng xuất">
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-ghost btn-sm">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
