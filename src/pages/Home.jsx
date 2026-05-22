import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Search, Calendar, CreditCard, Star, ArrowRight, ChevronRight, MapPin, Clock, Shield, Zap, Trophy } from 'lucide-react';
import { sports, venues, reviews } from '../data/mockData';
import { getSportIcon, getAvatarIcon, IconLightning, IconShuttlecock, IconSoccer, IconTennis, IconBasketball, IconArrowDown } from '../components/Icons';
import './Home.css';

export default function Home() {
  const pinContainerRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !pinContainerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = pinContainerRef.current;

    // Set initial states
    gsap.set('.hero-field-layer', { clipPath: 'circle(0% at 50% 50%)' });
    gsap.set('.hero-sky-layer', { opacity: 1 });
    gsap.set('.phase-title', { scale: 2.5, opacity: 0 });
    gsap.set('.phase-subtitle', { opacity: 0, y: 30 });
    gsap.set('.hero-badge', { opacity: 0, y: -20 });
    gsap.set('.hero-final-content', { opacity: 0, y: 60, visibility: 'hidden' });
    gsap.set('.fly-item', { opacity: 0, scale: 0 });
    gsap.set('.final-card', { opacity: 0, x: 50 });
    gsap.set('.final-stat', { opacity: 0, y: 20 });
    gsap.set('.scroll-hint', { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=2500',
        pin: true,
        scrub: 2,
        anticipatePin: 1,
      }
    });

    // ═══ PHASE 1: Title zooms in over sky ═══
    tl.to('.phase-title', { scale: 1, opacity: 1, duration: 1, ease: 'power2.out' });
    tl.to('.hero-badge', { opacity: 1, y: 0, duration: 0.4 }, '-=0.4');
    tl.to('.phase-subtitle', { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

    // Pause to enjoy
    tl.to({}, { duration: 0.3 });

    // ═══ PHASE 2: Iris reveal — field expands from center ═══
    // Title starts fading
    tl.to('.phase-center-content', { opacity: 0.4, scale: 0.85, duration: 1.5, ease: 'power2.inOut' });

    // Field layer circle expands — you see the field through the growing circle
    tl.to('.hero-field-layer', {
      clipPath: 'circle(75% at 50% 50%)',
      duration: 1.5,
      ease: 'power2.inOut',
    }, '<');

    // Title fully gone
    tl.to('.phase-center-content', { opacity: 0, scale: 0.6, duration: 0.5 });

    // Field fills screen completely
    tl.to('.hero-field-layer', {
      clipPath: 'circle(100% at 50% 50%)',
      duration: 0.5,
      ease: 'power2.out',
    }, '<');

    // Sky fades out (now fully behind field)
    tl.to('.hero-sky-layer', { opacity: 0, duration: 0.3 }, '<');

    // Sport icons fly in
    tl.to('.fly-item-1', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.3');
    tl.to('.fly-item-2', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '<+=0.08');
    tl.to('.fly-item-3', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, '<+=0.08');
    tl.to('.fly-item-4', { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '<+=0.08');

    // ═══ PHASE 3: Final content reveals ═══
    tl.to('.fly-item', { opacity: 0, scale: 0.3, duration: 0.5 }, '+=0.15');
    tl.set('.hero-final-content', { visibility: 'visible' });
    tl.to('.hero-final-content', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    tl.to('.final-card', { x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.7');
    tl.to('.final-stat', { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' }, '-=0.4');
    tl.to('.scroll-hint', { opacity: 1, duration: 0.2 }, '-=0.2');

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const stats = [
    { value: '100+', label: 'Pengguna Aktif' },
    { value: '15+', label: 'Venue Partner' },
    { value: '300+', label: 'Booking Berhasil' },
    { value: '4.8★', label: 'Rating Rata-rata' },
  ];

  const features = [
    { icon: <Search size={24} />, title: 'Cari & Filter', desc: 'Temukan lapangan berdasarkan olahraga, lokasi, jadwal, dan harga.' },
    { icon: <Calendar size={24} />, title: 'Jadwal Real-Time', desc: 'Lihat ketersediaan lapangan secara langsung tanpa double booking.' },
    { icon: <CreditCard size={24} />, title: 'Bayar Mudah', desc: 'Transfer bank, QRIS, e-wallet, dan virtual account tersedia.' },
    { icon: <Shield size={24} />, title: 'Booking Aman', desc: 'Konfirmasi instan dan jaminan ketersediaan lapangan.' },
    { icon: <Zap size={24} />, title: 'Proses Cepat', desc: 'Booking hanya dalam 3 langkah mudah dan cepat.' },
    { icon: <Trophy size={24} />, title: 'Event & Komunitas', desc: 'Ikut turnamen dan bergabung dengan komunitas olahraga.' },
  ];

  return (
    <div className="home-page">
      {/* ═══ PINNED CINEMATIC HERO ═══ */}
      <section className="hero-pin-wrapper" ref={pinContainerRef}>
        {/* Background layers */}
        <div className="hero-sky-layer" />
        <div className="hero-field-layer" />

        {/* Centered content — Phase 1 & 2 */}
        <div className="phase-center-content">
          <div className="hero-badge">
            <Zap size={14} /> Platform Booking Lapangan #1
          </div>
          <h1 className="phase-title">
            Booking Lapangan<br />
            <span className="text-gradient">Olahraga</span> Jadi<br />
            Lebih Mudah
          </h1>
          <p className="phase-subtitle">
            Temukan dan pesan lapangan olahraga favoritmu dengan harga terjangkau.
            Padel, Tenis, Badminton, Futsal, Basket, dan Mini Soccer.
          </p>
        </div>

        {/* Floating sports — fly in during Phase 2 */}
        <div className="hero-fly-items">
          <span className="fly-item fly-item-1"><IconSoccer size={48} color="#f97316" /></span>
          <span className="fly-item fly-item-2"><IconBasketball size={48} color="#ef4444" /></span>
          <span className="fly-item fly-item-3"><IconTennis size={48} color="#00C853" /></span>
          <span className="fly-item fly-item-4"><IconShuttlecock size={48} color="#8b5cf6" /></span>
        </div>

        {/* Final content — Phase 3 */}
        <div className="hero-final-content">
          <div className="final-left">
            <h2 className="final-heading">
              Booking Lapangan<br />
              <span className="text-gradient">Olahraga</span> Jadi Lebih Mudah
            </h2>
            <p className="final-desc">
              Temukan dan pesan lapangan olahraga favoritmu dengan harga terjangkau.
            </p>
            <div className="final-actions">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Booking Sekarang <ArrowRight size={18} />
              </Link>
              <Link to="/search" className="btn btn-secondary btn-lg hero-btn-secondary">
                Cari Lapangan
              </Link>
            </div>
            <div className="final-stats">
              {stats.map((s, i) => (
                <div key={i} className="final-stat">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="final-right">
            <div className="final-card">
              <div className="hc-icon">{getSportIcon('badminton', 28, '#8b5cf6')}</div>
              <div><p className="hc-title">Badminton</p><p className="hc-sub">Mulai Rp20.000/jam</p></div>
            </div>
            <div className="final-card">
              <div className="hc-icon">{getSportIcon('futsal', 28, '#f97316')}</div>
              <div><p className="hc-title">Futsal</p><p className="hc-sub">Mulai Rp50.000/jam</p></div>
            </div>
            <div className="final-card">
              <div className="hc-icon">{getSportIcon('padel', 28, '#00C853')}</div>
              <div><p className="hc-title">Padel</p><p className="hc-sub">Mulai Rp100.000/jam</p></div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span><IconArrowDown size={16} /> Scroll untuk lanjut</span>
        </div>
      </section>

      {/* Jenis Olahraga */}
      <section className="section sports-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Pilih Olahragamu</h2>
              <p className="section-subtitle">6 jenis olahraga tersedia dengan harga terjangkau</p>
            </div>
            <Link to="/pricing" className="btn btn-secondary btn-sm">
              Lihat Semua Harga <ChevronRight size={16} />
            </Link>
          </div>
          <div className="sports-grid">
            {sports.map((sport, i) => (
              <Link to={`/search?sport=${sport.id}`} key={sport.id} className="sport-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="sport-icon" style={{ background: `${sport.color}20` }}>
                  <span>{getSportIcon(sport.icon, 32, sport.color)}</span>
                </div>
                <h3>{sport.name}</h3>
                <p>{sport.description}</p>
                <span className="sport-price" style={{ color: sport.color }}>{sport.priceRange}</span>
                <span className="sport-unit">{sport.unit}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Utama */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Kenapa The Field Club?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Platform terlengkap untuk booking lapangan olahraga dengan pengalaman terbaik
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Populer */}
      <section className="section venues-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Venue Populer</h2>
              <p className="section-subtitle">Venue partner terbaik pilihan pengguna kami</p>
            </div>
            <Link to="/search" className="btn btn-secondary btn-sm">
              Lihat Semua <ChevronRight size={16} />
            </Link>
          </div>
          <div className="venues-grid">
            {venues.slice(0, 3).map((v, i) => (
              <Link to={`/court/${v.id}`} key={v.id} className="venue-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="venue-img" style={{ background: `linear-gradient(135deg, ${sports.find(s => s.id === v.sports[0])?.color || '#4CAF50'}30, var(--bg-secondary))` }}>
                  <span className="venue-emoji">{getSportIcon(v.sports[0], 40, sports.find(s => s.id === v.sports[0])?.color)}</span>
                </div>
                <div className="venue-info">
                  <div className="venue-badges">
                    {v.sports.map(s => (
                      <span key={s} className="badge badge-success">{s}</span>
                    ))}
                  </div>
                  <h3>{v.name}</h3>
                  <p className="venue-location"><MapPin size={14} /> {v.location}</p>
                  <div className="venue-meta">
                    <span className="venue-rating"><Star size={14} /> {v.rating} ({v.reviewCount})</span>
                    <span className="venue-hours"><Clock size={14} /> {v.openHour} - {v.closeHour}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header center">
            <h2 className="section-title">Kata Mereka</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Review dari pengguna yang sudah merasakan kemudahan The Field Club
            </p>
          </div>
          <div className="reviews-grid">
            {reviews.slice(0, 4).map((r, i) => (
              <div key={r.id} className="review-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="review-header">
                  <span className="review-avatar">{getAvatarIcon(r.avatar, 24)}</span>
                  <div>
                    <p className="review-name">{r.user}</p>
                    <p className="review-venue">{r.venue}</p>
                  </div>
                </div>
                <div className="review-stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className={j < r.rating ? 'star' : 'star empty'} fill={j < r.rating ? '#eab308' : 'none'} />
                  ))}
                </div>
                <p className="review-text">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-text">
              <h2>Siap Bermain?</h2>
              <p>Booking lapangan sekarang dan nikmati olahraga dengan harga terjangkau!</p>
            </div>
            <div className="cta-actions">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Booking Sekarang <ArrowRight size={18} />
              </Link>
              <Link to="/register" className="btn btn-secondary btn-lg">
                Daftar Gratis
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
