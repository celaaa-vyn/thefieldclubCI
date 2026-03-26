import { useState } from 'react';
import { Calendar, DollarSign, Users, Star, TrendingUp } from 'lucide-react';
import { ownerStats } from '../data/mockData';
import './Dashboard.css';

export default function OwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Booking', value: ownerStats.totalBookings, icon: <Calendar size={22} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    { label: 'Pendapatan Bulan Ini', value: `Rp${(ownerStats.monthlyRevenue / 1000000).toFixed(1)}jt`, icon: <DollarSign size={22} />, color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
    { label: 'Lapangan Aktif', value: ownerStats.activeCourts, icon: <Users size={22} />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
    { label: 'Rating Rata-rata', value: ownerStats.avgRating, icon: <Star size={22} />, color: '#eab308', bg: 'rgba(234,179,8,0.1)' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'Daftar Booking' },
    { id: 'schedule', label: 'Atur Jadwal' },
    { id: 'pricing', label: 'Atur Harga' },
  ];

  const maxRevenue = Math.max(...ownerStats.monthlyData.map(d => d.revenue));

  return (
    <div className="owner-page">
      <div className="container">
        <h1 style={{ marginBottom: 8 }}>Dashboard Pemilik Venue</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>GreenField Sports Center</p>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <span className="stat-card-value" style={{ color: s.color }}>{s.value}</span>
              <span className="stat-card-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 32 }}>
          {tabs.map(t => (
            <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="chart-placeholder">
              <h3 style={{ marginBottom: 24 }}>
                <TrendingUp size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Pendapatan Bulanan
              </h3>
              <div className="chart-bars">
                {ownerStats.monthlyData.map(d => (
                  <div key={d.month} className="chart-bar-wrapper">
                    <span className="chart-bar-value">Rp{(d.revenue / 1000000).toFixed(1)}jt</span>
                    <div className="chart-bar" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} />
                    <span className="chart-bar-label">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <h3 style={{ marginBottom: 16 }}>Booking Terbaru</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pelanggan</th>
                  <th>Lapangan</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Status</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {ownerStats.recentBookings.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.customer}</td>
                    <td>{b.court}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td><span className={`badge ${b.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>{b.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}</span></td>
                    <td>Rp{b.amount.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Daftar Booking */}
        {activeTab === 'bookings' && (
          <div className="animate-fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pelanggan</th>
                  <th>Lapangan</th>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Status</th>
                  <th>Jumlah</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {ownerStats.recentBookings.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.id}</strong></td>
                    <td>{b.customer}</td>
                    <td>{b.court}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td><span className={`badge ${b.status === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>{b.status === 'confirmed' ? 'Dikonfirmasi' : 'Menunggu'}</span></td>
                    <td>Rp{b.amount.toLocaleString('id-ID')}</td>
                    <td><button className="btn btn-sm btn-outline">Detail</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Atur Jadwal */}
        {activeTab === 'schedule' && (
          <div className="animate-fade-in">
            <div className="glass-card" style={{ marginBottom: 20 }}>
              <h3 style={{ marginBottom: 16 }}>Atur Jadwal Lapangan</h3>
              <div className="pf-grid">
                <div className="input-group">
                  <label>Pilih Lapangan</label>
                  <select className="input-field">
                    <option>Court A - Badminton</option>
                    <option>Court B - Badminton</option>
                    <option>Lapangan 1 - Futsal</option>
                    <option>Ring 1 - Basket</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Tanggal</label>
                  <input type="date" className="input-field" />
                </div>
                <div className="input-group">
                  <label>Jam Buka</label>
                  <input type="time" className="input-field" defaultValue="06:00" />
                </div>
                <div className="input-group">
                  <label>Jam Tutup</label>
                  <input type="time" className="input-field" defaultValue="23:00" />
                </div>
              </div>
              <button className="btn btn-primary">Simpan Jadwal</button>
            </div>
          </div>
        )}

        {/* Atur Harga */}
        {activeTab === 'pricing' && (
          <div className="animate-fade-in">
            <div className="glass-card">
              <h3 style={{ marginBottom: 16 }}>Atur Harga Sewa</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Lapangan</th>
                    <th>Olahraga</th>
                    <th>Harga/Jam</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Court A', sport: 'Badminton', price: 25000 },
                    { name: 'Court B', sport: 'Badminton', price: 30000 },
                    { name: 'Lapangan 1', sport: 'Futsal', price: 60000 },
                    { name: 'Ring 1', sport: 'Basket', price: 55000 },
                  ].map((c, i) => (
                    <tr key={i}>
                      <td>{c.name}</td>
                      <td>{c.sport}</td>
                      <td>
                        <input type="number" className="input-field" defaultValue={c.price} style={{ width: 140, padding: '6px 10px' }} />
                      </td>
                      <td><button className="btn btn-sm btn-primary">Simpan</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
