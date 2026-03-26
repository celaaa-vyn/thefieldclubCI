import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="av-icon">⚡</span>
            <h2>Bergabung dengan<br />The Field Club</h2>
            <p>Daftar gratis dan mulai booking lapangan olahraga favoritmu</p>
            <div className="av-sports">
              {['🎾', '🏸', '⚽', '🏀'].map((e, i) => (
                <span key={i} className="av-sport-icon" style={{ animationDelay: `${i * 0.5}s` }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <h1>Daftar</h1>
            <p className="auth-subtitle">Buat akun baru untuk mulai booking</p>

            <form className="auth-form" onSubmit={e => e.preventDefault()}>
              <div className="input-group">
                <label>Nama Lengkap</label>
                <div className="input-with-icon">
                  <User size={18} />
                  <input type="text" className="input-field" placeholder="Masukkan nama lengkap" />
                </div>
              </div>

              <div className="input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input type="email" className="input-field" placeholder="nama@email.com" />
                </div>
              </div>

              <div className="input-group">
                <label>Nomor HP</label>
                <div className="input-with-icon">
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📱</span>
                  <input type="tel" className="input-field" placeholder="+62 812 3456 7890" />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="Min. 8 karakter" />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="checkbox-label" style={{ marginBottom: 8 }}>
                <input type="checkbox" /> Saya setuju dengan <a href="#" className="auth-link">Syarat & Ketentuan</a>
              </label>

              <Link to="/dashboard" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                Daftar Sekarang
              </Link>

              <div className="auth-divider">
                <span>atau</span>
              </div>

              <button type="button" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                🔵 Daftar dengan Google
              </button>
            </form>

            <p className="auth-footer-text">
              Sudah punya akun? <Link to="/login" className="auth-link">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
