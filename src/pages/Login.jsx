import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="av-icon">⚡</span>
            <h2>Selamat Datang<br />di The Field Club</h2>
            <p>Platform booking lapangan olahraga terjangkau #1 di Indonesia</p>
            <div className="av-sports">
              {['🎾', '🏸', '⚽', '🏀'].map((e, i) => (
                <span key={i} className="av-sport-icon" style={{ animationDelay: `${i * 0.5}s` }}>{e}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <h1>Masuk</h1>
            <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>

            <form className="auth-form" onSubmit={e => e.preventDefault()}>
              <div className="input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input type="email" className="input-field" placeholder="nama@email.com" />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input type={showPass ? 'text' : 'password'} className="input-field" placeholder="Masukkan password" />
                  <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Ingat saya
                </label>
                <a href="#" className="forgot-link">Lupa password?</a>
              </div>

              <Link to="/dashboard" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                Masuk
              </Link>

              <div className="auth-divider">
                <span>atau</span>
              </div>

              <button type="button" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                🔵 Masuk dengan Google
              </button>
            </form>

            <p className="auth-footer-text">
              Belum punya akun? <Link to="/register" className="auth-link">Daftar sekarang</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
