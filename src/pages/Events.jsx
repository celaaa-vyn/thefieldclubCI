import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { events, sports } from '../data/mockData';
import './Events.css';

export default function Events() {
  return (
    <div className="events-page">
      <div className="container">
        <div className="events-header">
          <h1 className="section-title">Event & Komunitas</h1>
          <p className="section-subtitle">Bergabung dengan event olahraga dan komunitas di sekitarmu</p>
        </div>

        {/* Event Cards */}
        <div className="events-grid">
          {events.map((event, i) => {
            const sport = sports.find(s => s.id === event.sport);
            return (
              <div key={event.id} className="event-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="event-banner" style={{ background: `linear-gradient(135deg, ${sport?.color || '#00C853'}30, var(--bg-elevated))` }}>
                  <span className="event-sport-emoji">{sport?.icon || '🏟️'}</span>
                  <span className={`badge ${event.status === 'open' ? 'badge-success' : 'badge-danger'}`} style={{ position: 'absolute', top: 12, right: 12 }}>
                    {event.status === 'open' ? 'Pendaftaran Dibuka' : 'Penuh'}
                  </span>
                </div>
                <div className="event-info">
                  <span className="badge badge-info" style={{ marginBottom: 8 }}>{sport?.name}</span>
                  <h3>{event.title}</h3>
                  <p className="event-desc">{event.description}</p>
                  <div className="event-meta">
                    <span><Calendar size={14} /> {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span><MapPin size={14} /> {event.venue}</span>
                    <span><Users size={14} /> {event.participants}/{event.maxParticipants} peserta</span>
                  </div>
                  <div className="event-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }} />
                    </div>
                    <span className="progress-text">{Math.round((event.participants / event.maxParticipants) * 100)}% terisi</span>
                  </div>
                  <button className={`btn ${event.status === 'open' ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%', justifyContent: 'center' }} disabled={event.status !== 'open'}>
                    {event.status === 'open' ? 'Daftar Sekarang' : 'Kuota Penuh'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Section */}
        <div className="community-section">
          <div className="community-box glass-card">
            <div className="community-content">
              <h2>Buat Komunitasmu Sendiri</h2>
              <p>Kumpulkan teman-teman olahragamu dan buat event komunitas bersama. Dapatkan diskon khusus untuk booking reguler!</p>
              <div className="community-features">
                <div className="cf-item">
                  <span className="cf-icon">👥</span>
                  <span>Undang Pemain</span>
                </div>
                <div className="cf-item">
                  <span className="cf-icon">📅</span>
                  <span>Buat Event</span>
                </div>
                <div className="cf-item">
                  <span className="cf-icon">💬</span>
                  <span>Chat Grup</span>
                </div>
                <div className="cf-item">
                  <span className="cf-icon">🏆</span>
                  <span>Turnamen</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary">
                Buat Komunitas <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
