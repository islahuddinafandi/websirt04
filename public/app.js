// ===========================
// RT 005 Website — app.js
// ===========================

// ── NAVBAR scroll effect ──
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── HAMBURGER menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── TABS ──
const tabs      = document.querySelectorAll('.tab');
const panels    = document.querySelectorAll('.form-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const id = tab.dataset.tab;
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('tab-' + id);
    if (panel) panel.classList.add('active');
  });
});

// ── "Lainnya" conditional field (Pengantar) ──
const jenisSel = document.querySelector('[name="jenis_dokumen"]');
const lainnyaG = document.getElementById('lainnyaGroup');
if (jenisSel) {
  jenisSel.addEventListener('change', () => {
    if (lainnyaG) lainnyaG.style.display = jenisSel.value === 'Lainnya' ? 'flex' : 'none';
  });
}

// ── FILE DROP label update ──
document.querySelectorAll('.file-drop').forEach(drop => {
  const input  = drop.querySelector('.file-input');
  const labelSpan = drop.querySelector('.file-label span');
  input.addEventListener('change', () => {
    if (input.files.length) {
      labelSpan.textContent = input.files[0].name;
    }
  });
});

// ── FORM SUBMISSION ──
function showModal(msg) {
  const overlay = document.getElementById('modalOverlay');
  const msgEl   = document.getElementById('modalMsg');
  if (msgEl) msgEl.textContent = msg || 'Pengajuan Anda telah kami terima. Kami akan menghubungi Anda melalui WhatsApp dalam 1–2 hari kerja.';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
};

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Generic form handler — in production, replace with Firebase Firestore writes
function handleForm(formId, successMsg) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn     = form.querySelector('[type="submit"]');
    const btnText = btn.querySelector('.btn-text') || btn;
    const loader  = btn.querySelector('.btn-loader');

    // Show loading state
    if (loader) loader.style.display = 'inline';
    if (btnText && loader) btnText.style.display = 'none';
    btn.disabled = true;

    // ── Collect form data ──
    const data = {};
    new FormData(form).forEach((value, key) => {
      if (typeof value === 'string') data[key] = value;
    });
    data.timestamp   = new Date().toISOString();
    data.formType    = formId;

    // ── Firebase Firestore Integration ──
    // When Firebase is configured, uncomment and use:
    //
    // import { collection, addDoc } from "firebase/firestore";
    // try {
    //   await addDoc(collection(db, "pengajuan"), data);
    // } catch (err) {
    //   console.error("Firestore error:", err);
    // }
    //
    // For now, we simulate a 1.2s server response:
    await new Promise(r => setTimeout(r, 1200));

    // Reset
    form.reset();
    if (loader) loader.style.display = 'none';
    if (btnText && loader) btnText.style.display = 'inline';
    btn.disabled = false;
    showModal(successMsg);
  });
}

handleForm('formDomisili',  'Pengajuan Surat Domisili berhasil dikirim. Surat siap diambil dalam 1–2 hari kerja. Kami akan konfirmasi via WhatsApp.');
handleForm('formPengantar', 'Pengajuan Surat Pengantar berhasil! Harap konfirmasi via WhatsApp ke 0812-3456-7890 untuk memastikan surat segera diproses.');
handleForm('formKematian',  'Laporan kematian berhasil dikirim. Kami turut berduka cita. Surat keterangan akan disiapkan dan dapat diambil besok.');
handleForm('formPindah',    'Pengajuan Surat Pindah berhasil! Harap datang ke sekretariat RT minimal 3 hari sebelum tanggal pindah.');
handleForm('formKeluhan',   'Terima kasih atas masukan Anda! Aspirasi Anda akan menjadi bahan evaluasi pengurus RT.');

// ── SMOOTH scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── ACTIVE nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' });

sections.forEach(s => observer.observe(s));

// ── ADD active nav style ──
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: #fff !important; background: rgba(255,255,255,.12) !important; }`;
document.head.appendChild(style);

// ── FADE-IN on scroll ──
const fadeEls = document.querySelectorAll('.announce-card, .pengurus-card, .galeri-item, .stat-card');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp .6s ease both';
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => {
  el.style.opacity = '0';
  fadeObs.observe(el);
});

console.log('RT 005/RW 012 Website loaded ✅');
