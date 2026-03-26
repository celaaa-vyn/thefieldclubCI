import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Clock, Wifi, Car, Coffee, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { venues, sports, generateSchedule, reviews } from '../data/mockData';
import './CourtDetail.css';

export default function CourtDetail() {
  const { id } = useParams();
  const venue = venues.find(v => v.id === Number(id)) || venues[0];
  const [selectedCourt, setSelectedCourt] = useState(venue.courts[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const schedule = generateSchedule(selectedCourt.id, selectedDate);
  const courtSport = sports.find(s => s.id === selectedCourt.sport);

  const toggleSlot = (hour) => {
    setSelectedSlots(prev =>
      prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour]
    );
  };

  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    return dates;
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    return { day: days[d.getDay()], date: d.getDate() };
  };

  const venueReviews = reviews.filter(r => r.venue === venue.name);

  return (
    <div className="court-detail-page">
      <div className="container">
        {/* Header */}
        <div className="cd-header">
          <Link to="/search" className="back-link"><ChevronLeft size={20} /> Kembali</Link>
          <div className="cd-header-info">
            <div className="cd-badges">
              {venue.sports.map(s => {
                const sp = sports.find(sp => sp.id === s);
                return <span key={s} className="badge badge-success">{sp?.icon} {sp?.name}</span>;
              })}
            </div>
            <h1>{venue.name}</h1>
            <div className="cd-meta">
              <span><MapPin size={16} /> {venue.address}</span>
              <span><Star size={16} fill="#eab308" style={{color:'#eab308'}} /> {venue.rating} ({venue.reviewCount} review)</span>
              <span><Clock size={16} /> {venue.openHour} - {venue.closeHour}</span>
            </div>
          </div>
        </div>

        {/* Venue Visual */}
        <div className="cd-visual">
          <div className="cd-main-img" style={{ background: `linear-gradient(135deg, ${courtSport?.color || '#00C853'}25, var(--bg-elevated))` }}>
            <span className="cd-emoji">{courtSport?.icon || '🏟️'}</span>
          </div>
        </div>

        <div className="cd-content">
          <div className="cd-main">
            {/* Fasilitas */}
            <div className="cd-section">
              <h3>Fasilitas</h3>
              <div className="cd-facilities">
                {venue.facilities.map(f => (
                  <div key={f} className="facility-item">
                    <span className="facility-check">✓</span> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Pilih Lapangan */}
            <div className="cd-section">
              <h3>Pilih Lapangan</h3>
              <div className="court-tabs">
                {venue.courts.map(c => (
                  <button
                    key={c.id}
                    className={`court-tab ${selectedCourt.id === c.id ? 'active' : ''}`}
                    onClick={() => { setSelectedCourt(c); setSelectedSlots([]); }}
                  >
                    <span className="ct-name">{c.name}</span>
                    <span className="ct-price">Rp{c.price.toLocaleString('id-ID')}/jam</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kalender Tanggal */}
            <div className="cd-section">
              <h3>Pilih Tanggal</h3>
              <div className="date-selector">
                {getDates().map(d => {
                  const { day, date } = formatDate(d);
                  return (
                    <button
                      key={d}
                      className={`date-btn ${selectedDate === d ? 'active' : ''}`}
                      onClick={() => { setSelectedDate(d); setSelectedSlots([]); }}
                    >
                      <span className="date-day">{day}</span>
                      <span className="date-num">{date}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Jadwal Ketersediaan */}
            <div className="cd-section">
              <h3>Jadwal Ketersediaan</h3>
              <div className="schedule-legend">
                <span className="legend-item"><span className="legend-dot available" /> Tersedia</span>
                <span className="legend-item"><span className="legend-dot booked" /> Terbooking</span>
                <span className="legend-item"><span className="legend-dot selected" /> Dipilih</span>
              </div>
              <div className="schedule-grid">
                {schedule.map(slot => (
                  <button
                    key={slot.hour}
                    className={`schedule-slot ${!slot.available ? 'booked' : ''} ${selectedSlots.includes(slot.hour) ? 'selected' : ''}`}
                    disabled={!slot.available}
                    onClick={() => toggleSlot(slot.hour)}
                  >
                    <span className="slot-time">{slot.hour}</span>
                    <span className="slot-price">Rp{selectedCourt.price.toLocaleString('id-ID')}</span>
                    <span className="slot-status">{slot.available ? (selectedSlots.includes(slot.hour) ? '✓ Dipilih' : 'Tersedia') : 'Penuh'}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="cd-section">
              <h3>Review & Rating</h3>
              {venueReviews.length > 0 ? venueReviews.map(r => (
                <div key={r.id} className="cd-review">
                  <div className="cd-review-header">
                    <span className="cd-review-avatar">{r.avatar}</span>
                    <div>
                      <p className="cd-review-name">{r.user}</p>
                      <div className="cd-review-stars">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={14} fill={j < r.rating ? '#eab308' : 'none'} style={{color: j < r.rating ? '#eab308' : '#64748b'}} />
                        ))}
                      </div>
                    </div>
                    <span className="cd-review-date">{r.date}</span>
                  </div>
                  <p className="cd-review-text">{r.comment}</p>
                </div>
              )) : <p className="no-review-text">Belum ada review untuk venue ini.</p>}
            </div>
          </div>

          {/* Sidebar Booking */}
          <div className="cd-sidebar">
            <div className="booking-summary glass-card">
              <h3>Ringkasan Booking</h3>
              <div className="bs-venue">{venue.name}</div>
              <div className="bs-court">{selectedCourt.name}</div>
              <div className="bs-date">{new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>

              {selectedSlots.length > 0 ? (
                <>
                  <div className="bs-slots">
                    {selectedSlots.sort().map(s => (
                      <div key={s} className="bs-slot-item">
                        <span>{s}</span>
                        <span>Rp{selectedCourt.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bs-divider" />
                  <div className="bs-total">
                    <span>Total</span>
                    <span className="bs-total-price">Rp{(selectedSlots.length * selectedCourt.price).toLocaleString('id-ID')}</span>
                  </div>
                  <Link to="/booking" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Lanjut Booking
                  </Link>
                </>
              ) : (
                <p className="bs-empty">Pilih jam bermain untuk melanjutkan</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
