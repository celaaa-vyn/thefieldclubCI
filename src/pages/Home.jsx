import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Search, Calendar, CreditCard, Star, ArrowRight, ChevronRight, Users, MapPin, Clock, Shield, Zap, Trophy } from 'lucide-react';
import { sports, venues, reviews } from '../data/mockData';
import './Home.css';

/* ======================================================
   3D FLOATING BALLS — on a transparent canvas overlay
   Uses procedurally generated textures for realism
====================================================== */
function init3DOverlay(canvasContainer) {
  const THREE = window.THREE;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!THREE || !gsap || !ScrollTrigger) return null;
  gsap.registerPlugin(ScrollTrigger);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 500);
  camera.position.set(0, 0, 30);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.4;
  renderer.setClearColor(0x000000, 0); // Fully transparent
  canvasContainer.appendChild(renderer.domElement);

  // ========== LIGHTING (like outdoor sunlight) ==========
  const sunLight = new THREE.DirectionalLight(0xFFF5E0, 3.0);
  sunLight.position.set(5, 10, 8);
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0xA0C4FF, 0.8);
  fillLight.position.set(-5, 2, -3);
  scene.add(fillLight);

  const ambientLight = new THREE.AmbientLight(0x87CEEB, 0.6);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.5);
  scene.add(hemiLight);

  // ========== GENERATE TEXTURES VIA CANVAS ==========

  function createFootballTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // White base
    ctx.fillStyle = '#F8F8F8';
    ctx.fillRect(0, 0, 512, 256);
    
    // Draw pentagon patterns (classic football look)
    const pentagonPositions = [
      [128, 64], [384, 64], [64, 160], [256, 128], [448, 160],
      [192, 192], [320, 192], [128, 230], [384, 230], [256, 30],
      [50, 60], [462, 60], [256, 240]
    ];
    
    ctx.fillStyle = '#1A1A1A';
    pentagonPositions.forEach(([px, py]) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const r = 22;
        const x = px + r * Math.cos(angle);
        const y = py + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    });
    
    // Seam lines connecting pentagons
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    pentagonPositions.forEach(([px, py]) => {
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const r = 22;
        ctx.beginPath();
        ctx.moveTo(px + r * Math.cos(angle), py + r * Math.sin(angle));
        ctx.lineTo(px + (r + 16) * Math.cos(angle), py + (r + 16) * Math.sin(angle));
        ctx.stroke();
      }
    });
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function createBasketballTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Orange leather base with subtle grain
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#D4581C');
    gradient.addColorStop(0.3, '#E8651E');
    gradient.addColorStop(0.5, '#F07020');
    gradient.addColorStop(0.7, '#E8651E');
    gradient.addColorStop(1, '#D4581C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add leather grain texture
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 180 : 100}, ${Math.random() > 0.5 ? 60 : 40}, ${Math.random() > 0.5 ? 15 : 5}, 0.15)`;
      ctx.fillRect(x, y, 2, 1);
    }
    
    // Main seam lines (black, thick)
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 3.5;
    
    // Horizontal seam
    ctx.beginPath();
    ctx.moveTo(0, 128);
    ctx.lineTo(512, 128);
    ctx.stroke();
    
    // Vertical seam
    ctx.beginPath();
    ctx.moveTo(256, 0);
    ctx.lineTo(256, 256);
    ctx.stroke();
    
    // Curved side seams
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 128);
    for (let x = 0; x <= 512; x += 2) {
      const y = 128 + Math.sin((x / 512) * Math.PI * 2) * 80;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(0, 128);
    for (let x = 0; x <= 512; x += 2) {
      const y = 128 - Math.sin((x / 512) * Math.PI * 2) * 80;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function createTennisBallTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Yellow-green felt base
    ctx.fillStyle = '#C8D820';
    ctx.fillRect(0, 0, 512, 256);
    
    // Add fuzzy texture
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const brightness = Math.random();
      ctx.fillStyle = `rgba(${170 + brightness * 60}, ${195 + brightness * 40}, ${brightness > 0.5 ? 20 : 0}, 0.12)`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Characteristic curved white seam
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 4;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 2;
    
    ctx.beginPath();
    for (let x = 0; x <= 512; x += 2) {
      const t = (x / 512) * Math.PI * 2;
      const y = 128 + Math.sin(t * 2) * 60;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    ctx.beginPath();
    for (let x = 0; x <= 512; x += 2) {
      const t = (x / 512) * Math.PI * 2;
      const y = 128 - Math.sin(t * 2) * 60;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // ========== CREATE BALLS with textures ==========
  const balls = [];

  // FOOTBALL
  const fbTex = createFootballTexture();
  const fbGeo = new THREE.SphereGeometry(2.8, 48, 48);
  const fbMat = new THREE.MeshStandardMaterial({ 
    map: fbTex, roughness: 0.4, metalness: 0.05 
  });
  const football = new THREE.Mesh(fbGeo, fbMat);
  football.position.set(-12, 4, 5);
  scene.add(football);
  balls.push({ mesh: football, basePos: { x: -12, y: 4, z: 5 }, speed: 0.5, phase: 0 });

  // BASKETBALL
  const bbTex = createBasketballTexture();
  const bbGeo = new THREE.SphereGeometry(2.6, 48, 48);
  const bbMat = new THREE.MeshStandardMaterial({ 
    map: bbTex, roughness: 0.7, metalness: 0.0 
  });
  const basketball = new THREE.Mesh(bbGeo, bbMat);
  basketball.position.set(10, -2, 0);
  scene.add(basketball);
  balls.push({ mesh: basketball, basePos: { x: 10, y: -2, z: 0 }, speed: 0.7, phase: 2 });

  // TENNIS BALL
  const tbTex = createTennisBallTexture();
  const tbGeo = new THREE.SphereGeometry(1.6, 48, 48);
  const tbMat = new THREE.MeshStandardMaterial({ 
    map: tbTex, roughness: 0.85, metalness: 0.0 
  });
  const tennis = new THREE.Mesh(tbGeo, tbMat);
  tennis.position.set(3, 7, -3);
  scene.add(tennis);
  balls.push({ mesh: tennis, basePos: { x: 3, y: 7, z: -3 }, speed: 0.9, phase: 4 });

  // ========== FLOATING PARTICLES (sparkle in sunlight) ==========
  const particleCount = 60;
  const pGeo = new THREE.BufferGeometry();
  const pPositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 40;
    pPositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  pGeo.setAttribute('position', new THREE.Float32BufferAttribute(pPositions, 3));
  const pMat = new THREE.PointsMaterial({ 
    color: 0xffffff, size: 0.12, transparent: true, opacity: 0.5 
  });
  scene.add(new THREE.Points(pGeo, pMat));

  // ========== ANIMATION ==========
  let animationId;
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    balls.forEach((b) => {
      // Gentle floating
      b.mesh.position.y = b.basePos.y + Math.sin(t * b.speed + b.phase) * 1.8;
      b.mesh.position.x = b.basePos.x + Math.sin(t * b.speed * 0.5 + b.phase) * 0.8;
      // Slow rotation
      b.mesh.rotation.x += 0.003;
      b.mesh.rotation.y += 0.005;
    });

    // Particles drift
    const pp = pGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      pp[i * 3 + 1] += Math.sin(t + i) * 0.003;
    }
    pGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // ========== GSAP scroll — balls drift upward and out ==========
  balls.forEach((b, i) => {
    gsap.to(b.mesh.position, {
      y: b.basePos.y + 12,
      z: b.basePos.z - 8,
      scrollTrigger: {
        trigger: canvasContainer,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });
    gsap.to(b.mesh.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 3,
      scrollTrigger: {
        trigger: canvasContainer,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });
  });

  // Resize
  function onResize() {
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  }
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = null;
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        cleanup = init3DOverlay(canvasRef.current);
      }
    }, 200);
    return () => { clearTimeout(timer); if (cleanup) cleanup(); };
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
      {/* Hero Section — real photo bg + 3D ball overlay */}
      <section className="hero" id="hero-section">
        <div className="hero-photo-bg" />
        <div className="hero-3d-canvas" ref={canvasRef} />
        <div className="hero-overlay" />
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
                <div className="venue-img" style={{ background: `linear-gradient(135deg, ${sports.find(s=>s.id===v.sports[0])?.color || '#4CAF50'}30, var(--bg-secondary))` }}>
                  <span className="venue-emoji">{sports.find(s=>s.id===v.sports[0])?.icon || '🏟️'}</span>
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
