import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Search, Calendar, CreditCard, Star, ArrowRight, ChevronRight, Users, MapPin, Clock, Shield, Zap, Trophy } from 'lucide-react';
import { sports, venues, reviews } from '../data/mockData';
import './Home.css';

function initHero3D(canvasEl) {
  const THREE = window.THREE;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!THREE || !gsap || !ScrollTrigger) return null;
  gsap.registerPlugin(ScrollTrigger);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    canvasEl.clientWidth / canvasEl.clientHeight,
    0.1, 500
  );
  camera.position.set(0, 0, 28);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  canvasEl.appendChild(renderer.domElement);

  // ─── LIGHTING ───
  const mainLight = new THREE.DirectionalLight(0xFFF5E0, 2.5);
  mainLight.position.set(8, 15, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 1024;
  mainLight.shadow.mapSize.height = 1024;
  mainLight.shadow.camera.near = 0.5;
  mainLight.shadow.camera.far = 60;
  mainLight.shadow.camera.left = -20;
  mainLight.shadow.camera.right = 20;
  mainLight.shadow.camera.top = 20;
  mainLight.shadow.camera.bottom = -20;
  mainLight.shadow.radius = 8;
  mainLight.shadow.bias = -0.002;
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0xFFD0A0, 0.8);
  rimLight.position.set(-5, 8, -5);
  scene.add(rimLight);

  const ambientLight = new THREE.AmbientLight(0x8EC8F0, 0.6);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.4);
  scene.add(hemiLight);

  // ─── SHADOW RECEIVER PLANE (invisible, just catches shadows) ───
  const shadowPlaneGeo = new THREE.PlaneGeometry(50, 50);
  const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.25 });
  const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -8;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // ─── TEXTURE GENERATION ───
  function generateFootballTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const ctx = c.getContext('2d');

    // White leather base
    const bg = ctx.createRadialGradient(512, 256, 0, 512, 256, 512);
    bg.addColorStop(0, '#FAFAFA');
    bg.addColorStop(1, '#E8E8E8');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle leather grain
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = `rgba(200,200,200,${Math.random() * 0.15})`;
      ctx.fillRect(Math.random()*1024, Math.random()*512, 2 + Math.random()*2, 1);
    }

    // Black pentagons
    const pentagons = [
      [170, 85], [512, 60], [854, 85], [85, 256], [340, 220],
      [680, 220], [940, 256], [170, 427], [512, 452], [854, 427],
      [512, 256], [256, 380], [768, 380], [256, 130], [768, 130]
    ];
    
    pentagons.forEach(([px, py]) => {
      ctx.fillStyle = '#1A1A1A';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 72 - 90) * Math.PI / 180;
        const r = 36;
        const x = px + r * Math.cos(a);
        const y = py + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Connecting seams from each vertex
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const a = (i * 72 - 90) * Math.PI / 180;
        const r = 36;
        ctx.beginPath();
        ctx.moveTo(px + r * Math.cos(a), py + r * Math.sin(a));
        ctx.lineTo(px + (r + 28) * Math.cos(a), py + (r + 28) * Math.sin(a));
        ctx.stroke();
      }
    });

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function generateBasketballTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const ctx = c.getContext('2d');

    // Leather gradient
    const grad = ctx.createLinearGradient(0, 0, 1024, 512);
    grad.addColorStop(0, '#C04E12');
    grad.addColorStop(0.25, '#E06518');
    grad.addColorStop(0.5, '#F07020');
    grad.addColorStop(0.75, '#E06518');
    grad.addColorStop(1, '#C04E12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Pebble grain texture
    for (let i = 0; i < 12000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const bright = Math.random();
      ctx.fillStyle = `rgba(${130 + bright * 60}, ${50 + bright * 30}, ${bright * 15}, 0.12)`;
      ctx.beginPath();
      ctx.arc(x, y, 0.5 + Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Black seam lines
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 5;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 3;

    // Horizontal
    ctx.beginPath();
    ctx.moveTo(0, 256); ctx.lineTo(1024, 256);
    ctx.stroke();

    // Vertical
    ctx.beginPath();
    ctx.moveTo(512, 0); ctx.lineTo(512, 512);
    ctx.stroke();

    // Curved seams
    ctx.lineWidth = 4;
    // Curve 1
    ctx.beginPath();
    for (let x = 0; x <= 1024; x += 3) {
      const y = 256 + Math.sin((x / 1024) * Math.PI * 2) * 140;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    // Curve 2
    ctx.beginPath();
    for (let x = 0; x <= 1024; x += 3) {
      const y = 256 - Math.sin((x / 1024) * Math.PI * 2) * 140;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.shadowBlur = 0;
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  function generateTennisTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 512;
    const ctx = c.getContext('2d');

    // Yellow-green felt
    ctx.fillStyle = '#C5D616';
    ctx.fillRect(0, 0, 1024, 512);

    // Felt fuzz
    for (let i = 0; i < 20000; i++) {
      const bright = Math.random();
      ctx.fillStyle = `rgba(${170 + bright * 50}, ${190 + bright * 30}, ${bright * 20}, 0.08)`;
      ctx.beginPath();
      ctx.arc(Math.random() * 1024, Math.random() * 512, 1 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }

    // White seam curves
    ctx.strokeStyle = '#FFFFFFDD';
    ctx.lineWidth = 6;
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 4;
    
    ctx.beginPath();
    for (let x = 0; x <= 1024; x += 3) {
      const y = 256 + Math.sin((x / 1024) * Math.PI * 4) * 100;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.beginPath();
    for (let x = 0; x <= 1024; x += 3) {
      const y = 256 - Math.sin((x / 1024) * Math.PI * 4) * 100;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  // ─── CREATE BALLS ───
  const balls = [];
  const ballGeo = new THREE.SphereGeometry(1, 64, 64);

  // Football
  const fb = new THREE.Mesh(ballGeo.clone(), new THREE.MeshStandardMaterial({
    map: generateFootballTexture(), roughness: 0.35, metalness: 0.05,
    envMapIntensity: 0.8,
  }));
  fb.scale.setScalar(2.2);
  fb.castShadow = true;
  fb.position.set(-10, 5, 2);
  scene.add(fb);
  balls.push({ mesh: fb, origin: { x: -10, y: 5, z: 2 }, phase: 0 });

  // Basketball
  const bb = new THREE.Mesh(ballGeo.clone(), new THREE.MeshStandardMaterial({
    map: generateBasketballTexture(), roughness: 0.65, metalness: 0.0,
    envMapIntensity: 0.5,
  }));
  bb.scale.setScalar(2.0);
  bb.castShadow = true;
  bb.position.set(11, -1, -1);
  scene.add(bb);
  balls.push({ mesh: bb, origin: { x: 11, y: -1, z: -1 }, phase: 2.5 });

  // Tennis ball
  const tb = new THREE.Mesh(ballGeo.clone(), new THREE.MeshStandardMaterial({
    map: generateTennisTexture(), roughness: 0.88, metalness: 0.0,
    envMapIntensity: 0.3,
  }));
  tb.scale.setScalar(1.3);
  tb.castShadow = true;
  tb.position.set(3, 8, -2);
  scene.add(tb);
  balls.push({ mesh: tb, origin: { x: 3, y: 8, z: -2 }, phase: 4.8 });

  // ─── SOFT DROP SHADOWS (circles beneath each ball) ───
  const shadowGeo = new THREE.CircleGeometry(1, 32);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000, transparent: true, opacity: 0.18,
    depthWrite: false,
  });

  const dropShadows = [];
  balls.forEach(b => {
    const shadow = new THREE.Mesh(shadowGeo.clone(), shadowMat.clone());
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(b.origin.x, -8, b.origin.z);
    shadow.scale.set(b.mesh.scale.x * 1.2, b.mesh.scale.x * 1.2, 1);
    scene.add(shadow);
    dropShadows.push(shadow);
  });

  // ─── ANIMATION ───
  let animId;
  const clock = new THREE.Clock();

  function animate() {
    animId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    balls.forEach((b, i) => {
      const p = b.phase;
      // Multi-frequency floating — more organic
      const floatY = Math.sin(t * 0.4 + p) * 1.5
                   + Math.sin(t * 0.7 + p * 1.3) * 0.6
                   + Math.sin(t * 1.1 + p * 0.7) * 0.3;
      const driftX = Math.sin(t * 0.25 + p * 2) * 0.8
                   + Math.sin(t * 0.55 + p) * 0.3;
      const driftZ = Math.cos(t * 0.3 + p * 1.5) * 0.4;

      b.mesh.position.y = b.origin.y + floatY;
      b.mesh.position.x = b.origin.x + driftX;
      b.mesh.position.z = b.origin.z + driftZ;

      // Organic slow rotation (tumble)
      b.mesh.rotation.x += Math.sin(t * 0.3 + p) * 0.003;
      b.mesh.rotation.y += 0.004;
      b.mesh.rotation.z += Math.cos(t * 0.2 + p) * 0.002;

      // Drop shadow follows ball, gets lighter when ball is higher
      const sh = dropShadows[i];
      sh.position.x = b.mesh.position.x;
      sh.position.z = b.mesh.position.z + 2; // offset for perspective
      const heightAboveGround = b.mesh.position.y - (-8);
      const shadowScale = b.mesh.scale.x * (1 + heightAboveGround * 0.04);
      sh.scale.set(shadowScale, shadowScale * 0.6, 1);
      sh.material.opacity = Math.max(0.04, 0.2 - heightAboveGround * 0.008);
    });

    renderer.render(scene, camera);
  }
  animate();

  // ─── GSAP — balls entrance & scroll parallax ───
  // Balls start off-screen and float in
  balls.forEach((b, i) => {
    const startX = b.origin.x > 0 ? b.origin.x + 30 : b.origin.x - 30;
    b.mesh.position.x = startX;
    b.mesh.position.y = b.origin.y + 15;
    b.mesh.material.transparent = true;
    b.mesh.material.opacity = 0;

    gsap.to(b.mesh.position, {
      x: b.origin.x,
      y: b.origin.y,
      duration: 1.8 + i * 0.3,
      delay: 0.5 + i * 0.25,
      ease: 'power3.out',
    });
    gsap.to(b.mesh.material, {
      opacity: 1,
      duration: 1.2,
      delay: 0.5 + i * 0.25,
      ease: 'power2.out',
    });
  });

  // On scroll — balls rise and spread out
  balls.forEach((b) => {
    gsap.to(b.mesh.position, {
      y: `+=${10}`,
      scrollTrigger: {
        trigger: canvasEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 2.5,
      },
    });
  });

  // Resize
  function onResize() {
    camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasEl.clientWidth, canvasEl.clientHeight);
  }
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}

export default function Home() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    let cleanup = null;
    const timer = setTimeout(() => {
      if (canvasRef.current) cleanup = initHero3D(canvasRef.current);
    }, 300);
    return () => { clearTimeout(timer); if (cleanup) cleanup(); };
  }, []);

  // GSAP parallax for sky → field scroll transition
  useEffect(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || !heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const skyLayer = hero.querySelector('.hero-sky');
    const fieldLayer = hero.querySelector('.hero-field');
    const content = hero.querySelector('.hero-content');

    if (skyLayer) {
      gsap.to(skyLayer, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
    if (fieldLayer) {
      gsap.to(fieldLayer, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: '30% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
    if (content) {
      gsap.from(content, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
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
      {/* Hero — Sky-to-Field Parallax */}
      <section className="hero" id="hero-section" ref={heroRef}>
        {/* Sky layer — moves slower on scroll (parallax) */}
        <div className="hero-sky" />
        {/* Field layer — revealed as you scroll */}
        <div className="hero-field" />
        {/* 3D floating balls */}
        <div className="hero-3d-canvas" ref={canvasRef} />
        {/* Dark gradient for text readability */}
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
