import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Search, Calendar, CreditCard, Star, ArrowRight, ChevronRight, MapPin, Clock, Shield, Zap, Trophy } from 'lucide-react';
import { sports, venues, reviews } from '../data/mockData';
import './Home.css';

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const skyLayer = hero.querySelector('.hero-sky-layer');
    const cloudsLayer = hero.querySelector('.hero-clouds-layer');
    const fieldLayer = hero.querySelector('.hero-field-layer');
    const atmosphere = hero.querySelector('.hero-atmosphere');
    const content = hero.querySelector('.hero-content');
    const floatItems = hero.querySelectorAll('.hero-float-item');
    const scrollIndicator = hero.querySelector('.scroll-indicator');

    // ─── Parallax layers — each moves at different speed ───

    // Sky moves slowest (far away)
    if (skyLayer) {
      gsap.to(skyLayer, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Clouds move at medium speed
    if (cloudsLayer) {
      gsap.to(cloudsLayer, {
        yPercent: -40,
        x: 30,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Field layer moves fastest (closest)
    if (fieldLayer) {
      gsap.to(fieldLayer, {
        yPercent: -15,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '20% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Content fades in from below
    if (content) {
      gsap.fromTo(content,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: 'power3.out' }
      );

      // Content parallax — moves slightly on scroll
      gsap.to(content, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Floating items appear staggered
    if (floatItems.length > 0) {
      gsap.fromTo(floatItems,
        { y: 40, scale: 0.5 },
        {
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          delay: 0.8,
          ease: 'elastic.out(1, 0.6)',
          onComplete: () => floatItems.forEach(el => el.classList.add('visible'))
        }
      );

      // Float items parallax
      floatItems.forEach((item, i) => {
        gsap.to(item, {
          y: -60 - i * 20,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }

    // Scroll indicator fades out
    if (scrollIndicator) {
      gsap.to(scrollIndicator, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: hero,
          start: '10% top',
          end: '25% top',
          scrub: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const stats = [
    { value: '2,400+', label: 'Pengguna Aktif' },
    { value: '50+', label: 'Venue Partner' },
    { value: '10,000+', label: 'Booking Berhasil' },
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
      {/* ═══ CINEMATIC PARALLAX HERO ═══ */}
      <section className="hero" id="hero-section" ref={heroRef}>
        {/* Parallax layers — sky → clouds → field */}
        <div className="hero-sky-layer" />
        <div className="hero-clouds-layer" />
        <div className="hero-field-layer" />
        <div className="hero-atmosphere" />

        {/* Floating sport emojis */}
        <div className="hero-floating-elements">
          <span className="hero-float-item">⚽</span>
          <span className="hero-float-item">🏀</span>
          <span className="hero-float-item">🎾</span>
          <span className="hero-float-item">🏸</span>
          <span className="hero-float-item">🥅</span>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-indicator-line" />
        </div>

        {/* Content */}
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Zap size={14} /> Platform Booking Lapangan #1
            </div>
            <h1>
              Booking Lapangan<br />
              <span className="text-gradient">Olahraga</span> Jadi<br />
              Lebih Mudah
            </h1>
            <p className="hero-desc">
              Temukan dan pesan lapangan olahraga favoritmu dengan harga terjangkau.
              Padel, Tenis, Badminton, Futsal, Basket, dan Mini Soccer — semua ada di sini.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Booking Sekarang <ArrowRight size={18} />
              </Link>
              <Link to="/search" className="btn btn-secondary btn-lg hero-btn-secondary">
                Cari Lapangan
              </Link>
            </div>
            <div className="hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <div className="hc-icon">🏸</div>
              <div>
                <p className="hc-title">Badminton</p>
                <p className="hc-sub">Mulai Rp20.000/jam</p>
              </div>
            </div>
            <div className="hero-card hero-card-2">
              <div className="hc-icon">⚽</div>
              <div>
                <p className="hc-title">Futsal</p>
                <p className="hc-sub">Mulai Rp50.000/jam</p>
              </div>
            </div>
            <div className="hero-card hero-card-3">
              <div className="hc-icon">🎾</div>
              <div>
                <p className="hc-title">Padel</p>
                <p className="hc-sub">Mulai Rp100.000/jam</p>
              </div>
            </div>
            <div className="hero-ring hero-ring-1" />
            <div className="hero-ring hero-ring-2" />
          </div>
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
                  <span>{sport.icon}</span>
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
                  <span className="venue-emoji">{sports.find(s => s.id === v.sports[0])?.icon || '🏟️'}</span>
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
                  <span className="review-avatar">{r.avatar}</span>
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

      {/* CTA Akhir */}
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
