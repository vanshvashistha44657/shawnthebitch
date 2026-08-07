const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const unlockInput = document.getElementById('unlockInput');
const unlockBtn = document.getElementById('unlockBtn');
const unlockMessage = document.getElementById('unlockMessage');
const magicBtn = document.getElementById('magicBtn');
const albumBtn = document.getElementById('albumBtn');
const closeAlbumBtn = document.getElementById('closeAlbumBtn');
const backgroundEffects = document.getElementById('backgroundEffects');
const albumPanel = document.getElementById('albumPanel');

const unlockCode = 'loveyou3018';
const unlockDate = new Date('2026-10-30T00:00:00');

function isUnlocked() {
  const now = new Date();
  return now >= unlockDate || unlockInput.value.trim().toLowerCase() === unlockCode;
}

function showContent() {
  lockScreen.style.display = 'none';
  mainContent.classList.remove('hidden-content');
}

unlockBtn.addEventListener('click', () => {
  if (isUnlocked()) {
    showContent();
  } else {
    unlockMessage.textContent = 'Wrong code. Try again or wait until 30 Oct 2026.';
  }
});

unlockInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    unlockBtn.click();
  }
});

if (new Date() >= unlockDate) {
  showContent();
}

albumBtn.addEventListener('click', () => {
  albumPanel.classList.add('active');
  albumPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

closeAlbumBtn.addEventListener('click', () => {
  albumPanel.classList.remove('active');
});

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'float-heart';
  heart.textContent = '💖';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = (5 + Math.random() * 4) + 's';
  heart.style.opacity = '0';
  backgroundEffects.appendChild(heart);
  setTimeout(() => heart.remove(), 7000);
}

function createConfetti() {
  const colors = ['#f472b6', '#60a5fa', '#a78bfa', '#facc15', '#34d399'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-20px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
    piece.style.animationDelay = Math.random() * 0.2 + 's';
    backgroundEffects.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

function playBirthdayTune() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 261.63];
  notes.forEach((freq, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    const startTime = ctx.currentTime + index * 0.18;
    oscillator.start(startTime);
    gain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);
    oscillator.stop(startTime + 0.2);
  });
  setTimeout(() => ctx.close(), 1500);
}

magicBtn.addEventListener('click', () => {
  createConfetti();
  for (let i = 0; i < 10; i++) setTimeout(createHeart, i * 120);
  playBirthdayTune();
  magicBtn.textContent = '🎉 Birthday magic activated!';
});

setInterval(() => {
  for (let i = 0; i < 2; i++) createHeart();
}, 1200);
