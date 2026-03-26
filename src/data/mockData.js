// Data contoh untuk website The Field Club

export const sports = [
  { id: 'padel', name: 'Padel', icon: '🎾', color: '#00C853', priceRange: 'Rp100.000 – Rp150.000', priceMin: 100000, priceMax: 150000, unit: 'per jam', description: 'Olahraga raket paling populer saat ini' },
  { id: 'tenis', name: 'Tenis', icon: '🎾', color: '#3b82f6', priceRange: 'Rp40.000 – Rp60.000', priceMin: 40000, priceMax: 60000, unit: 'per jam', description: 'Klasik dan elegan di setiap permainan' },
  { id: 'badminton', name: 'Badminton', icon: '🏸', color: '#8b5cf6', priceRange: 'Rp20.000 – Rp35.000', priceMin: 20000, priceMax: 35000, unit: 'per jam', description: 'Favorit sepanjang masa untuk semua usia' },
  { id: 'futsal', name: 'Futsal', icon: '⚽', color: '#f97316', priceRange: 'Rp50.000 – Rp70.000', priceMin: 50000, priceMax: 70000, unit: 'per jam', description: 'Kompetitif dan seru bersama tim' },
  { id: 'basket', name: 'Basket', icon: '🏀', color: '#ef4444', priceRange: 'Rp50.000 – Rp70.000', priceMin: 50000, priceMax: 70000, unit: 'per jam', description: 'Slam dunk impianmu di sini' },
  { id: 'mini-soccer', name: 'Mini Soccer', icon: '⚽', color: '#eab308', priceRange: 'Rp150.000 – Rp250.000', priceMin: 150000, priceMax: 250000, unit: 'per sesi', description: 'Lapangan luas untuk pertandingan seru' },
];

export const locations = [
  'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Pusat',
  'Tangerang', 'Bekasi', 'Depok', 'Bogor', 'Bandung'
];

export const venues = [
  {
    id: 1,
    name: 'GreenField Sports Center',
    location: 'Jakarta Selatan',
    address: 'Jl. Kemang Raya No. 45, Kemang',
    sports: ['badminton', 'futsal', 'basket'],
    rating: 4.8,
    reviewCount: 124,
    image: null,
    courts: [
      { id: 'c1', name: 'Court A', sport: 'badminton', price: 25000 },
      { id: 'c2', name: 'Court B', sport: 'badminton', price: 30000 },
      { id: 'c3', name: 'Lapangan 1', sport: 'futsal', price: 60000 },
      { id: 'c4', name: 'Ring 1', sport: 'basket', price: 55000 },
    ],
    facilities: ['Parkir Luas', 'Mushola', 'Kantin', 'Ruang Ganti', 'Wifi'],
    openHour: '06:00',
    closeHour: '23:00',
  },
  {
    id: 2,
    name: 'PadelZone Jakarta',
    location: 'Jakarta Utara',
    address: 'Jl. Pluit Karang Timur No.12',
    sports: ['padel', 'tenis'],
    rating: 4.9,
    reviewCount: 89,
    image: null,
    courts: [
      { id: 'c5', name: 'Padel Court 1', sport: 'padel', price: 120000 },
      { id: 'c6', name: 'Padel Court 2', sport: 'padel', price: 130000 },
      { id: 'c7', name: 'Tenis Court 1', sport: 'tenis', price: 50000 },
    ],
    facilities: ['Parkir', 'Locker', 'Pro Shop', 'Cafe', 'Wifi'],
    openHour: '07:00',
    closeHour: '22:00',
  },
  {
    id: 3,
    name: 'Arena Victory',
    location: 'Tangerang',
    address: 'Jl. BSD Raya No.88, BSD City',
    sports: ['futsal', 'mini-soccer', 'basket'],
    rating: 4.6,
    reviewCount: 201,
    image: null,
    courts: [
      { id: 'c8', name: 'Futsal A', sport: 'futsal', price: 55000 },
      { id: 'c9', name: 'Futsal B', sport: 'futsal', price: 65000 },
      { id: 'c10', name: 'Mini Soccer', sport: 'mini-soccer', price: 200000 },
      { id: 'c11', name: 'Basketball Court', sport: 'basket', price: 60000 },
    ],
    facilities: ['Parkir Luas', 'Tribun Penonton', 'Mushola', 'Kantin', 'Ruang Ganti'],
    openHour: '06:00',
    closeHour: '24:00',
  },
  {
    id: 4,
    name: 'Smash Arena',
    location: 'Bekasi',
    address: 'Jl. Ahmad Yani No.15, Bekasi Selatan',
    sports: ['badminton', 'tenis'],
    rating: 4.5,
    reviewCount: 156,
    image: null,
    courts: [
      { id: 'c12', name: 'Court 1', sport: 'badminton', price: 20000 },
      { id: 'c13', name: 'Court 2', sport: 'badminton', price: 22000 },
      { id: 'c14', name: 'Court 3', sport: 'badminton', price: 25000 },
      { id: 'c15', name: 'Tenis Outdoor', sport: 'tenis', price: 45000 },
    ],
    facilities: ['Parkir', 'Mushola', 'Kantin', 'Ruang Ganti'],
    openHour: '06:00',
    closeHour: '22:00',
  },
  {
    id: 5,
    name: 'Sport Hub Depok',
    location: 'Depok',
    address: 'Jl. Margonda Raya No.200',
    sports: ['badminton', 'futsal', 'basket', 'tenis'],
    rating: 4.7,
    reviewCount: 312,
    image: null,
    courts: [
      { id: 'c16', name: 'Badminton 1', sport: 'badminton', price: 22000 },
      { id: 'c17', name: 'Badminton 2', sport: 'badminton', price: 28000 },
      { id: 'c18', name: 'Futsal Indoor', sport: 'futsal', price: 65000 },
      { id: 'c19', name: 'Basket Indoor', sport: 'basket', price: 60000 },
      { id: 'c20', name: 'Tenis Indoor', sport: 'tenis', price: 55000 },
    ],
    facilities: ['Parkir Luas', 'AC', 'Tribun', 'Kantin', 'Wifi', 'Locker'],
    openHour: '06:00',
    closeHour: '23:00',
  },
  {
    id: 6,
    name: 'Kickoff Stadium',
    location: 'Bandung',
    address: 'Jl. Setiabudi No.55, Bandung',
    sports: ['futsal', 'mini-soccer'],
    rating: 4.4,
    reviewCount: 98,
    image: null,
    courts: [
      { id: 'c21', name: 'Mini Soccer A', sport: 'mini-soccer', price: 180000 },
      { id: 'c22', name: 'Mini Soccer B', sport: 'mini-soccer', price: 220000 },
      { id: 'c23', name: 'Futsal Indoor', sport: 'futsal', price: 50000 },
    ],
    facilities: ['Parkir', 'Tribun', 'Mushola', 'Cafe', 'Ruang Ganti'],
    openHour: '07:00',
    closeHour: '23:00',
  },
];

// Generate jadwal ketersediaan lapangan
export function generateSchedule(courtId, date) {
  const hours = [];
  const seed = courtId.charCodeAt(1) + new Date(date).getDate();
  for (let h = 6; h <= 22; h++) {
    const isBooked = ((seed * (h + 1) * 7) % 10) < 3;
    hours.push({
      hour: `${String(h).padStart(2, '0')}:00`,
      available: !isBooked,
      price: null, // akan di-set dari data court
    });
  }
  return hours;
}

export const addOnServices = [
  { id: 'photo', name: 'Fotografi Olahraga', description: 'Fotografer profesional akan mendokumentasikan permainan Anda', price: 150000, icon: '📸' },
  { id: 'video', name: 'Dokumentasi Video', description: 'Rekaman video HD dari pertandingan Anda', price: 250000, icon: '🎥' },
  { id: 'event', name: 'Dokumentasi Event', description: 'Paket lengkap untuk event komunitas', price: 500000, icon: '🎬' },
  { id: 'drinks', name: 'Paket Minuman', description: '10 botol air mineral + 5 minuman isotonik', price: 50000, icon: '🥤' },
  { id: 'jersey', name: 'Sewa Jersey Tim', description: '2 set jersey (masing-masing 7 pcs)', price: 75000, icon: '👕' },
];

export const paymentMethods = [
  { id: 'bca', name: 'Transfer BCA', type: 'bank', icon: '🏦' },
  { id: 'bni', name: 'Transfer BNI', type: 'bank', icon: '🏦' },
  { id: 'mandiri', name: 'Transfer Mandiri', type: 'bank', icon: '🏦' },
  { id: 'qris', name: 'QRIS', type: 'qris', icon: '📱' },
  { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: '💚' },
  { id: 'ovo', name: 'OVO', type: 'ewallet', icon: '💜' },
  { id: 'dana', name: 'DANA', type: 'ewallet', icon: '💙' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', icon: '🧡' },
  { id: 'va-bca', name: 'VA BCA', type: 'va', icon: '🔢' },
  { id: 'va-bni', name: 'VA BNI', type: 'va', icon: '🔢' },
];

export const bookingHistory = [
  { id: 'BK001', venue: 'GreenField Sports Center', court: 'Court A', sport: 'badminton', date: '2026-03-20', time: '10:00 - 11:00', price: 25000, status: 'completed', paymentMethod: 'GoPay' },
  { id: 'BK002', venue: 'PadelZone Jakarta', court: 'Padel Court 1', sport: 'padel', date: '2026-03-22', time: '14:00 - 15:00', price: 120000, status: 'completed', paymentMethod: 'QRIS' },
  { id: 'BK003', venue: 'Arena Victory', court: 'Futsal A', sport: 'futsal', date: '2026-03-28', time: '19:00 - 20:00', price: 55000, status: 'upcoming', paymentMethod: 'Transfer BCA' },
  { id: 'BK004', venue: 'Sport Hub Depok', court: 'Basket Indoor', sport: 'basket', date: '2026-03-30', time: '16:00 - 17:00', price: 60000, status: 'upcoming', paymentMethod: 'OVO' },
  { id: 'BK005', venue: 'Smash Arena', court: 'Court 1', sport: 'badminton', date: '2026-03-15', time: '08:00 - 09:00', price: 20000, status: 'cancelled', paymentMethod: 'DANA' },
];

export const reviews = [
  { id: 1, user: 'Ahmad Rizky', avatar: '👨', venue: 'GreenField Sports Center', rating: 5, comment: 'Lapangan sangat bersih dan terawat. Staf ramah. Pasti balik lagi!', date: '2026-03-18' },
  { id: 2, user: 'Sari Putri', avatar: '👩', venue: 'PadelZone Jakarta', rating: 5, comment: 'Fasilitas padel terbaik di Jakarta! Kualitas lapangan premium.', date: '2026-03-15' },
  { id: 3, user: 'Budi Santoso', avatar: '👨', venue: 'Arena Victory', rating: 4, comment: 'Lapangan futsal bagus, tapi parkir agak sempit di jam ramai.', date: '2026-03-12' },
  { id: 4, user: 'Dewi Lestari', avatar: '👩', venue: 'Sport Hub Depok', rating: 5, comment: 'Booking online sangat mudah. Harga terjangkau untuk kualitas segini.', date: '2026-03-10' },
  { id: 5, user: 'Reza Firmansyah', avatar: '👨', venue: 'Smash Arena', rating: 4, comment: 'Badminton court nya bagus. AC dingin. Recommended!', date: '2026-03-08' },
];

export const events = [
  { id: 1, title: 'Turnamen Badminton Antar Komunitas', sport: 'badminton', date: '2026-04-05', venue: 'GreenField Sports Center', participants: 32, maxParticipants: 64, status: 'open', description: 'Turnamen badminton ganda campuran untuk semua level.' },
  { id: 2, title: 'Futsal League Season 3', sport: 'futsal', date: '2026-04-12', venue: 'Arena Victory', participants: 8, maxParticipants: 16, status: 'open', description: 'Liga futsal mingguan. Daftarkan tim kamu sekarang!' },
  { id: 3, title: 'Padel Open Championship', sport: 'padel', date: '2026-04-20', venue: 'PadelZone Jakarta', participants: 24, maxParticipants: 24, status: 'full', description: 'Kejuaraan padel terbuka pertama di Jakarta.' },
  { id: 4, title: 'Basketball 3on3 Street Cup', sport: 'basket', date: '2026-04-15', venue: 'Sport Hub Depok', participants: 12, maxParticipants: 32, status: 'open', description: 'Basket 3on3 jalanan. Tunjukkan skill terbaikmu!' },
];

export const notifications = [
  { id: 1, type: 'booking', title: 'Booking Dikonfirmasi', message: 'Booking Futsal di Arena Victory pada 28 Mar 2026 telah dikonfirmasi.', time: '2 jam lalu', read: false },
  { id: 2, type: 'reminder', title: 'Pengingat Jadwal', message: 'Kamu bermain Basket di Sport Hub Depok besok jam 16:00.', time: '5 jam lalu', read: false },
  { id: 3, type: 'payment', title: 'Pembayaran Berhasil', message: 'Pembayaran Rp60.000 via OVO telah berhasil.', time: '1 hari lalu', read: true },
  { id: 4, type: 'event', title: 'Event Baru!', message: 'Basketball 3on3 Street Cup sudah dibuka. Daftar sekarang!', time: '2 hari lalu', read: true },
  { id: 5, type: 'promo', title: 'Promo Spesial', message: 'Diskon 20% untuk semua booking badminton di hari Senin-Rabu!', time: '3 hari lalu', read: true },
];

// Data dashboard pemilik lapangan
export const ownerStats = {
  totalBookings: 342,
  monthlyRevenue: 18500000,
  activeCourts: 4,
  avgRating: 4.7,
  recentBookings: [
    { id: 'OB001', customer: 'Ahmad Rizky', court: 'Court A', date: '2026-03-26', time: '10:00', status: 'confirmed', amount: 25000 },
    { id: 'OB002', customer: 'Sari Putri', court: 'Court B', date: '2026-03-26', time: '14:00', status: 'confirmed', amount: 30000 },
    { id: 'OB003', customer: 'Budi Santoso', court: 'Lapangan 1', date: '2026-03-26', time: '19:00', status: 'pending', amount: 60000 },
    { id: 'OB004', customer: 'Dewi Lestari', court: 'Ring 1', date: '2026-03-27', time: '16:00', status: 'confirmed', amount: 55000 },
  ],
  monthlyData: [
    { month: 'Jan', revenue: 12000000, bookings: 180 },
    { month: 'Feb', revenue: 14500000, bookings: 220 },
    { month: 'Mar', revenue: 18500000, bookings: 342 },
  ],
};

// Data dashboard admin
export const adminStats = {
  totalUsers: 2450,
  totalVenues: 6,
  totalTransactions: 1842,
  totalRevenue: 125000000,
  recentUsers: [
    { id: 'U001', name: 'Ahmad Rizky', email: 'ahmad@email.com', role: 'user', joinDate: '2026-01-15', bookings: 12 },
    { id: 'U002', name: 'Sari Putri', email: 'sari@email.com', role: 'user', joinDate: '2026-02-03', bookings: 8 },
    { id: 'U003', name: 'Budi Santoso', email: 'budi@email.com', role: 'owner', joinDate: '2026-01-20', bookings: 0 },
    { id: 'U004', name: 'Dewi Lestari', email: 'dewi@email.com', role: 'user', joinDate: '2026-03-01', bookings: 5 },
    { id: 'U005', name: 'Reza Firmansyah', email: 'reza@email.com', role: 'user', joinDate: '2026-02-28', bookings: 15 },
  ],
};
