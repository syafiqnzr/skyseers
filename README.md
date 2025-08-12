# Skyseers Website

Website rasmi untuk organisasi astronomi Skyseers yang menjalankan program-program berkaitan cerapan bulan, matahari, dan ilmu falak.

## Struktur Website

Website ini mengandungi 5 section utama:
- **Home** - Halaman utama dengan pengenalan
- **Mengenai Kami** - Maklumat tentang organisasi
- **Aktiviti & Program** - Program-program yang dijalankan
- **Produk** - Produk yang dijual oleh Skyseers
- **Contact Us** - Maklumat hubungan

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan CSS Variables untuk tema)
- JavaScript (Vanilla JS)
- Font Awesome untuk ikon

## Ciri-ciri Utama

- **Responsive Design** - Sesuai untuk desktop, tablet, dan mobile
- **Dark/Light Mode** - Pengguna boleh tukar tema
- **Single Page Application** - Semua section dalam satu halaman
- **Smooth Scrolling** - Navigasi yang lancar
- **Animation on Scroll** - Animasi ketika scroll

## Warna Tema

- **Primary Blue**: #008ba6
- **Primary Gold**: #ffa100  
- **White**: #ffffff
- **Black**: #000000

## Setup dan Penggunaan

1. Pastikan semua fail berada dalam direktori yang sama
2. Letakkan logo `skyseers_logo.png` dalam folder `images/`
3. Letakkan gambar-gambar aktiviti dalam folder `images/`:
   - `moon-observation.jpg` - untuk Program Cerapan Bulan
   - `solar-observation.jpg` - untuk Program Cerapan Matahari  
   - `astronomy-workshop.jpg` - untuk Workshop Ilmu Falak
   - `cosmic-gold-tshirt.jpg` - untuk produk baju
4. Buka `index.html` dalam pelayar web

## Struktur Folder

```
skyseers/
├── index.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── skyseers_logo.png
    ├── moon-observation.jpg
    ├── solar-observation.jpg
    ├── astronomy-workshop.jpg
    └── cosmic-gold-tshirt.jpg
```

## Customization

### Menukar Kandungan
- Edit `index.html` untuk menukar teks dan kandungan
- Tambah atau ubah aktiviti dalam section "Aktiviti & Program"
- Tambah produk baharu dalam section "Produk"

### Menukar Gaya
- Edit `styles.css` untuk menukar warna, font, atau layout
- Warna tema boleh diubah dalam CSS variables di bahagian `:root`

### Menambah Functionality
- Edit `script.js` untuk menambah fungsi baharu
- Semua class sudah diorganisasi dengan baik untuk mudah dikembangkan

## Browser Support

Website ini menyokong semua pelayar moden termasuk:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Nota Penting

- Website ini tidak menggunakan database
- Form contact hanya menunjukkan mesej kepada pengguna (tiada backend)
- Untuk functionality penuh (seperti hantar email), perlu tambah backend
- Gambar-gambar perlu diletakkan dalam folder `images/` dengan nama yang betul

## Sokongan

Untuk sebarang pertanyaan atau bantuan, sila hubungi pembangun website.
