import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin, Star, Clock, Filter, X } from 'lucide-react';
import { sports, venues, locations } from '../data/mockData';
import { IconSearchEmpty } from '../components/Icons';
import './Search.css';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [selectedSport, setSelectedSport] = useState(searchParams.get('sport') || '');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  const filtered = venues.filter(v => {
    if (selectedSport && !v.sports.includes(selectedSport)) return false;
    if (selectedLocation && v.location !== selectedLocation) return false;
    if (searchText) {
      const q = searchText.toLowerCase();
      if (!v.name.toLowerCase().includes(q) && !v.address.toLowerCase().includes(q) && !v.location.toLowerCase().includes(q)) return false;
    }
    // Price range filter: check if any court is within range
    if (priceRange[1] < 1000000) {
      const hasAffordableCourt = v.courts.some(c => c.price <= priceRange[1]);
      if (!hasAffordableCourt) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    if (sortBy === 'price') {
      const aMin = Math.min(...a.courts.map(c => c.price));
      const bMin = Math.min(...b.courts.map(c => c.price));
      return aMin - bMin;
    }
    return 0;
  });

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <h1 className="section-title">Cari Lapangan</h1>
          <p className="section-subtitle">Temukan lapangan olahraga terbaik di dekatmu</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar glass-card">
          <div className="search-input-wrapper">
            <SearchIcon size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Cari berdasarkan nama venue atau lokasi..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <div className="search-filters-inline">
            <select className="filter-select" value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
              <option value="">Semua Olahraga</option>
              {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select className="filter-select" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
              <option value="">Semua Lokasi</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <input
              type="date"
              className="filter-select"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => {}}>
              <SearchIcon size={18} /> Cari
            </button>
          </div>
          <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
            <Filter size={18} /> Filter
          </button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="mobile-filters glass-card">
            <div className="mobile-filter-header">
              <h3>Filter</h3>
              <button onClick={() => setShowFilters(false)}><X size={20} /></button>
            </div>
            <div className="input-group">
              <label>Jenis Olahraga</label>
              <select className="input-field" value={selectedSport} onChange={e => setSelectedSport(e.target.value)}>
                <option value="">Semua</option>
                {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Lokasi</label>
              <select className="input-field" value={selectedLocation} onChange={e => setSelectedLocation(e.target.value)}>
                <option value="">Semua</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label>Tanggal</label>
              <input type="date" className="input-field" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Harga Max: Rp{priceRange[1].toLocaleString('id-ID')}</label>
              <input type="range" min={0} max={1000000} step={50000} value={priceRange[1]} onChange={e=>setPriceRange([0, +e.target.value])} />
            </div>
          </div>
        )}

        {/* Sort & Results Count */}
        <div className="search-meta">
          <p className="results-count">{filtered.length} venue ditemukan</p>
          <div className="sort-wrapper">
            <span>Urutkan:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
              <option value="rating">Rating Tertinggi</option>
              <option value="reviews">Review Terbanyak</option>
              <option value="price">Harga Terendah</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="search-results">
          {filtered.map((v, i) => {
            const primarySport = sports.find(s => s.id === v.sports[0]);
            const sportColor = primarySport?.color || '#00C853';
            return (
              <Link to={`/court/${v.id}`} key={v.id} className="result-card glass-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="result-img">
                  <img
                    src={v.image}
                    alt={v.name}
                    className="result-venue-img"
                    loading="lazy"
                    decoding="async"
                    onLoad={e => {
                      e.target.classList.add('loaded');
                      e.target.parentElement.style.animation = 'none';
                      e.target.parentElement.style.background = 'none';
                    }}
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.parentElement.style.animation = 'none';
                      e.target.parentElement.style.background = `linear-gradient(135deg, ${sportColor}30, var(--bg-elevated))`;
                    }}
                  />
                </div>
                <div className="result-info">
                  <div className="result-badges">
                    {v.sports.map(s => {
                      const sp = sports.find(sp => sp.id === s);
                      return <span key={s} className="badge badge-success">{sp?.name || s}</span>;
                    })}
                  </div>
                  <h3>{v.name}</h3>
                  <p className="result-address"><MapPin size={14} /> {v.address}</p>
                  <div className="result-facilities">
                    {v.facilities.slice(0, 4).map(f => <span key={f} className="facility-tag">{f}</span>)}
                    {v.facilities.length > 4 && <span className="facility-tag">+{v.facilities.length - 4}</span>}
                  </div>
                  <div className="result-bottom">
                    <div className="result-rating">
                      <Star size={16} fill="#eab308" className="star" />
                      <span className="rating-val">{v.rating}</span>
                      <span className="rating-count">({v.reviewCount} review)</span>
                    </div>
                    <div className="result-price-badge">
                      {v.priceDisplay}
                    </div>
                    {v.openHour && (
                      <div className="result-hours">
                        <Clock size={14} /> {v.openHour} - {v.closeHour}
                      </div>
                    )}
                  </div>
                  <div className="result-courts-preview">
                    {v.courts.slice(0, 3).map(c => (
                      <span key={c.id} className="court-chip">
                        {c.name} — Rp{c.price.toLocaleString('id-ID')}/{c.unit}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon"><IconSearchEmpty size={48} /></span>
            <h3>Tidak Ada Hasil</h3>
            <p>Coba ubah filter pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}
