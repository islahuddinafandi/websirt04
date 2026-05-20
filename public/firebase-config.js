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
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId:             "YOUR_APP_ID"
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
