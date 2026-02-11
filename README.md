# 📖 Al-Quran Digital

Aplikasi web modern untuk membaca dan mendengarkan Al-Quran dengan terjemahan Bahasa Indonesia.

## ✨ Fitur

- 📚 **114 Surat & 30 Juz** dengan teks Arab (Uthmani) dan terjemahan Indonesia
- 🎵 **Audio Murotal** - Full surat dan per ayat (Abdul Basit)
- 🔍 **Search** - Cari surat berdasarkan nama, nomor, atau terjemahan
- 🌙 **Dark Mode** - Kenyamanan membaca siang & malam
- 📱 **Responsive** - Mobile, tablet, dan desktop friendly
- 🧭 **React Router** - Browser navigation support (back/forward button)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/username/quran-digital.git
cd quran-digital

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

Aplikasi akan berjalan di **http://localhost:5173**

## 🛠️ Tech Stack

- React + Vite 
- Tailwind CSS 3.3
- React Router DOM 
- Lucide React (Icons)
- Quran.com API v4

## 📁 Struktur Project

```
src/
├── components/
│   ├── Navbar.jsx       # Navigation + dark mode toggle
│   ├── Footer.jsx       # Credit & links
│   ├── Home.jsx         # Landing page
│   ├── SurahList.jsx    # Daftar surat + search
│   ├── SurahDetail.jsx  # Detail surat + audio
│   ├── JuzList.jsx      # Daftar juz
│   └── JuzDetail.jsx    # Detail juz + audio
├── config/
│   └── api.js           # API configuration
├── App.jsx              # Routes & state management
└── main.jsx             # Entry point
```

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Update vite.config.js dengan base: '/quran-digital/'
npm run deploy
```

## 🎨 Kustomisasi

**Ganti Logo:** Letakkan `logo.jpg` di folder `public/`

**Ubah Warna:** Edit `tailwind.config.js` di bagian `theme.extend.colors`

**Ubah Reciter:** Edit fungsi `getVerseAudioUrl` di `src/config/api.js`

## 🙏 Credit

- **Data:** [Quran.com](https://quran.com) & [Quran.com API](https://api-docs.quran.com)
- **Audio:** Abdul Basit (Mujawwad)
- **Terjemahan:** Kementerian Agama RI

## 📄 License

MIT License - Bebas digunakan dan dimodifikasi

---

**Dibuat oleh **Aji Prasetia** untuk umat Muslim**
