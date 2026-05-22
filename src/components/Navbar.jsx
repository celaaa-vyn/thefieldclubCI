import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { notifications } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { IconLightning, IconUserAvatar } from './Icons';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();
  const unread = notifications.filter(n => !n.read).length;
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setNotifOpen(false);
    setProfileOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown-wrapper')) {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/search', label: 'Cari Lapangan' },
    { path: '/pricing', label: 'Harga' },
    { path: '/events', label: 'Event' },
    { path: '/about', label: 'Tentang' },
  ];

  return (
    <nav className={`navbar${scrolled ? ' navbar-scrolled' : ''}${isHome && !scrolled ? ' navbar-transparent' : ''}`}>
      <div className="navbar-inner container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon"><IconLightning size={18} /></span>
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
            {isLoggedIn ? (
              <>
                <button className="nav-icon-btn profile-btn" onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}>
                  <User size={20} />
                  <ChevronDown size={14} />
                </button>
                {profileOpen && (
                  <div className="nav-dropdown profile-dropdown">
                    <div className="profile-header">
                      <div className="profile-avatar"><IconUserAvatar size={28} /></div>
                      <div>
                        <p className="profile-name">{user.name}</p>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileOpen(false)}>Dashboard Saya</Link>
                    <Link to="/dashboard" className="dropdown-item" onClick={() => setProfileOpen(false)}>Riwayat Booking</Link>
                    <Link to="/owner" className="dropdown-item" onClick={() => setProfileOpen(false)}>Dashboard Pemilik</Link>
                    <Link to="/admin" className="dropdown-item" onClick={() => setProfileOpen(false)}>Admin Panel</Link>
                    <div className="dropdown-divider" />
                    <button className="dropdown-item text-danger" onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}>Keluar</button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="btn btn-secondary btn-sm nav-login-btn">Masuk</Link>
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
