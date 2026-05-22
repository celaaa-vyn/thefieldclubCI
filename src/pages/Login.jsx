import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { IconLightning, IconTennis, IconShuttlecock, IconSoccer, IconBasketball } from '../components/Icons';
import './Auth.css';

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email || 'demo@fieldclub.id', 'Pengguna Demo');
    navigate('/dashboard');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="av-icon"><IconLightning size={36} color="#FF6B2B" /></span>
            <h2>Selamat Datang<br />di The Field Club</h2>
            <p>Platform booking lapangan olahraga terjangkau #1 di Indonesia</p>
            <div className="av-sports">
              {[
                <IconTennis size={28} color="#3b82f6" />,
                <IconShuttlecock size={28} color="#8b5cf6" />,
                <IconSoccer size={28} color="#f97316" />,
                <IconBasketball size={28} color="#ef4444" />,
              ].map((icon, i) => (
                <span key={i} className="av-sport-icon" style={{ animationDelay: `${i * 0.5}s` }}>{icon}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="auth-form-wrapper">
          <div className="auth-form-inner">
            <h1>Masuk</h1>
            <p className="auth-subtitle">Masuk ke akun Anda untuk melanjutkan</p>

            <form className="auth-form" onSubmit={handleLogin}>
              <div className="input-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input type="email" className="input-field" placeholder="nama@email.com" value={email} onChange={e => setEmail(e.target.value)} />
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

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                Masuk
              </button>

              <div className="auth-divider">
                <span>atau</span>
              </div>

              <button type="button" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Masuk dengan Google
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
