import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">The Field Club</span>
            </div>
            <p className="footer-desc">
              Platform booking lapangan olahraga terjangkau untuk semua. Bermain kapan saja, di mana saja.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Instagram">📷</a>
              <a href="#" className="social-btn" aria-label="Twitter">🐦</a>
              <a href="#" className="social-btn" aria-label="Facebook">📘</a>
              <a href="#" className="social-btn" aria-label="YouTube">🎬</a>
            </div>
          </div>

          {/* Navigasi */}
          <div className="footer-col">
            <h4>Navigasi</h4>
            <Link to="/">Beranda</Link>
            <Link to="/search">Cari Lapangan</Link>
            <Link to="/pricing">Harga</Link>
            <Link to="/events">Event & Komunitas</Link>
            <Link to="/about">Tentang Kami</Link>
          </div>

          {/* Layanan */}
          <div className="footer-col">
            <h4>Layanan</h4>
            <Link to="/booking">Booking Online</Link>
            <Link to="/search">Pencarian Lapangan</Link>
            <Link to="/dashboard">Akun Saya</Link>
            <Link to="/owner">Dashboard Pemilik</Link>
            <a href="#">FAQ</a>
          </div>

          {/* Kontak */}
          <div className="footer-col">
            <h4>Kontak</h4>
            <a href="#" className="footer-contact">
              <Mail size={16} /> info@thefieldclub.id
            </a>
            <a href="#" className="footer-contact">
              <Phone size={16} /> +62 21 1234 5678
            </a>
            <a href="#" className="footer-contact">
              <MapPin size={16} /> Jakarta, Indonesia
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 The Field Club. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
