# 🏘️ Website RT 004 / RW 024 — Pondok Benda Pamulang

Website resmi administrasi RT berbasis HTML/CSS/JS dengan Firebase Hosting & Firestore.

---

## 📂 Struktur Proyek

```
rt-website/
├── public/
│   ├── index.html          ← Halaman utama
│   ├── style.css           ← Semua style
│   ├── app.js              ← Interaktivitas & form handler
│   └── firebase-config.js  ← Koneksi Firebase (isi config dulu)
├── firebase.json           ← Konfigurasi Firebase Hosting
├── firestore.rules         ← Aturan keamanan Firestore
├── firestore.indexes.json  ← Index Firestore
├── storage.rules           ← Aturan keamanan Storage
└── README.md
```

---

## 🚀 Cara Deploy ke Firebase

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login ke Firebase
```bash
firebase login
```

### 3. Buat Firebase Project
- Buka https://console.firebase.google.com
- Klik **Add project** → beri nama (misal: `rt004-bsr`)
- Aktifkan **Firestore Database** (mode Production)
- Aktifkan **Storage**
- Aktifkan **Hosting**

### 4. Isi Konfigurasi Firebase
Buka `public/firebase-config.js`, ganti placeholder dengan nilai dari:
- Firebase Console → Project Settings → Your apps → Web app

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "rt005-cipeteutara.firebaseapp.com",
  projectId:         "rt005-cipeteutara",
  storageBucket:     "rt005-cipeteutara.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};
```

### 5. Hubungkan project
```bash
cd rt-website
firebase use --add    # pilih project yang sudah dibuat
```

### 6. Deploy
```bash
firebase deploy
```

Setelah berhasil, website bisa diakses di:
`https://rt005-cipeteutara.web.app`

---

## 🔥 Integrasi Firestore (Form Submission)

Untuk menghubungkan form ke Firestore, edit `public/app.js`:

1. Tambahkan import di awal file:
```js
import { simpanPengajuan } from './firebase-config.js';
```

2. Di dalam `handleForm`, ganti baris simulasi dengan:
```js
const file = form.querySelector('[type="file"]')?.files[0] || null;
await simpanPengajuan(formId, data, file);
```

3. Ubah `index.html` script tag menjadi:
```html
<script type="module" src="app.js"></script>
```

---

## 📊 Melihat Data Pengajuan

Semua pengajuan tersimpan di **Firebase Console → Firestore Database**:
- `domisili/`   — Surat Domisili
- `pengantar/`  — Surat Pengantar
- `kematian/`   — Surat Keterangan Kematian
- `pindah/`     — Surat Pindah
- `keluhan/`    — Keluhan & Saran

---

## ✏️ Kustomisasi

| Yang ingin diubah | File | Bagian |
|---|---|---|
| Nama RT/RW/Kelurahan | `index.html` | Cari `RT 005 / RW 012` |
| Nama & nomor pengurus | `index.html` | Section `#pengurus` |
| Alamat sekretariat | `index.html` | Section `#kontak` |
| Warna utama | `style.css` | `:root` variables |
| Pengumuman | `index.html` | Section `#pengumuman` |

---

## 📱 Fitur

- ✅ Responsive (mobile, tablet, desktop)
- ✅ 5 formulir online (Domisili, Pengantar, Kematian, Pindah, Keluhan)
- ✅ Firebase Hosting (CDN global, SSL otomatis)
- ✅ Firestore untuk menyimpan data pengajuan
- ✅ Firebase Storage untuk lampiran file
- ✅ Pengumuman warga
- ✅ Profil pengurus RT
- ✅ Galeri kegiatan
- ✅ Informasi kontak & peta

---

## 📞 Dukungan

Hubungi pengurus RT atau developer website untuk bantuan teknis.
