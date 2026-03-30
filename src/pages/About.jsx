import { Target, Eye, Heart, Users, TrendingUp, Award } from 'lucide-react';
import './About.css';

export default function About() {
  const team = [
    { name: 'Jonathan Davin', role: 'Founder & CEO', emoji: '👨‍💼' },
    { name: 'Arnoldus Jovan', role: 'CMO', emoji: '👲🏻' },
    { name: 'Kellvin', role: 'CTO', emoji: '👨‍💻' },
    { name: 'Michael Michelin', role: 'CFO', emoji: '👩‍🎨' },
  ];

  const impacts = [
    { icon: <Users size={28} />, value: '2,400+', label: 'Pengguna Aktif' },
    { icon: <Target size={28} />, value: '50+', label: 'Venue Partner' },
    { icon: <TrendingUp size={28} />, value: '10,000+', label: 'Booking Berhasil' },
    { icon: <Award size={28} />, value: '6', label: 'Jenis Olahraga' },
  ];

  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <div className="about-badge">Tentang Kami</div>
          <h1>Meningkatkan Akses<br /><span className="text-gradient">Olahraga untuk Semua</span></h1>
          <p>
            The Field Club hadir sebagai solusi untuk menjembatani masyarakat dengan fasilitas olahraga berkualitas 
            dengan harga yang terjangkau. Kami percaya bahwa setiap orang berhak menikmati olahraga.
          </p>
        </div>

        {/* Visi Misi */}
        <div className="vm-grid">
          <div className="vm-card glass-card">
            <div className="vm-icon"><Eye size={28} /></div>
            <h3>Visi</h3>
            <p>
              Menjadi platform booking lapangan olahraga nomor satu di Indonesia yang 
              mendemokratisasi akses olahraga berkualitas untuk semua kalangan masyarakat.
            </p>
          </div>
          <div className="vm-card glass-card">
            <div className="vm-icon"><Target size={28} /></div>
            <h3>Misi</h3>
            <ul>
              <li>Menyediakan platform booking yang mudah dan terpercaya</li>
              <li>Menawarkan harga sewa yang terjangkau tanpa mengurangi kualitas</li>
              <li>Membangun komunitas olahraga yang aktif dan inklusif</li>
              <li>Mendukung pemilik venue dalam mengelola bisnis mereka</li>
            </ul>
          </div>
          <div className="vm-card glass-card">
            <div className="vm-icon"><Heart size={28} /></div>
            <h3>Nilai Kami</h3>
            <ul>
              <li>Aksesibilitas — Olahraga untuk semua</li>
              <li>Transparansi — Harga jelas, tanpa biaya tersembunyi</li>
              <li>Komunitas — Membangun kebersamaan lewat olahraga</li>
              <li>Inovasi — Terus berkembang untuk pengalaman terbaik</li>
            </ul>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="impact-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Dampak Kami</h2>
          <div className="impact-grid">
            {impacts.map((imp, i) => (
              <div key={i} className="impact-card">
                <div className="impact-icon">{imp.icon}</div>
                <span className="impact-value">{imp.value}</span>
                <span className="impact-label">{imp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tim */}
        <div className="team-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Tim Kami</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            Profesional berdedikasi di balik The Field Club
          </p>
          <div className="team-grid">
            {team.map((t, i) => (
              <div key={i} className="team-card glass-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="team-avatar">{t.emoji}</span>
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
