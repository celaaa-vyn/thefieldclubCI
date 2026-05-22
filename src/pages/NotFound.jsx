import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { IconSearchEmpty } from '../components/Icons';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <div className="notfound-icon">
          <IconSearchEmpty size={64} color="var(--text-muted)" />
        </div>
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Halaman Tidak Ditemukan</h2>
        <p className="notfound-desc">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Kembali ke Beranda
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary btn-lg">
            <ArrowLeft size={18} /> Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
