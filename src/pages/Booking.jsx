import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, CreditCard, Camera, ShoppingBag } from 'lucide-react';
import { sports, venues, addOnServices, paymentMethods } from '../data/mockData';
import './Booking.css';

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  const steps = [
    { num: 1, label: 'Pilih Olahraga' },
    { num: 2, label: 'Pilih Tanggal' },
    { num: 3, label: 'Pilih Jam' },
    { num: 4, label: 'Layanan Tambahan' },
    { num: 5, label: 'Pembayaran' },
  ];

  const filteredVenues = selectedSport ? venues.filter(v => v.sports.includes(selectedSport)) : venues;

  const timeSlots = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  const toggleSlot = (slot) => {
    setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  };

  const toggleAddOn = (id) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const getTotal = () => {
    const courtPrice = selectedVenue ? selectedVenue.courts[0].price * selectedSlots.length : 0;
    const addOnPrice = selectedAddOns.reduce((sum, id) => {
      const a = addOnServices.find(s => s.id === id);
      return sum + (a ? a.price : 0);
    }, 0);
    return courtPrice + addOnPrice;
  };

  const paymentGroups = {
    'Transfer Bank': paymentMethods.filter(p => p.type === 'bank'),
    'QRIS': paymentMethods.filter(p => p.type === 'qris'),
    'E-Wallet': paymentMethods.filter(p => p.type === 'ewallet'),
    'Virtual Account': paymentMethods.filter(p => p.type === 'va'),
  };

  if (bookingComplete) {
    return (
      <div className="booking-page">
        <div className="container">
          <div className="booking-success">
            <div className="success-icon">✅</div>
            <h2>Booking Berhasil!</h2>
            <p>Pesanan Anda telah dikonfirmasi. Detail booking telah dikirim ke email Anda.</p>
            <div className="success-details glass-card">
              <div className="sd-row"><span>ID Booking</span><span>BK{Date.now().toString().slice(-6)}</span></div>
              <div className="sd-row"><span>Venue</span><span>{selectedVenue?.name}</span></div>
              <div className="sd-row"><span>Tanggal</span><span>{selectedDate}</span></div>
              <div className="sd-row"><span>Jam</span><span>{selectedSlots.sort().join(', ')}</span></div>
              <div className="sd-row"><span>Pembayaran</span><span>{paymentMethods.find(p=>p.id===selectedPayment)?.name}</span></div>
              <div className="sd-row total"><span>Total</span><span>Rp{getTotal().toLocaleString('id-ID')}</span></div>
            </div>
            <div className="success-actions">
              <Link to="/dashboard" className="btn btn-primary">Lihat Dashboard</Link>
              <Link to="/" className="btn btn-secondary">Kembali ke Beranda</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <h1 className="booking-title">Booking Lapangan</h1>

        {/* Progress Steps */}
        <div className="booking-steps">
          {steps.map((s, i) => (
            <div key={s.num} className={`step-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
              <div className="step-circle">
                {step > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className="step-label">{s.label}</span>
              {i < steps.length - 1 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="booking-content">
          {/* Step 1: Pilih Olahraga & Venue */}
          {step === 1 && (
            <div className="step-content animate-fade-up">
              <h2>Pilih Jenis Olahraga</h2>
              <div className="sport-select-grid">
                {sports.map(s => (
                  <button
                    key={s.id}
                    className={`sport-select-card ${selectedSport === s.id ? 'selected' : ''}`}
                    onClick={() => { setSelectedSport(s.id); setSelectedVenue(null); }}
                  >
                    <span className="ssc-icon">{s.icon}</span>
                    <span className="ssc-name">{s.name}</span>
                    <span className="ssc-price">{s.priceRange}</span>
                  </button>
                ))}
              </div>

              {selectedSport && (
                <>
                  <h2 style={{ marginTop: 32 }}>Pilih Venue</h2>
                  <div className="venue-select-grid">
                    {filteredVenues.map(v => (
                      <button
                        key={v.id}
                        className={`venue-select-card glass-card ${selectedVenue?.id === v.id ? 'selected' : ''}`}
                        onClick={() => setSelectedVenue(v)}
                      >
                        <h4>{v.name}</h4>
                        <p>{v.location}</p>
                        <span className="vsc-rating">⭐ {v.rating}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Pilih Tanggal */}
          {step === 2 && (
            <div className="step-content animate-fade-up">
              <h2>Pilih Tanggal Bermain</h2>
              <input
                type="date"
                className="input-field date-input"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          {/* Step 3: Pilih Jam */}
          {step === 3 && (
            <div className="step-content animate-fade-up">
              <h2>Pilih Jam Bermain</h2>
              <p className="step-note">Pilih satu atau lebih slot waktu</p>
              <div className="time-slot-grid">
                {timeSlots.map(slot => {
                  const isBooked = Math.random() > 0.7; // simulasi
                  return (
                    <button
                      key={slot}
                      className={`time-slot ${selectedSlots.includes(slot) ? 'selected' : ''} ${isBooked ? '' : ''}`}
                      onClick={() => toggleSlot(slot)}
                    >
                      <span className="ts-time">{slot}</span>
                      <span className="ts-price">Rp{(selectedVenue?.courts[0]?.price || 0).toLocaleString('id-ID')}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Add-Ons */}
          {step === 4 && (
            <div className="step-content animate-fade-up">
              <h2>Layanan Tambahan <span className="optional-tag">Opsional</span></h2>
              <div className="addon-select-grid">
                {addOnServices.map(a => (
                  <button
                    key={a.id}
                    className={`addon-select-card glass-card ${selectedAddOns.includes(a.id) ? 'selected' : ''}`}
                    onClick={() => toggleAddOn(a.id)}
                  >
                    <span className="asc-icon">{a.icon}</span>
                    <h4>{a.name}</h4>
                    <p>{a.description}</p>
                    <span className="asc-price">Rp{a.price.toLocaleString('id-ID')}</span>
                    {selectedAddOns.includes(a.id) && <span className="asc-check">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Pembayaran */}
          {step === 5 && (
            <div className="step-content animate-fade-up">
              <h2>Metode Pembayaran</h2>
              <div className="payment-groups">
                {Object.entries(paymentGroups).map(([group, methods]) => (
                  <div key={group} className="payment-group">
                    <h4>{group}</h4>
                    <div className="payment-methods">
                      {methods.map(m => (
                        <button
                          key={m.id}
                          className={`payment-method ${selectedPayment === m.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPayment(m.id)}
                        >
                          <span className="pm-icon">{m.icon}</span>
                          <span className="pm-name">{m.name}</span>
                          {selectedPayment === m.id && <span className="pm-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Ringkasan */}
              <div className="booking-final-summary glass-card">
                <h3>Ringkasan Pesanan</h3>
                <div className="bfs-row"><span>Venue</span><span>{selectedVenue?.name}</span></div>
                <div className="bfs-row"><span>Tanggal</span><span>{selectedDate}</span></div>
                <div className="bfs-row"><span>Jam</span><span>{selectedSlots.sort().join(', ')}</span></div>
                <div className="bfs-row"><span>Harga Lapangan</span><span>Rp{(selectedVenue?.courts[0]?.price * selectedSlots.length || 0).toLocaleString('id-ID')}</span></div>
                {selectedAddOns.map(id => {
                  const a = addOnServices.find(s => s.id === id);
                  return <div key={id} className="bfs-row"><span>{a?.name}</span><span>Rp{a?.price.toLocaleString('id-ID')}</span></div>;
                })}
                <div className="bfs-divider" />
                <div className="bfs-row bfs-total"><span>Total Pembayaran</span><span>Rp{getTotal().toLocaleString('id-ID')}</span></div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="booking-nav">
            {step > 1 && (
              <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={18} /> Kembali
              </button>
            )}
            <div style={{ flex: 1 }} />
            {step < 5 ? (
              <button
                className="btn btn-primary"
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedVenue) ||
                  (step === 2 && !selectedDate) ||
                  (step === 3 && selectedSlots.length === 0)
                }
              >
                Lanjut <ArrowRight size={18} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-lg"
                onClick={() => setBookingComplete(true)}
                disabled={!selectedPayment}
              >
                <CreditCard size={18} /> Bayar Sekarang
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
