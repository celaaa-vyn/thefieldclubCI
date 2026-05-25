// Data contoh untuk website The Field Club

export const sports = [
  { id: 'padel', name: 'Padel', icon: 'padel', color: '#00C853', priceRange: 'Rp150.000 – Rp190.000', priceMin: 150000, priceMax: 190000, unit: 'per sesi', description: 'Olahraga raket paling populer saat ini' },
  { id: 'tenis', name: 'Tenis', icon: 'tenis', color: '#3b82f6', priceRange: 'Rp50.000 – Rp75.000', priceMin: 50000, priceMax: 75000, unit: 'per jam', description: 'Klasik dan elegan di setiap permainan' },
  { id: 'badminton', name: 'Badminton', icon: 'badminton', color: '#8b5cf6', priceRange: 'Rp35.000 – Rp60.000', priceMin: 35000, priceMax: 60000, unit: 'per jam', description: 'Favorit sepanjang masa untuk semua usia' },
  { id: 'futsal', name: 'Futsal', icon: 'futsal', color: '#f97316', priceRange: 'Rp65.000 – Rp130.000', priceMin: 65000, priceMax: 130000, unit: 'per jam', description: 'Kompetitif dan seru bersama tim' },
  { id: 'basket', name: 'Basket', icon: 'basket', color: '#ef4444', priceRange: 'Rp100.000 – Rp135.000', priceMin: 100000, priceMax: 135000, unit: 'per jam', description: 'Slam dunk impianmu di sini' },
  { id: 'mini-soccer', name: 'Mini Soccer', icon: 'mini-soccer', color: '#eab308', priceRange: 'Rp300.000 – Rp750.000', priceMin: 300000, priceMax: 750000, unit: 'per jam', description: 'Lapangan luas untuk pertandingan seru' },
];

export const locations = [
  'Jakarta Selatan', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Pusat',
  'Tangerang', 'Bekasi', 'Depok', 'Bogor', 'Bandung'
];

export const venues = [
  // ── FUTSAL ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Futsal Corner Bekasi',
    location: 'Bekasi',
    address: 'Jl. Sultan Agung No.28, RT.002/RW.001, Medan Satria, Kota Bekasi 17132',
    sports: ['futsal'],
    rating: 4.5,
    reviewCount: 47,
    image: '/assets/Futsal/Futsal Corner Bekasi.webp',
    priceDisplay: 'Rp65.000/jam',
    courts: [
      { id: 'fc-c1', name: 'Court 1', sport: 'futsal', price: 65000, unit: 'jam' },
      { id: 'fc-c2', name: 'Court 2', sport: 'futsal', price: 65000, unit: 'jam' },
      { id: 'fc-c3', name: 'Court 3', sport: 'futsal', price: 70000, unit: 'jam' },
    ],
    facilities: ['Parkir Luas', 'Kantin', 'Toko Olahraga', 'Dekat Jalan Raya'],
    openHour: '08:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Nining Lestari', rating: 4, comment: 'Lapangan futsal nya oke luas ada tempat jajan nya juga, cuma jalurnya macet karena letaknya di dekat lampu merah.' },
      { id: 2, user: 'Kipas Rusak', rating: 5, comment: 'Lapangannya bagus, parkir luas, pinggir jalan raya, ada kantin dan toko sepatu olahraga, sewanya cocok untuk kantong pelajar.' },
    ],
  },
  {
    id: 2,
    name: 'Estadio Futsal',
    location: 'Bekasi',
    address: 'Jl. Raya Perjuangan No.66, RT.003/RW.008, Marga Mulya, Kec. Bekasi Utara 17142',
    sports: ['futsal'],
    rating: 4.5,
    reviewCount: 83,
    image: '/assets/Futsal/Estadio Futsal.webp',
    priceDisplay: 'Rp100.000/sesi',
    courts: [
      { id: 'ef-c1', name: 'Vinyl Court 1', sport: 'futsal', price: 100000, unit: 'sesi' },
      { id: 'ef-c2', name: 'Vinyl Court 2', sport: 'futsal', price: 100000, unit: 'sesi' },
      { id: 'ef-c3', name: 'Court 3',       sport: 'futsal', price: 110000, unit: 'sesi' },
    ],
    facilities: ['Parkir Luas', 'Tribun Atas', 'Vinyl Court', 'Penerangan Oke'],
    openHour: '07:00',
    closeHour: '23:00',
    reviews: [
      { id: 1, user: 'Lanesra London', rating: 5, comment: 'Tempatnya enak, ada 2 lapangan vinyl, terdapat 2 lantai di mana kita bisa nonton dari atas. Parkiran luas.' },
      { id: 2, user: 'Aldi Faizaldi',  rating: 4, comment: 'Fasilitas lengkap bersih dan nyaman, penerangan oke. Kekurangannya lapangannya sudah ga rata.' },
    ],
  },
  {
    id: 3,
    name: 'Futsal Town',
    location: 'Bekasi',
    address: 'Gang Hj Didi, Jl. Kemandoran, RT.003/RW.022, Pekayon Jaya, Kec. Bekasi Selatan 17148',
    sports: ['futsal'],
    rating: 4.4,
    reviewCount: 61,
    image: '/assets/Futsal/Futsal Town.webp',
    priceDisplay: 'Rp120.000/jam',
    courts: [
      { id: 'ft-c1', name: 'Court 1', sport: 'futsal', price: 120000, unit: 'jam' },
      { id: 'ft-c2', name: 'Court 2', sport: 'futsal', price: 120000, unit: 'jam' },
      { id: 'ft-c3', name: 'Court 3', sport: 'futsal', price: 130000, unit: 'jam' },
    ],
    facilities: ['Parkir Luas', 'Kantin', 'Jajanan Terjangkau', 'Aman'],
    openHour: '08:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Selvia Angra Yeny', rating: 5, comment: 'Lapangannya nyaman, tempat parkir luas dan aman, ada kantin dengan jajanan lumayan terjangkau.' },
      { id: 2, user: 'Irfan Djindang',    rating: 4, comment: 'Tempatnya sudah lumayan bagus cuman fasilitas toilet harus diperbaiki lagi.' },
    ],
  },

  // ── PADEL ────────────────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'GOPLAY Padel Bekasi',
    location: 'Bekasi',
    address: 'Jl. KH. Agus Salim No.18, RT.005/RW.008, Bekasi Jaya, Kec. Bekasi Timur 17510',
    sports: ['padel'],
    rating: 4.9,
    reviewCount: 128,
    image: '/assets/Padel/GOPLAY PADEL BEKASI.webp',
    priceDisplay: 'Rp150.000/sesi',
    courts: [
      { id: 'gp-c1', name: 'Panoramic Court 1', sport: 'padel', price: 150000, unit: 'sesi' },
      { id: 'gp-c2', name: 'Panoramic Court 2', sport: 'padel', price: 150000, unit: 'sesi' },
      { id: 'gp-c3', name: 'Court 3',           sport: 'padel', price: 160000, unit: 'sesi' },
    ],
    facilities: ['Full Panoramic Court', 'Tempat Duduk Luas', 'Cozy', 'Parkir'],
    openHour: '07:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Nice place to play padel, lapangan sudah full panoramic, tempat duduknya juga banyak dan luas banget. Ga expect di Bekasi ada tempat padel cozy begini.' },
      { id: 2, user: 'Reviewer 2', rating: 2, comment: 'Bad management. Cuma 2 court tapi sistem pengaturan lapangannya jelek, karyawannya ga sopan.' },
    ],
  },
  {
    id: 5,
    name: 'Kinetic Padel Arena',
    location: 'Bekasi',
    address: 'HI Avenue Bekasi, Jl. Harapan Indah Boulevard No.09 Lantai 1, Medan Satria 17132',
    sports: ['padel'],
    rating: 4.9,
    reviewCount: 214,
    image: '/assets/Padel/Kinetic Padel Arena.webp',
    priceDisplay: 'Rp180.000/sesi',
    courts: [
      { id: 'kp-c1', name: 'Court 1', sport: 'padel', price: 180000, unit: 'sesi' },
      { id: 'kp-c2', name: 'Court 2', sport: 'padel', price: 180000, unit: 'sesi' },
      { id: 'kp-c3', name: 'Court 3', sport: 'padel', price: 190000, unit: 'sesi' },
    ],
    facilities: ['8 Court', 'Aesthetic Interior', 'Toilet Comfy', 'Pencahayaan Bagus'],
    openHour: '07:00',
    closeHour: '23:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Padel arena-nya surprisingly nice. Clean, spacious, good lighting, court-nya proper. Beneran aesthetic tempatnya, especially toiletnya yang comfy banget.' },
      { id: 2, user: 'Reviewer 2', rating: 3, comment: '8 Court, tapi mau nge-hosting ga dipinjemin mic yang proper. Sayang fasilitasnya kurang.' },
    ],
  },
  {
    id: 6,
    name: 'PadMan Padelground',
    location: 'Bekasi',
    address: 'Sentra Niaga 5 SN5.3 & 5, RT.10/RW.8, Pusaka Rakyat, Kec. Tarumajaya, Kab. Bekasi 17214',
    sports: ['padel'],
    rating: 4.9,
    reviewCount: 95,
    image: '/assets/Padel/PadMan Padelground.webp',
    priceDisplay: 'Rp180.000/sesi',
    courts: [
      { id: 'pm-c1', name: 'Court A', sport: 'padel', price: 180000, unit: 'sesi' },
      { id: 'pm-c2', name: 'Court B', sport: 'padel', price: 180000, unit: 'sesi' },
      { id: 'pm-c3', name: 'Court C', sport: 'padel', price: 190000, unit: 'sesi' },
    ],
    facilities: ['Parkir', 'Tempat Tunggu Nyaman', 'Akses Court Oke', 'Cafe (Coming Soon)'],
    openHour: '08:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Lapangannya bagus, tempat tunggu nyaman, ada parkir, akses ke court juga oke. Dan akan ada cafe juga nanti.' },
      { id: 2, user: 'Reviewer 2', rating: 4, comment: 'Court oke, sayang pencahayaannya gelap, terutama di court daerah fence.' },
    ],
  },

  // ── MINI SOCCER ──────────────────────────────────────────────────────────────
  {
    id: 7,
    name: 'X Bro Minisoccer',
    location: 'Bekasi',
    address: 'Jl. Kp. Kepu No.72A, RT.013/RW.006, Kaliabang Tengah, Kec. Bekasi Utara 17125',
    sports: ['mini-soccer'],
    rating: 4.5,
    reviewCount: 39,
    image: '/assets/Mini Soccer/X Bro Minisoccer.webp',
    priceDisplay: 'Rp300.000/jam',
    courts: [
      { id: 'xb-c1', name: 'Field 1', sport: 'mini-soccer', price: 300000, unit: 'jam' },
      { id: 'xb-c2', name: 'Field 2', sport: 'mini-soccer', price: 350000, unit: 'jam' },
      { id: 'xb-c3', name: 'Field 3', sport: 'mini-soccer', price: 400000, unit: 'jam' },
    ],
    facilities: ['Rumput Sintetis', 'Fasilitas Lengkap', 'Parkir'],
    openHour: '07:00',
    closeHour: '23:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Lapangan mini soccer yang nyaman dengan fasilitas lengkap. Permukaan sintetisnya bagus, cocok untuk bermain intens.' },
      { id: 2, user: 'Reviewer 2', rating: 2, comment: 'Jaring kurang tinggi, bola keluar didenda.' },
    ],
  },
  {
    id: 8,
    name: 'Ramuna Mini Soccer Bekasi',
    location: 'Bekasi',
    address: 'Jl. Raya Siliwangi No.28, RT.002/RW.003, Sepanjang Jaya, Kec. Rawalumbu 17114',
    sports: ['mini-soccer'],
    rating: 4.7,
    reviewCount: 72,
    image: '/assets/Mini Soccer/Ramuna Mini Soccer Bekasi.webp',
    priceDisplay: 'Rp700.000/sesi',
    courts: [
      { id: 'rm-c1', name: 'Field A', sport: 'mini-soccer', price: 700000, unit: 'sesi' },
      { id: 'rm-c2', name: 'Field B', sport: 'mini-soccer', price: 700000, unit: 'sesi' },
      { id: 'rm-c3', name: 'Field C', sport: 'mini-soccer', price: 750000, unit: 'sesi' },
    ],
    facilities: ['Mushola', 'Kantin', 'Kebab', 'Parkir', 'Family Friendly'],
    openHour: '07:00',
    closeHour: '23:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Lapangannya sangat bagus. Fasilitasnya lengkap, ada mushola juga. Cemilan dan kebab tersedia, cocok bawa keluarga.' },
      { id: 2, user: 'Reviewer 2', rating: 3, comment: 'Lumayan mahal harganya.' },
    ],
  },
  {
    id: 9,
    name: 'Mustika Mini Soccer',
    location: 'Bekasi',
    address: 'Jl. Telkom No.5, RT.001/RW.005, Padurenan, Kec. Mustika Jaya, Kota Bekasi 17166',
    sports: ['mini-soccer'],
    rating: 4.6,
    reviewCount: 53,
    image: '/assets/Mini Soccer/Mustika mini soccer.webp',
    priceDisplay: 'Rp450.000/jam',
    courts: [
      { id: 'ms-c1', name: 'Field 1', sport: 'mini-soccer', price: 450000, unit: 'jam' },
      { id: 'ms-c2', name: 'Field 2', sport: 'mini-soccer', price: 450000, unit: 'jam' },
      { id: 'ms-c3', name: 'Field 3', sport: 'mini-soccer', price: 500000, unit: 'jam' },
    ],
    facilities: ['Rumput Tebal', 'Cocok 7v7', 'Parkir'],
    openHour: '07:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Reviewer 1', rating: 5, comment: 'Lapangan bagus, rumputnya masih tebal dan rata. Bagus untuk bermain 7 vs 7.' },
      { id: 2, user: 'Reviewer 2', rating: 1, comment: 'Lapangan ga jelas, rumput pada copot, banyak lubang, parkir digetok 3rb.' },
    ],
  },

  // ── BASKET ───────────────────────────────────────────────────────────────────
  {
    id: 10,
    name: 'Lapangan Basket Boulevard Hijau',
    location: 'Bekasi',
    address: 'Jl. Palem Botol I, RT.002/RW.024, Pejuang, Kec. Medan Satria, Kota Bekasi 17131',
    sports: ['basket'],
    rating: 3.0,
    reviewCount: 18,
    image: '/assets/Basket/Lapangan Basket Boulevard Hijau.webp',
    priceDisplay: 'Rp100.000/jam',
    courts: [
      { id: 'bb-c1', name: 'Court 1', sport: 'basket', price: 100000, unit: 'jam' },
      { id: 'bb-c2', name: 'Court 2', sport: 'basket', price: 100000, unit: 'jam' },
      { id: 'bb-c3', name: 'Court 3', sport: 'basket', price: 110000, unit: 'jam' },
    ],
    facilities: ['Lahan Parkir Luas', 'Lapangan Luas'],
    openHour: '07:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Geraldso', rating: 5, comment: 'Main di lapangan ini sangat seru, mantap poll. Tempatnya luas dan banyak lahan parkir.' },
      { id: 2, user: 'King Jo',  rating: 1, comment: 'Satpam kurang ramah dan sopan santun.' },
    ],
  },
  {
    id: 11,
    name: 'GOR Sekda Saefullah',
    location: 'Jakarta Utara',
    address: 'Jl. Sungai Kendal, RT.3/RW.8, Rorotan, Kec. Cilincing, Jakarta Utara 14140',
    sports: ['basket'],
    rating: 4.0,
    reviewCount: 34,
    image: '/assets/Basket/GOR Sekda Saefullah.webp',
    priceDisplay: 'Rp110.000/2 jam',
    courts: [
      { id: 'gs-c1', name: 'Indoor Court 1', sport: 'basket', price: 110000, unit: '2jam' },
      { id: 'gs-c2', name: 'Indoor Court 2', sport: 'basket', price: 110000, unit: '2jam' },
      { id: 'gs-c3', name: 'Court 3',        sport: 'basket', price: 120000, unit: '2jam' },
    ],
    facilities: ['Indoor', 'AC', 'Fasilitas Lengkap'],
    openHour: '07:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Malik Ibrahim',    rating: 5, comment: 'Fasilitasnya kece parah, adem, basketan enak parah disini.' },
      { id: 2, user: 'Arnov Kristianto', rating: 3, comment: 'Great indoor basketball court but lighting was really poor especially for night game. Please improve.' },
    ],
  },
  {
    id: 12,
    name: 'Bendella Basket',
    location: 'Bekasi',
    address: 'Jl. Raya Perjuangan No.26, RT.001/RW.002, Marga Mulya, Kec. Bekasi Utara 17124',
    sports: ['basket'],
    rating: 3.0,
    reviewCount: 26,
    image: '/assets/Basket/Bendella Basket.webp',
    priceDisplay: 'Rp125.000/jam',
    courts: [
      { id: 'bd-c1', name: 'Vinyl Court 1', sport: 'basket', price: 125000, unit: 'jam' },
      { id: 'bd-c2', name: 'Vinyl Court 2', sport: 'basket', price: 125000, unit: 'jam' },
      { id: 'bd-c3', name: 'Court 3',       sport: 'basket', price: 135000, unit: 'jam' },
    ],
    facilities: ['Vinyl Court', 'Indoor', 'Cafe', 'Mushola', 'Kamar Mandi', 'Parkir Luas'],
    openHour: '07:00',
    closeHour: '23:00',
    reviews: [
      { id: 1, user: 'Fahmi Imanuddin', rating: 1, comment: 'Makanannya seperti dipanaskan berulang kali sampai rasanya sudah tidak enak. Tolong dievaluasi lagi.' },
      { id: 2, user: 'Andra Alvian',    rating: 5, comment: 'Lapangannya mantap banget, vinyl empuk, penerangan cakep, indoor ada 2 lapangan. Ada cafe, mushola, kamar mandi, parkiran luas.' },
    ],
  },

  // ── TENIS ────────────────────────────────────────────────────────────────────
  {
    id: 13,
    name: 'Lapangan Tenis Boulevard Hijau',
    location: 'Bekasi',
    address: 'Jl. Palem Botol I, RT.002/RW.024, Pejuang, Kec. Medan Satria, Kota Bekasi 17131',
    sports: ['tenis'],
    rating: 3.0,
    reviewCount: 11,
    image: '/assets/Tennis/Lapangan Tenis Boulevard Hijau.webp',
    priceDisplay: 'Rp70.000/jam',
    courts: [
      { id: 'tb-c1', name: 'Court 1', sport: 'tenis', price: 70000, unit: 'jam' },
      { id: 'tb-c2', name: 'Court 2', sport: 'tenis', price: 70000, unit: 'jam' },
      { id: 'tb-c3', name: 'Court 3', sport: 'tenis', price: 75000, unit: 'jam' },
    ],
    facilities: ['Parkir', 'Harga Reasonable', 'Aman'],
    openHour: '06:00',
    closeHour: '21:00',
    reviews: [
      { id: 1, user: 'Arjun Lukman',  rating: 1, comment: 'Pelayanan buruk.' },
      { id: 2, user: 'Tonny Sugito',  rating: 5, comment: 'Spot olahraga yang nyaman, aman, harga reasonable, dan pelayanannya ramah. Saya rutin main tenis disini.' },
    ],
  },
  {
    id: 14,
    name: 'GHP Tennis Court',
    location: 'Bekasi',
    address: 'Jl. Komp. Griya Harapan Permai No.5, RT.004/RW.032, Pejuang, Kec. Medan Satria 17131',
    sports: ['tenis'],
    rating: 4.0,
    reviewCount: 29,
    image: '/assets/Tennis/GHP Tennis Court & Futsal GRIYA FUTSAL & TENNIS COURTS.webp',
    priceDisplay: 'Rp50.000/jam',
    courts: [
      { id: 'gh-c1', name: 'Court 1', sport: 'tenis', price: 50000, unit: 'jam' },
      { id: 'gh-c2', name: 'Court 2', sport: 'tenis', price: 50000, unit: 'jam' },
      { id: 'gh-c3', name: 'Court 3', sport: 'tenis', price: 55000, unit: 'jam' },
    ],
    facilities: ['Coach Tersedia', 'Lapangan Komplek', 'Parkir'],
    openHour: '06:00',
    closeHour: '21:00',
    reviews: [
      { id: 1, user: 'Daniella Novitaria', rating: 5, comment: 'Enak main disini. Ada coachnya juga. Lapangan milik komplek, mending datang langsung.' },
      { id: 2, user: 'Muhtadin Nafari',    rating: 3, comment: 'Lumayan.' },
    ],
  },
  {
    id: 15,
    name: 'Lapangan Tenis Flamboyan',
    location: 'Bekasi',
    address: 'Jl. Flamboyan Indah I No.1 Blok Lc, RT.010/RW.017, Pejuang, Kec. Medan Satria 17131',
    sports: ['tenis'],
    rating: 4.5,
    reviewCount: 44,
    image: '/assets/Tennis/Lapangan Tenis Flamboyan.webp',
    priceDisplay: 'Rp70.000/jam',
    courts: [
      { id: 'tf-c1', name: 'Court A', sport: 'tenis', price: 70000, unit: 'jam' },
      { id: 'tf-c2', name: 'Court B', sport: 'tenis', price: 70000, unit: 'jam' },
      { id: 'tf-c3', name: 'Court C', sport: 'tenis', price: 75000, unit: 'jam' },
    ],
    facilities: ['Coach Sparing', 'Sewa Raket', 'Jajanan Lengkap', 'Dekat Masjid', 'Parkir Luas'],
    openHour: '06:00',
    closeHour: '21:00',
    reviews: [
      { id: 1, user: 'Tanti Venisia',  rating: 5, comment: 'Lapangan memadai, sewanya murah meriah. Ada coach untuk sparing, bisa sewa raket, dan banyak jajanan.' },
      { id: 2, user: 'Sugiono Hutama', rating: 4, comment: 'Nyaman bersih, parkir luas, dekat masjid.' },
    ],
  },

  // ── BADMINTON ────────────────────────────────────────────────────────────────
  {
    id: 16,
    name: 'Dian Jaya Badminton Gor',
    location: 'Bekasi',
    address: 'Jl. Letnan Arsyad Raya No.2, RT.005/RW.012, Kayuringin Jaya, Kec. Bekasi Selatan 17144',
    sports: ['badminton'],
    rating: 4.6,
    reviewCount: 108,
    image: '/assets/Badminton/Dian Jaya Badminton Gor.webp',
    priceDisplay: 'Rp56.000/jam',
    courts: [
      { id: 'dj-c1', name: 'Court 1', sport: 'badminton', price: 56000, unit: 'jam' },
      { id: 'dj-c2', name: 'Court 2', sport: 'badminton', price: 56000, unit: 'jam' },
      { id: 'dj-c3', name: 'Court 3', sport: 'badminton', price: 60000, unit: 'jam' },
    ],
    facilities: ['Banyak Lapangan', 'Nyaman'],
    openHour: '06:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Mr Happy Lucky',    rating: 5, comment: 'Tempat olahraga yang asik, lapangannya cukup banyak. Cukup nyaman walaupun ventilasi terbatas.' },
      { id: 2, user: 'Rifky Syaripudin', rating: 3, comment: 'Lapangan banyak, cuma ada beberapa lapangan kondisi rusak.' },
    ],
  },
  {
    id: 17,
    name: 'Pertiwi Sport',
    location: 'Bekasi',
    address: 'Jl. Kali Baru Barat No.8, RT.011/RW.010, Kota Baru, Kec. Bekasi Barat 17133',
    sports: ['badminton'],
    rating: 4.5,
    reviewCount: 76,
    image: '/assets/Badminton/Pertiwi Sport.webp',
    priceDisplay: 'Rp45.000/jam',
    courts: [
      { id: 'ps-c1', name: 'Court 1', sport: 'badminton', price: 45000, unit: 'jam' },
      { id: 'ps-c2', name: 'Court 2', sport: 'badminton', price: 45000, unit: 'jam' },
      { id: 'ps-c3', name: 'Court 3', sport: 'badminton', price: 50000, unit: 'jam' },
    ],
    facilities: ['8 Lapangan', 'Buka Setiap Hari', 'GOR Luas'],
    openHour: '06:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Chandra Yuza', rating: 5, comment: 'Gornya bagus, luas, ada 8 lapangan. Buka setiap hari.' },
      { id: 2, user: 'Banani Arief', rating: 1, comment: 'Banyak bapak-bapak merokok padahal sudah ada larangan merokok.' },
    ],
  },
  {
    id: 18,
    name: 'GOR Ferry Jaya Badminton Hall',
    location: 'Bekasi',
    address: 'Jl. Gg. Rw. Blok Rawa No.26, RT.010/RW.001, Bojong Rawalumbu, Kec. Rawalumbu 17116',
    sports: ['badminton'],
    rating: 4.5,
    reviewCount: 57,
    image: '/assets/Badminton/GOR Ferry Jaya Badminton Hall.webp',
    priceDisplay: 'Rp35.000/jam',
    courts: [
      { id: 'fj-c1', name: 'Court 1', sport: 'badminton', price: 35000, unit: 'jam' },
      { id: 'fj-c2', name: 'Court 2', sport: 'badminton', price: 35000, unit: 'jam' },
      { id: 'fj-c3', name: 'Court 3', sport: 'badminton', price: 40000, unit: 'jam' },
    ],
    facilities: ['Musholla', 'Toilet', 'Wastafel', 'Kantin', 'Parkir Mobil & Motor'],
    openHour: '06:00',
    closeHour: '22:00',
    reviews: [
      { id: 1, user: 'Moch. Randy J', rating: 5, comment: 'Mudah ditemukan, ada 3 lapangan, musholla, toilet, wastafel, dan kantin. Pagi hari tidak lembab.' },
      { id: 2, user: 'Ayoe Kuya',    rating: 4, comment: 'Tempat badminton yang bersih dan luas, ada 3 tempat, parkiran bisa untuk mobil dan motor.' },
    ],
  },
];

// Generate jadwal ketersediaan lapangan
export function generateSchedule(courtId, date) {
  const hours = [];
  const seed = courtId.charCodeAt(courtId.length - 1) + new Date(date).getDate();
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
  // ── Universal (semua cabor) ─────────────────────────────────────────────────
  { id: 'photo',    sports: null, name: 'Fotografi Olahraga',   description: 'Fotografer profesional dokumentasi permainan Anda', price: 150000, icon: 'photo' },
  { id: 'video',    sports: null, name: 'Dokumentasi Video',    description: 'Rekaman video HD dari pertandingan Anda',            price: 250000, icon: 'video' },
  { id: 'drinks',   sports: null, name: 'Paket Minuman',        description: '10 botol air mineral + 5 minuman isotonik',         price: 50000,  icon: 'drinks' },

  // ── Futsal ──────────────────────────────────────────────────────────────────
  { id: 'jersey-futsal',  sports: ['futsal'],       name: 'Sewa Jersey Futsal',   description: '2 set jersey futsal (masing-masing 5 pcs)', price: 75000,  icon: 'jersey' },
  { id: 'bola-futsal',    sports: ['futsal'],       name: 'Sewa Bola Futsal',     description: 'Bola futsal standar SNI siap pakai',          price: 25000,  icon: 'jersey' },
  { id: 'rompi-futsal',   sports: ['futsal'],       name: 'Rompi Bibs',           description: '10 pcs rompi olahraga berwarna',              price: 20000,  icon: 'jersey' },
  { id: 'event-futsal',   sports: ['futsal'],       name: 'Paket Turnamen',       description: 'Wasit + papan skor + dokumentasi event',      price: 350000, icon: 'event' },

  // ── Mini Soccer ─────────────────────────────────────────────────────────────
  { id: 'jersey-soccer',  sports: ['mini-soccer'],  name: 'Sewa Jersey Tim',      description: '2 set jersey (masing-masing 7 pcs)',           price: 100000, icon: 'jersey' },
  { id: 'bola-soccer',    sports: ['mini-soccer'],  name: 'Sewa Bola Soccer',     description: 'Bola sepak standar FIFA Quality',              price: 30000,  icon: 'jersey' },
  { id: 'wasit-soccer',   sports: ['mini-soccer'],  name: 'Jasa Wasit',           description: 'Wasit bersertifikat untuk pertandingan resmi',  price: 150000, icon: 'event' },
  { id: 'event-soccer',   sports: ['mini-soccer'],  name: 'Paket Turnamen',       description: 'Wasit + papan skor + dokumentasi lengkap',     price: 450000, icon: 'event' },

  // ── Basket ──────────────────────────────────────────────────────────────────
  { id: 'jersey-basket',  sports: ['basket'],       name: 'Sewa Jersey Basket',   description: '2 set jersey basket (masing-masing 5 pcs)',    price: 80000,  icon: 'jersey' },
  { id: 'bola-basket',    sports: ['basket'],       name: 'Sewa Bola Basket',     description: 'Bola basket size 7 standar FIBA',              price: 25000,  icon: 'jersey' },
  { id: 'event-basket',   sports: ['basket'],       name: 'Paket 3on3 Event',     description: 'Wasit + scoresheet + dokumentasi event',       price: 300000, icon: 'event' },

  // ── Padel ───────────────────────────────────────────────────────────────────
  { id: 'raket-padel',    sports: ['padel'],        name: 'Sewa Raket Padel',     description: '2 raket padel + 3 bola padel siap main',       price: 50000,  icon: 'jersey' },
  { id: 'lesson-padel',   sports: ['padel'],        name: 'Sesi Coaching Padel',  description: '1 jam bersama coach padel bersertifikat',      price: 200000, icon: 'event' },
  { id: 'event-padel',    sports: ['padel'],        name: 'Paket Padel Event',    description: 'Wasit + skor digital + dokumentasi turnamen',   price: 400000, icon: 'event' },

  // ── Tenis ───────────────────────────────────────────────────────────────────
  { id: 'raket-tenis',    sports: ['tenis'],        name: 'Sewa Raket Tenis',     description: '2 raket tenis + 1 tabung bola (3 pcs)',        price: 40000,  icon: 'jersey' },
  { id: 'lesson-tenis',   sports: ['tenis'],        name: 'Sesi Coaching Tenis',  description: '1 jam bersama pelatih tenis berpengalaman',    price: 175000, icon: 'event' },
  { id: 'stringing',      sports: ['tenis'],        name: 'Jasa Stringing Raket', description: 'Restring raket dengan senar berkualitas',       price: 80000,  icon: 'jersey' },

  // ── Badminton ───────────────────────────────────────────────────────────────
  { id: 'raket-badminton', sports: ['badminton'],   name: 'Sewa Raket Badminton', description: '2 raket + 1 tube shuttlecock (6 pcs)',         price: 30000,  icon: 'jersey' },
  { id: 'kok-badminton',   sports: ['badminton'],   name: 'Paket Shuttlecock',    description: '1 tube shuttlecock premium (12 pcs)',           price: 45000,  icon: 'jersey' },
  { id: 'lesson-badminton',sports: ['badminton'],   name: 'Sesi Coaching',        description: '1 jam bersama pelatih badminton berpengalaman', price: 150000, icon: 'event' },
  { id: 'stringing-bad',   sports: ['badminton'],   name: 'Jasa Stringing Raket', description: 'Restring raket badminton dengan senar premium', price: 60000,  icon: 'jersey' },
];


export const paymentMethods = [
  { id: 'bca', name: 'Transfer BCA', type: 'bank', icon: 'bank' },
  { id: 'bni', name: 'Transfer BNI', type: 'bank', icon: 'bank' },
  { id: 'mandiri', name: 'Transfer Mandiri', type: 'bank', icon: 'bank' },
  { id: 'qris', name: 'QRIS', type: 'qris', icon: 'qris' },
  { id: 'gopay', name: 'GoPay', type: 'ewallet', icon: 'ewallet' },
  { id: 'ovo', name: 'OVO', type: 'ewallet', icon: 'ewallet' },
  { id: 'dana', name: 'DANA', type: 'ewallet', icon: 'ewallet' },
  { id: 'shopeepay', name: 'ShopeePay', type: 'ewallet', icon: 'ewallet' },
  { id: 'va-bca', name: 'VA BCA', type: 'va', icon: 'va' },
  { id: 'va-bni', name: 'VA BNI', type: 'va', icon: 'va' },
];

export const bookingHistory = [
  { id: 'BK001', venue: 'Dian Jaya Badminton Gor', court: 'Court 1', sport: 'badminton', date: '2026-03-20', time: '10:00 - 11:00', price: 56000, status: 'completed', paymentMethod: 'GoPay' },
  { id: 'BK002', venue: 'Kinetic Padel Arena', court: 'Court 1', sport: 'padel', date: '2026-03-22', time: '14:00 - 15:00', price: 180000, status: 'completed', paymentMethod: 'QRIS' },
  { id: 'BK003', venue: 'Futsal Corner Bekasi', court: 'Court 1', sport: 'futsal', date: '2026-03-28', time: '19:00 - 20:00', price: 65000, status: 'upcoming', paymentMethod: 'Transfer BCA' },
  { id: 'BK004', venue: 'Lapangan Basket Boulevard Hijau', court: 'Court 1', sport: 'basket', date: '2026-03-30', time: '16:00 - 17:00', price: 100000, status: 'upcoming', paymentMethod: 'OVO' },
  { id: 'BK005', venue: 'GOR Ferry Jaya Badminton Hall', court: 'Court 1', sport: 'badminton', date: '2026-03-15', time: '08:00 - 09:00', price: 35000, status: 'cancelled', paymentMethod: 'DANA' },
];

export const reviews = [
  { id: 1, user: 'Ahmad Rizky', avatar: 'male', venue: 'Kinetic Padel Arena', rating: 5, comment: 'Lapangan sangat bersih dan terawat. Staf ramah. Pasti balik lagi!', date: '2026-03-18' },
  { id: 2, user: 'Sari Putri', avatar: 'female', venue: 'GOPLAY Padel Bekasi', rating: 5, comment: 'Fasilitas padel terbaik di Bekasi! Kualitas lapangan premium.', date: '2026-03-15' },
  { id: 3, user: 'Budi Santoso', avatar: 'male', venue: 'Futsal Corner Bekasi', rating: 4, comment: 'Lapangan futsal bagus, tapi parkir agak sempit di jam ramai.', date: '2026-03-12' },
  { id: 4, user: 'Dewi Lestari', avatar: 'female', venue: 'Dian Jaya Badminton Gor', rating: 5, comment: 'Booking online sangat mudah. Harga terjangkau untuk kualitas segini.', date: '2026-03-10' },
  { id: 5, user: 'Reza Firmansyah', avatar: 'male', venue: 'GOR Ferry Jaya Badminton Hall', rating: 4, comment: 'Badminton court nya bagus. Bersih dan nyaman. Recommended!', date: '2026-03-08' },
];

export const events = [
  { id: 1, title: 'Turnamen Badminton Antar Komunitas', sport: 'badminton', date: '2026-04-05', venue: 'Dian Jaya Badminton Gor', participants: 32, maxParticipants: 64, status: 'open', description: 'Turnamen badminton ganda campuran untuk semua level.' },
  { id: 2, title: 'Futsal League Season 3', sport: 'futsal', date: '2026-04-12', venue: 'Estadio Futsal', participants: 8, maxParticipants: 16, status: 'open', description: 'Liga futsal mingguan. Daftarkan tim kamu sekarang!' },
  { id: 3, title: 'Padel Open Championship', sport: 'padel', date: '2026-04-20', venue: 'Kinetic Padel Arena', participants: 24, maxParticipants: 24, status: 'full', description: 'Kejuaraan padel terbuka pertama di Bekasi.' },
  { id: 4, title: 'Basketball 3on3 Street Cup', sport: 'basket', date: '2026-04-15', venue: 'Bendella Basket', participants: 12, maxParticipants: 32, status: 'open', description: 'Basket 3on3 jalanan. Tunjukkan skill terbaikmu!' },
];

export const notifications = [
  { id: 1, type: 'booking', title: 'Booking Dikonfirmasi', message: 'Booking Futsal di Futsal Corner Bekasi pada 28 Mar 2026 telah dikonfirmasi.', time: '2 jam lalu', read: false },
  { id: 2, type: 'reminder', title: 'Pengingat Jadwal', message: 'Kamu bermain Basket di Lapangan Basket Boulevard Hijau besok jam 16:00.', time: '5 jam lalu', read: false },
  { id: 3, type: 'payment', title: 'Pembayaran Berhasil', message: 'Pembayaran Rp100.000 via OVO telah berhasil.', time: '1 hari lalu', read: true },
  { id: 4, type: 'event', title: 'Event Baru!', message: 'Basketball 3on3 Street Cup sudah dibuka. Daftar sekarang!', time: '2 hari lalu', read: true },
  { id: 5, type: 'promo', title: 'Promo Spesial', message: 'Diskon 20% untuk semua booking badminton di hari Senin-Rabu!', time: '3 hari lalu', read: true },
];

// Data dashboard pemilik lapangan
export const ownerStats = {
  totalBookings: 342,
  monthlyRevenue: 18500000,
  activeCourts: 3,
  avgRating: 4.7,
  recentBookings: [
    { id: 'OB001', customer: 'Ahmad Rizky', court: 'Court 1', date: '2026-03-26', time: '10:00', status: 'confirmed', amount: 56000 },
    { id: 'OB002', customer: 'Sari Putri', court: 'Court 2', date: '2026-03-26', time: '14:00', status: 'confirmed', amount: 56000 },
    { id: 'OB003', customer: 'Budi Santoso', court: 'Court 1', date: '2026-03-26', time: '19:00', status: 'pending', amount: 65000 },
    { id: 'OB004', customer: 'Dewi Lestari', court: 'Court 3', date: '2026-03-27', time: '16:00', status: 'confirmed', amount: 60000 },
  ],
  monthlyData: [
    { month: 'Jan', revenue: 12000000, bookings: 180 },
    { month: 'Feb', revenue: 14500000, bookings: 220 },
    { month: 'Mar', revenue: 18500000, bookings: 342 },
  ],
};

// Data dashboard admin
export const adminStats = {
  totalUsers: 150,
  totalVenues: 18,
  totalTransactions: 325,
  totalRevenue: 125000000,
  recentUsers: [
    { id: 'U001', name: 'Ahmad Rizky', email: 'ahmad@email.com', role: 'user', joinDate: '2026-01-15', bookings: 12 },
    { id: 'U002', name: 'Sari Putri', email: 'sari@email.com', role: 'user', joinDate: '2026-02-03', bookings: 8 },
    { id: 'U003', name: 'Budi Santoso', email: 'budi@email.com', role: 'owner', joinDate: '2026-01-20', bookings: 0 },
    { id: 'U004', name: 'Dewi Lestari', email: 'dewi@email.com', role: 'user', joinDate: '2026-03-01', bookings: 5 },
    { id: 'U005', name: 'Reza Firmansyah', email: 'reza@email.com', role: 'user', joinDate: '2026-02-28', bookings: 15 },
  ],
};
