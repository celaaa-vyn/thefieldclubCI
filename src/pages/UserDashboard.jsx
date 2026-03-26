import { useState } from 'react';
import { Calendar, Clock, CreditCard, User, FileText, Star, Bell } from 'lucide-react';
import { bookingHistory, notifications } from '../data/mockData';
import './Dashboard.css';

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  const tabs = [
    { id: 'bookings', label: 'Riwayat Booking', icon: <Calendar size={18} /> },
    { id: 'schedule', label: 'Jadwal Bermain', icon: <Clock size={18} /> },
    { id: 'invoices', label: 'Invoice', icon: <FileText size={18} /> },
    { id: 'profile', label: 'Profil', icon: <User size={18} /> },
    { id: 'notif', label: 'Notifikasi', icon: <Bell size={18} /> },
  ];

  const statusColor = {
    completed: 'badge-success',
    upcoming: 'badge-info',
    cancelled: 'badge-danger',
  };

  const statusLabel = {
    completed: 'Selesai',
    upcoming: 'Akan Datang',
    cancelled: 'Dibatalkan',
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dash-header">
          <div className="dash-user">
            <div className="dash-avatar">👤</div>
            <div>
              <h1>Halo, Pengguna Demo!</h1>
              <p>demo@fieldclub.id • Anggota sejak Jan 2026</p>
            </div>
          </div>
          <div className="dash-quick-stats">
            <div className="dqs-item">
              <span className="dqs-value">{bookingHistory.length}</span>
              <span className="dqs-label">Total Booking</span>
            </div>
            <div className="dqs-item">
              <span className="dqs-value">{bookingHistory.filter(b=>b.status==='upcoming').length}</span>
              <span className="dqs-label">Akan Datang</span>
            </div>
            <div className="dqs-item">
              <span className="dqs-value">4.8</span>
              <span className="dqs-label">Rating</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 32 }}>
          {tabs.map(t => (
            <button key={t.id} className={`tab ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="dash-content">
          {/* Riwayat Booking */}
          {activeTab === 'bookings' && (
            <div className="animate-fade-in">
              <div className="booking-list">
                {bookingHistory.map(b => (
                  <div key={b.id} className="booking-card glass-card">
                    <div className="bc-header">
                      <span className="bc-id">{b.id}</span>
                      <span className={`badge ${statusColor[b.status]}`}>{statusLabel[b.status]}</span>
                    </div>
                    <h4>{b.venue}</h4>
                    <p className="bc-court">{b.court} • {b.sport}</p>
                    <div className="bc-details">
                      <span><Calendar size={14} /> {b.date}</span>
                      <span><Clock size={14} /> {b.time}</span>
                      <span><CreditCard size={14} /> {b.paymentMethod}</span>
                    </div>
                    <div className="bc-footer">
                      <span className="bc-price">Rp{b.price.toLocaleString('id-ID')}</span>
                      {b.status === 'upcoming' && <button className="btn btn-sm btn-outline">Batalkan</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jadwal Bermain */}
          {activeTab === 'schedule' && (
            <div className="animate-fade-in">
              <h3 className="tab-title">Jadwal Mendatang</h3>
              {bookingHistory.filter(b => b.status === 'upcoming').map(b => (
                <div key={b.id} className="schedule-card glass-card">
                  <div className="sc-date-block">
                    <span className="sc-day">{new Date(b.date).getDate()}</span>
                    <span className="sc-month">{new Date(b.date).toLocaleString('id-ID', { month: 'short' })}</span>
                  </div>
                  <div className="sc-info">
                    <h4>{b.venue}</h4>
                    <p>{b.court} • {b.sport}</p>
                    <span className="sc-time"><Clock size={14} /> {b.time}</span>
                  </div>
                </div>
              ))}
              {bookingHistory.filter(b => b.status === 'upcoming').length === 0 && (
                <p className="empty-state">Tidak ada jadwal mendatang.</p>
              )}
            </div>
          )}

          {/* Invoice */}
          {activeTab === 'invoices' && (
            <div className="animate-fade-in">
              <h3 className="tab-title">Riwayat Invoice</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Venue</th>
                    <th>Tanggal</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingHistory.map(b => (
                    <tr key={b.id}>
                      <td><strong>{b.id}</strong></td>
                      <td>{b.venue}</td>
                      <td>{b.date}</td>
                      <td>Rp{b.price.toLocaleString('id-ID')}</td>
                      <td><span className={`badge ${statusColor[b.status]}`}>{statusLabel[b.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Profil */}
          {activeTab === 'profile' && (
            <div className="animate-fade-in">
              <h3 className="tab-title">Edit Profil</h3>
              <form className="profile-form" onSubmit={e => e.preventDefault()}>
                <div className="pf-avatar-section">
                  <div className="pf-avatar">👤</div>
                  <button type="button" className="btn btn-secondary btn-sm">Ubah Foto</button>
                </div>
                <div className="pf-grid">
                  <div className="input-group">
                    <label>Nama Lengkap</label>
                    <input className="input-field" defaultValue="Pengguna Demo" />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input className="input-field" defaultValue="demo@fieldclub.id" />
                  </div>
                  <div className="input-group">
                    <label>Nomor HP</label>
                    <input className="input-field" defaultValue="+62 812 3456 7890" />
                  </div>
                  <div className="input-group">
                    <label>Kota</label>
                    <input className="input-field" defaultValue="Jakarta" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
              </form>
            </div>
          )}

          {/* Notifikasi */}
          {activeTab === 'notif' && (
            <div className="animate-fade-in">
              <h3 className="tab-title">Notifikasi</h3>
              <div className="notif-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notif-card glass-card ${!n.read ? 'unread' : ''}`}>
                    <div className="nc-icon">
                      {n.type === 'booking' && '📋'}
                      {n.type === 'reminder' && '⏰'}
                      {n.type === 'payment' && '💳'}
                      {n.type === 'event' && '🎉'}
                      {n.type === 'promo' && '🏷️'}
                    </div>
                    <div className="nc-content">
                      <h4>{n.title}</h4>
                      <p>{n.message}</p>
                      <span className="nc-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
