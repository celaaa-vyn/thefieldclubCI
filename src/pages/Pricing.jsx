import { sports } from '../data/mockData';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pricing.css';

export default function Pricing() {
  const plans = [
    { name: 'Casual', desc: 'Untuk pemain rekreasi', features: ['Booking per jam', 'Pembayaran online', 'Akses kalender', 'Review lapangan'], highlight: false },
    { name: 'Regular', desc: 'Untuk pemain aktif', features: ['Semua fitur Casual', 'Diskon 10% booking', 'Prioritas booking', 'Notifikasi slot favorit', 'Akses event'], highlight: true },
    { name: 'Community', desc: 'Untuk komunitas & tim', features: ['Semua fitur Regular', 'Diskon 20% booking', 'Buat event sendiri', 'Manajemen tim', 'Dashboard komunitas', 'Support prioritas'], highlight: false },
  ];

  return (
    <div className="pricing-page">
      <div className="container">
        <div className="pricing-header">
          <h1 className="section-title">Harga Sewa Lapangan</h1>
          <p className="section-subtitle">Harga terjangkau untuk semua jenis olahraga</p>
        </div>

        {/* Tabel Harga Per Olahraga */}
        <div className="price-cards-grid">
          {sports.map((s, i) => (
            <div key={s.id} className="price-sport-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="price-sport-header" style={{ borderColor: s.color }}>
                <span className="price-sport-icon" style={{ background: `${s.color}20` }}>{s.icon}</span>
                <h3>{s.name}</h3>
              </div>
              <div className="price-sport-body">
                <div className="price-range" style={{ color: s.color }}>
                  {s.priceRange}
                </div>
                <span className="price-per">{s.unit}</span>
                <p className="price-sport-desc">{s.description}</p>
              </div>
              <Link to={`/search?sport=${s.id}`} className="btn btn-outline btn-sm" style={{ borderColor: s.color, color: s.color }}>
                Cari Lapangan <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Membership Plans */}
        <div className="membership-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Keanggotaan</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            Dapatkan diskon dan fitur eksklusif dengan menjadi anggota
          </p>
          <div className="plans-grid">
            {plans.map((p, i) => (
              <div key={p.name} className={`plan-card glass-card ${p.highlight ? 'plan-highlight' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                {p.highlight && <div className="plan-badge">Populer</div>}
                <h3>{p.name}</h3>
                <p className="plan-desc">{p.desc}</p>
                <ul className="plan-features">
                  {p.features.map(f => (
                    <li key={f}><Check size={16} className="check-icon" /> {f}</li>
                  ))}
                </ul>
                <Link to="/register" className={`btn ${p.highlight ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', justifyContent: 'center' }}>
                  Daftar Sekarang
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="addon-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Layanan Tambahan</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            Tingkatkan pengalaman bermain dengan layanan add-on
          </p>
          <div className="addon-grid">
            {[
              { icon: '📸', name: 'Fotografi Olahraga', price: 'Rp150.000', desc: 'Dokumentasi foto profesional' },
              { icon: '🎥', name: 'Dokumentasi Video', price: 'Rp250.000', desc: 'Rekaman video HD pertandingan' },
              { icon: '🎬', name: 'Dokumentasi Event', price: 'Rp500.000', desc: 'Paket lengkap event komunitas' },
              { icon: '🥤', name: 'Paket Minuman', price: 'Rp50.000', desc: 'Air mineral & minuman isotonik' },
            ].map((a, i) => (
              <div key={a.name} className="addon-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="addon-icon">{a.icon}</span>
                <h4>{a.name}</h4>
                <p>{a.desc}</p>
                <span className="addon-price">{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
