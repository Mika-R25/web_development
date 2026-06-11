/* =============================================
   M. MIKA RAHIL — PORTFOLIO SCRIPTS
   script.js
   ============================================= */

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mx = 0, my = 0;
let rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = Math.round(rx) + 'px';
  ring.style.top  = Math.round(ry) + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH NAV SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── CONTACT FORM SUBMIT ── */
function handleSend(btn) {
  btn.innerHTML = '<span>Terkirim ✓</span><span>✓</span>';
  btn.style.background = '#1a4a1a';

  setTimeout(() => {
    btn.innerHTML = '<span>Kirim Pesan</span><span class="go">↗</span>';
    btn.style.background = '';
  }, 3000);
}