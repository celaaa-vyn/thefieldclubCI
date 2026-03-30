import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Search, Calendar, CreditCard, Star, ArrowRight, ChevronRight, Users, MapPin, Clock, Shield, Zap, Trophy } from 'lucide-react';
import { sports, venues, reviews } from '../data/mockData';
import './Home.css';

function init3DScene(canvasContainer) {
  const THREE = window.THREE;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  if (!THREE || !gsap || !ScrollTrigger) return null;

  gsap.registerPlugin(ScrollTrigger);

  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(60, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 2000);
  camera.position.set(0, 12, 35);
  camera.lookAt(0, 2, 0);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.6;
  canvasContainer.appendChild(renderer.domElement);

  // Sky
  if (THREE.Sky) {
    const sky = new THREE.Sky();
    sky.scale.setScalar(1000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 2;
    skyUniforms['rayleigh'].value = 1.5;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(90 - 45);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    skyUniforms['sunPosition'].value.copy(sun);
  } else {
    // Fallback sky color
    scene.background = new THREE.Color(0x87CEEB);
  }

  // Lighting
  const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.5);
  dirLight.position.set(10, 20, 10);
  dirLight.castShadow = false;
  scene.add(dirLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x4CAF50, 0.4);
  scene.add(hemiLight);

  // Ground/Field
  const fieldGeo = new THREE.PlaneGeometry(80, 80);
  const fieldMat = new THREE.MeshStandardMaterial({
    color: 0x4CAF50,
    roughness: 0.9,
    metalness: 0.0,
  });
  const field = new THREE.Mesh(fieldGeo, fieldMat);
  field.rotation.x = -Math.PI / 2;
  field.position.y = -0.1;
  scene.add(field);

  // Field Lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

  // Outer boundary
  const outerPts = [
    new THREE.Vector3(-20, 0.01, -15),
    new THREE.Vector3(20, 0.01, -15),
    new THREE.Vector3(20, 0.01, 15),
    new THREE.Vector3(-20, 0.01, 15),
    new THREE.Vector3(-20, 0.01, -15),
  ];
  const outerGeo = new THREE.BufferGeometry().setFromPoints(outerPts);
  scene.add(new THREE.Line(outerGeo, lineMat));

  // Center line
  const centerLinePts = [new THREE.Vector3(0, 0.01, -15), new THREE.Vector3(0, 0.01, 15)];
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(centerLinePts), lineMat));

  // Center circle
  const circlePoints = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    circlePoints.push(new THREE.Vector3(Math.cos(angle) * 5, 0.01, Math.sin(angle) * 5));
  }
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(circlePoints), lineMat));

  // Sports Balls
  const balls = [];

  // Football (white with dark patches simulated by material)
  const footballGeo = new THREE.IcosahedronGeometry(1.2, 1);
  const footballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.05 });
  const football = new THREE.Mesh(footballGeo, footballMat);
  football.position.set(-10, 8, -8);
  scene.add(football);
  balls.push({ mesh: football, baseY: 8, speed: 0.8, rotSpeed: 0.01 });

  // Add dark pentagons to football
  const footballWireGeo = new THREE.IcosahedronGeometry(1.22, 1);
  const footballWireMat = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });
  const footballWire = new THREE.Mesh(footballWireGeo, footballWireMat);
  football.add(footballWire);

  // Basketball (orange)
  const basketballGeo = new THREE.SphereGeometry(1.1, 32, 32);
  const basketballMat = new THREE.MeshStandardMaterial({ color: 0xFF6B2B, roughness: 0.6, metalness: 0.05 });
  const basketball = new THREE.Mesh(basketballGeo, basketballMat);
  basketball.position.set(12, 10, -5);
  scene.add(basketball);
  balls.push({ mesh: basketball, baseY: 10, speed: 1.0, rotSpeed: 0.015 });

  // Basketball seam lines
  const seamMat = new THREE.LineBasicMaterial({ color: 0x333333 });
  // Horizontal seam
  const hSeamPts = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    hSeamPts.push(new THREE.Vector3(Math.cos(angle) * 1.12, 0, Math.sin(angle) * 1.12));
  }
  basketball.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(hSeamPts), seamMat));
  // Vertical seam
  const vSeamPts = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    vSeamPts.push(new THREE.Vector3(0, Math.cos(angle) * 1.12, Math.sin(angle) * 1.12));
  }
  basketball.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(vSeamPts), seamMat));

  // Tennis ball (yellow-green)
  const tennisGeo = new THREE.SphereGeometry(0.7, 32, 32);
  const tennisMat = new THREE.MeshStandardMaterial({ color: 0xCCFF00, roughness: 0.8, metalness: 0.0 });
  const tennis = new THREE.Mesh(tennisGeo, tennisMat);
  tennis.position.set(5, 6, 8);
  scene.add(tennis);
  balls.push({ mesh: tennis, baseY: 6, speed: 1.2, rotSpeed: 0.02 });

  // Tennis seam
  const tSeamPts = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const wobble = Math.sin(angle * 2) * 0.1;
    tSeamPts.push(new THREE.Vector3(Math.cos(angle) * (0.72 + wobble), Math.sin(angle) * 0.72, wobble * 2));
  }
  const tSeamMat = new THREE.LineBasicMaterial({ color: 0xffffff });
  tennis.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(tSeamPts), tSeamMat));

  // Clouds
  const clouds = [];
  const cloudMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  for (let i = 0; i < 8; i++) {
    const cw = 8 + Math.random() * 12;
    const ch = 3 + Math.random() * 4;
    const cloudGeo = new THREE.PlaneGeometry(cw, ch);
    const cloud = new THREE.Mesh(cloudGeo, cloudMat.clone());
    cloud.material.opacity = 0.2 + Math.random() * 0.35;
    cloud.position.set(
      (Math.random() - 0.5) * 100,
      25 + Math.random() * 15,
      -20 + Math.random() * -30
    );
    cloud.rotation.x = -Math.PI * 0.1;
    scene.add(cloud);
    clouds.push({ mesh: cloud, speed: 0.5 + Math.random() * 1.0 });
  }

  // Animation state
  let animationId;
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // Float & rotate balls
    balls.forEach((b) => {
      b.mesh.position.y = b.baseY + Math.sin(elapsed * b.speed) * 1.5;
      b.mesh.rotation.x += b.rotSpeed;
      b.mesh.rotation.y += b.rotSpeed * 0.7;
    });

    // Drift clouds
    clouds.forEach((c) => {
      c.mesh.position.x += c.speed * 0.005;
      if (c.mesh.position.x > 60) c.mesh.position.x = -60;
    });

    renderer.render(scene, camera);
  }
  animate();

  // GSAP ScrollTrigger — camera moves forward into field on scroll
  gsap.to(camera.position, {
    z: 10,
    y: 5,
    scrollTrigger: {
      trigger: canvasContainer,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
    },
  });

  // Cloud parallax on scroll
  clouds.forEach((c, i) => {
    gsap.to(c.mesh.position, {
      x: `+=${8 + i * 3}`,
      scrollTrigger: {
        trigger: canvasContainer,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
      },
    });
  });

  // Handle resize
  function onResize() {
    const w = canvasContainer.clientWidth;
    const h = canvasContainer.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Return cleanup
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', onResize);
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    ScrollTrigger.getAll().forEach(t => t.kill());
  };
}

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cleanup = null;
    // Delay init so DOM is ready and scripts loaded
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        cleanup = init3DScene(canvasRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (cleanup) cleanup();
    };
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
      {/* Hero Section with 3D Background */}
      <section className="hero" id="hero-section">
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
              <Link to="/search" className="btn btn-secondary btn-lg">
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
