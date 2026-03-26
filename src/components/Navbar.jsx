import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, ChevronDown } from 'lucide-react';
import { notifications } from '../data/mockData';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const unread = notifications.filter(n => !n.read).length;

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/search', label: 'Cari Lapangan' },
    { path: '/pricing', label: 'Harga' },
    { path: '/events', label: 'Event' },
    { path: '/about', label: 'Tentang' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">The Field Club</span>
        </Link>

        {/* Menu Navigasi Desktop */}
        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Tombol CTA di mobile */}
          <div className="nav-mobile-actions">
            <Link to="/login" className="btn btn-secondary btn-sm" onClick={() => setMenuOpen(false)}>Masuk</Link>
            <Link to="/booking" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Booking Sekarang</Link>
          </div>
        </div>

        {/* Aksi Kanan */}
        <div className="navbar-actions">
          {/* Notifikasi */}
          <div className="nav-dropdown-wrapper">
            <button className="nav-icon-btn" onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}>
              <Bell size={20} />
              {unread > 0 && <span className="notif-badge">{unread}</span>}
            </button>
            {notifOpen && (
              <div className="nav-dropdown notif-dropdown">
                <div className="dropdown-header">
                  <h4>Notifikasi</h4>
                  <span className="badge badge-info">{unread} baru</span>
                </div>
                {notifications.slice(0, 4).map(n => (
                  <div key={n.id} className={`notif-item ${!n.read ? 'unread' : ''}`}>
                    <div className="notif-dot" />
                    <div>
                      <p className="notif-title">{n.title}</p>
                      <p className="notif-msg">{n.message}</p>
                      <span className="notif-time">{n.time}</span>
                    </div>
                  </div>
                ))}
                <Link to="/dashboard" className="dropdown-footer" onClick={() => setNotifOpen(false)}>
                  Lihat Semua Notifikasi
                </Link>
              </div>
            )}
          </div>

          {/* Profil */}
          <div className="nav-dropdown-wrapper">
            <button className="nav-icon-btn profile-btn" onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}>
              <User size={20} />
              <ChevronDown size={14} />
            </button>
            {profileOpen && (
              <div className="nav-dropdown profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar">👤</div>
                  <div>
                    <p className="profile-name">Pengguna Demo</p>
                    <p className="profile-email">demo@fieldclub.id</p>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileOpen(false)}>Dashboard Saya</Link>
                <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileOpen(false)}>Riwayat Booking</Link>
                <Link to="/owner" className="dropdown-item" onClick={() => setProfileOpen(false)}>Dashboard Pemilik</Link>
                <Link to="/admin" className="dropdown-item" onClick={() => setProfileOpen(false)}>Admin Panel</Link>
                <div className="dropdown-divider" />
                <Link to="/login" className="dropdown-item text-danger" onClick={() => setProfileOpen(false)}>Keluar</Link>
              </div>
            )}
          </div>

          <Link to="/booking" className="btn btn-primary btn-sm nav-cta">Booking</Link>

          {/* Tombol burger mobile */}
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
