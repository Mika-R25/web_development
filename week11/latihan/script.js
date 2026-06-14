// =====================
// TAB NAVIGATION
// =====================
function switchTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}


// =====================
// LATIHAN 1 – WARNA TEKS
// =====================
const colors = [
  { label: 'Biru',   val: '#185FA5', bg: '#dbeafe', text: '#1e40af' },
  { label: 'Hijau',  val: '#3B6D11', bg: '#dcfce7', text: '#166534' },
  { label: 'Merah',  val: '#A32D2D', bg: '#fee2e2', text: '#991b1b' },
  { label: 'Ungu',   val: '#534AB7', bg: '#ede9fe', text: '#4c1d95' },
  { label: 'Oranye', val: '#854F0B', bg: '#fef3c7', text: '#92400e' },
  { label: 'Pink',   val: '#993556', bg: '#fce7f3', text: '#9d174d' },
];

const colorGrid = document.getElementById('colorGrid');
colors.forEach(c => {
  const btn = document.createElement('button');
  btn.className = 'color-btn';
  btn.textContent = c.label;
  btn.style.background = c.bg;
  btn.style.color = c.text;
  btn.style.border = '1px solid ' + c.val + '55';
  btn.onclick = () => {
    document.getElementById('hero-text').style.color = c.val;
  };
  colorGrid.appendChild(btn);
});

function changeSize(v) {
  document.getElementById('hero-text').style.fontSize = v + 'px';
  document.getElementById('sizeOut').textContent = v + 'px';
}


// =====================
// LATIHAN 2 – BIODATA
// =====================
function showBio() {
  const nama    = document.getElementById('b-nama').value.trim() || '—';
  const ttl     = document.getElementById('b-ttl').value.trim() || '—';
  const hobi    = document.getElementById('b-hobi').value.trim() || '—';
  const sekolah = document.getElementById('b-sekolah').value.trim() || '—';

  const initials = nama
    .split(' ')
    .map(w => w[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  document.getElementById('bioAvatar').textContent  = initials;
  document.getElementById('bioName').textContent    = nama;
  document.getElementById('bioTtl').textContent     = ttl;
  document.getElementById('bioHobi').textContent    = hobi;
  document.getElementById('bioSekolah').textContent = sekolah;

  document.getElementById('bioResult').style.display = 'block';
}


// =====================
// LATIHAN 3 – KALKULATOR
// =====================
const calcHistory = [];

function calculate() {
  const a  = parseFloat(document.getElementById('cA').value) || 0;
  const b  = parseFloat(document.getElementById('cB').value) || 0;
  const op = document.getElementById('cOp').value;

  let result;
  if      (op === '+') result = a + b;
  else if (op === '−') result = a - b;
  else if (op === '×') result = a * b;
  else                 result = b !== 0 ? a / b : 'Tidak terdefinisi';

  const disp = typeof result === 'number'
    ? parseFloat(result.toFixed(6))
    : result;

  document.getElementById('calcEq').textContent  = a + ' ' + op + ' ' + b;
  document.getElementById('calcAns').textContent = '= ' + disp;

  if (typeof result === 'number') {
    const entry = a + ' ' + op + ' ' + b + ' = ' + disp;
    if (calcHistory[calcHistory.length - 1] !== entry) {
      calcHistory.unshift(entry);
      if (calcHistory.length > 5) calcHistory.pop();
      document.getElementById('histList').innerHTML =
        calcHistory.map(h => '<div class="hist-item">' + h + '</div>').join('');
    }
  }
}


// =====================
// LATIHAN 4 – VALIDASI FORM
// =====================
const state4 = { nama: false, email: false, pass: false, pass2: false };

function valNama() {
  const v  = document.getElementById('fNama').value;
  const el = document.getElementById('fNama');
  const h  = document.getElementById('hNama');
  const ok = /^[A-Za-z\s]{3,}$/.test(v.trim());

  el.className  = v ? (ok ? 'valid' : 'invalid') : '';
  h.textContent = v ? (ok ? '✓ Nama valid' : 'Hanya huruf dan spasi, minimal 3 karakter') : '';
  h.className   = 'hint ' + (ok ? 'ok' : 'err');
  state4.nama   = ok;
}

function valEmail() {
  const v  = document.getElementById('fEmail').value;
  const el = document.getElementById('fEmail');
  const h  = document.getElementById('hEmail');
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  el.className  = v ? (ok ? 'valid' : 'invalid') : '';
  h.textContent = v ? (ok ? '✓ Email valid' : 'Format email tidak valid') : '';
  h.className   = 'hint ' + (ok ? 'ok' : 'err');
  state4.email  = ok;
}

function valPass() {
  const v    = document.getElementById('fPass').value;
  const h    = document.getElementById('hPass');
  const fill = document.getElementById('strengthFill');

  let strength = 0;
  if (v.length >= 6)          strength++;
  if (/[A-Z]/.test(v))        strength++;
  if (/[0-9]/.test(v))        strength++;
  if (/[^A-Za-z0-9]/.test(v)) strength++;

  const pct = ['0%', '25%', '50%', '75%', '100%'][strength];
  const col = ['#E24B4A', '#E24B4A', '#EF9F27', '#3B6D11', '#3B6D11'][strength];
  fill.style.width      = pct;
  fill.style.background = col;

  const labels  = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat kuat'];
  h.textContent = v ? (v.length < 6 ? 'Min. 6 karakter' : labels[strength] || '') : '';
  h.className   = 'hint ' + (strength >= 1 && v.length >= 6 ? 'ok' : 'err');
  state4.pass   = v.length >= 6;

  valPass2();
}

function valPass2() {
  const v  = document.getElementById('fPass').value;
  const v2 = document.getElementById('fPass2').value;
  const el = document.getElementById('fPass2');
  const h  = document.getElementById('hPass2');

  if (!v2) { el.className = ''; h.textContent = ''; return; }

  const ok      = v === v2;
  el.className  = ok ? 'valid' : 'invalid';
  h.textContent = ok ? '✓ Kata sandi cocok' : 'Kata sandi tidak cocok';
  h.className   = 'hint ' + (ok ? 'ok' : 'err');
  state4.pass2  = ok;
}

function submitForm() {
  valNama(); valEmail(); valPass(); valPass2();

  const nama = document.getElementById('fNama').value.trim();
  const msg  = document.getElementById('successMsg');

  if (state4.nama && state4.email && state4.pass && state4.pass2) {
    msg.textContent   = 'Selamat datang, ' + nama + '! Pendaftaran berhasil.';
    msg.style.display = 'block';
  } else {
    msg.style.display = 'none';
  }
}