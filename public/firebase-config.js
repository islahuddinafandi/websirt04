// firebase-config.js
// ══════════════════════════════════════════════════════
// Konfigurasi Firebase untuk Website RT 005
// Ganti nilai di bawah dengan konfigurasi project Firebase Anda
// ══════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// ── GANTI dengan konfigurasi Firebase project Anda ──
const firebaseConfig = {
apiKey: "AIzaSyDQ7EcH1DxrZ2rw6JCOd7e6QDVfchXwirY",
  authDomain: "rt04-bsr.firebaseapp.com",
  projectId: "rt04-bsr",
  storageBucket: "rt04-bsr.firebasestorage.app",
  messagingSenderId: "626109108558",
  appId: "1:626109108558:web:9220070f660d6e85814e1f"
};

const app     = initializeApp(firebaseConfig);
const db      = getFirestore(app);
const storage = getStorage(app);

/**
 * Simpan pengajuan ke Firestore
 * @param {string} collectionName  - nama koleksi (contoh: "domisili", "pengantar")
 * @param {object} data            - data form
 * @param {File|null} file         - file lampiran (opsional)
 */
export async function simpanPengajuan(collectionName, data, file = null) {
  let fileURL = null;

  if (file) {
    const path      = `lampiran/${collectionName}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    fileURL = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    lampiran:  fileURL,
    status:    "pending",
    createdAt: serverTimestamp()
  });

  return docRef.id;
}

export { db, storage };
