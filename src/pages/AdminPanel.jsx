import { useState } from 'react';
import { Users, Building, CreditCard, BarChart3, Search } from 'lucide-react';
import { adminStats, venues } from '../data/mockData';
import './Dashboard.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Pengguna', value: adminStats.totalUsers.toLocaleString(), icon: <Users size={22} />, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    { label: 'Total Venue', value: adminStats.totalVenues, icon: <Building size={22} />, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
    { label: 'Total Transaksi', value: adminStats.totalTransactions.toLocaleString(), icon: <CreditCard size={22} />, color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
    { label: 'Total Pendapatan', value: `Rp${(adminStats.totalRevenue / 1000000).toFixed(0)}jt`, icon: <BarChart3 size={22} />, color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  ];

  const tabs = [
    { id: 'overview', label: 'Ringkasan' },
    { id: 'users', label: 'Pengguna' },
    { id: 'venues', label: 'Venue' },
    { id: 'transactions', label: 'Transaksi' },
  ];

  return (
    <div className="admin-page">
      <div className="container">
        <h1 style={{ marginBottom: 8 }}>Admin Panel</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Kelola platform The Field Club</p>

        {/* Stats */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div className="glass-card">
                <h3 style={{ marginBottom: 16 }}>Pengguna Terbaru</h3>
                {adminStats.recentUsers.slice(0, 3).map(u => (
                  <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</p>
                    </div>
                    <span className={`badge ${u.role === 'owner' ? 'badge-warning' : 'badge-info'}`}>{u.role}</span>
                  </div>
                ))}
              </div>
              <div className="glass-card">
                <h3 style={{ marginBottom: 16 }}>Venue Overview</h3>
                {venues.slice(0, 3).map(v => (
                  <div key={v.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{v.name}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.location}</p>
                    </div>
                    <span style={{ color: 'var(--accent-yellow)', fontSize: '0.9rem' }}>⭐ {v.rating}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0 14px' }}>
                <Search size={18} style={{ color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Cari pengguna..." style={{ background: 'none', border: 'none', color: 'var(--text-primary)', padding: '10px 0', width: '100%', fontSize: '0.9rem' }} />
              </div>
              <button className="btn btn-primary btn-sm">+ Tambah Pengguna</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Bergabung</th>
                  <th>Booking</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {adminStats.recentUsers.map(u => (
                  <tr key={u.id}>
                    <td><strong>{u.id}</strong></td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.role === 'owner' ? 'badge-warning' : 'badge-info'}`}>{u.role}</span></td>
                    <td>{u.joinDate}</td>
                    <td>{u.bookings}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary" style={{ marginRight: 4 }}>Edit</button>
                      <button className="btn btn-sm btn-outline" style={{ borderColor: 'var(--accent-red)', color: 'var(--accent-red)' }}>Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Venues */}
        {activeTab === 'venues' && (
          <div className="animate-fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Venue</th>
                  <th>Lokasi</th>
                  <th>Olahraga</th>
                  <th>Lapangan</th>
                  <th>Rating</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {venues.map(v => (
                  <tr key={v.id}>
                    <td><strong>{v.id}</strong></td>
                    <td>{v.name}</td>
                    <td>{v.location}</td>
                    <td>{v.sports.join(', ')}</td>
                    <td>{v.courts.length}</td>
                    <td><span style={{ color: 'var(--accent-yellow)' }}>⭐ {v.rating}</span></td>
                    <td><button className="btn btn-sm btn-secondary">Detail</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Transactions */}
        {activeTab === 'transactions' && (
          <div className="animate-fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID Transaksi</th>
                  <th>Pengguna</th>
                  <th>Venue</th>
                  <th>Tanggal</th>
                  <th>Jumlah</th>
                  <th>Metode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'TRX001', user: 'Ahmad Rizky', venue: 'GreenField', date: '2026-03-26', amount: 25000, method: 'GoPay', status: 'success' },
                  { id: 'TRX002', user: 'Sari Putri', venue: 'PadelZone', date: '2026-03-25', amount: 120000, method: 'QRIS', status: 'success' },
                  { id: 'TRX003', user: 'Budi Santoso', venue: 'Arena Victory', date: '2026-03-24', amount: 55000, method: 'BCA', status: 'pending' },
                  { id: 'TRX004', user: 'Dewi Lestari', venue: 'Sport Hub', date: '2026-03-23', amount: 60000, method: 'OVO', status: 'success' },
                  { id: 'TRX005', user: 'Reza F.', venue: 'Smash Arena', date: '2026-03-22', amount: 20000, method: 'DANA', status: 'refunded' },
                ].map(t => (
                  <tr key={t.id}>
                    <td><strong>{t.id}</strong></td>
                    <td>{t.user}</td>
                    <td>{t.venue}</td>
                    <td>{t.date}</td>
                    <td>Rp{t.amount.toLocaleString('id-ID')}</td>
                    <td>{t.method}</td>
                    <td><span className={`badge ${t.status === 'success' ? 'badge-success' : t.status === 'pending' ? 'badge-warning' : 'badge-danger'}`}>{t.status === 'success' ? 'Berhasil' : t.status === 'pending' ? 'Menunggu' : 'Refund'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
