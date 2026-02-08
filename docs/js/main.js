/* =========================
   GALLERY (썸네일 → 메인 → 모달)
========================= */

const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

const mainPhoto = document.getElementById('mainPhoto');
const thumbs = Array.from(document.querySelectorAll('.thumb'));
let currentIndex = 0;

/* ===== 썸네일 클릭 → 메인 변경 ===== */
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    mainPhoto.src = thumb.src;

    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

/* ===== 메인 사진 클릭 → 모달 열기 ===== */
mainPhoto.addEventListener('click', () => {
  modalImg.src = mainPhoto.src;
  modal.classList.add('show');
});

/* ===== 닫기 ===== */
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

/* ===== 좌우 버튼 ===== */
function showNext() {
  currentIndex = (currentIndex + 1) % thumbs.length;
  updateModal();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
  updateModal();
}

function updateModal() {
  modalImg.src = thumbs[currentIndex].src;
  mainPhoto.src = thumbs[currentIndex].src;

  thumbs.forEach(t => t.classList.remove('active'));
  thumbs[currentIndex].classList.add('active');
}

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  showNext();
});

prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  showPrev();
});

/* ===== 모바일 스와이프 ===== */
let startX = 0;

modalImg.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modalImg.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? showNext() : showPrev();
  }
});
function scrollThumbToCenter(thumb) {
  const container = document.querySelector('.gallery-thumbs');
  const containerRect = container.getBoundingClientRect();
  const thumbRect = thumb.getBoundingClientRect();

  const offset =
    thumbRect.left -
    containerRect.left -
    containerRect.width / 2 +
    thumbRect.width / 2;

  container.scrollBy({
    left: offset,
    behavior: 'smooth'
  });
}
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    mainPhoto.src = thumb.src;

    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    scrollThumbToCenter(thumb); // 🔥 추가
  });
});
function changeMainPhoto(src) {
  mainPhoto.style.opacity = '0';
  setTimeout(() => {
    mainPhoto.src = src;
    mainPhoto.style.opacity = '1';
  }, 150);
}
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    currentIndex = index;
    changeMainPhoto(thumb.src);

    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    scrollThumbToCenter(thumb);
  });
});


/* ===============================
   Account Toggle
================================ */
document.querySelectorAll('.account-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.nextElementSibling.classList.toggle('show');
  });
});

/* ===============================
   Copy Account
================================ */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = document.getElementById(btn.dataset.copy)?.innerText;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = '복사 완료!';
      setTimeout(() => (btn.innerText = '복사하기'), 1500);
    });
  });
});

/* ===============================
   Music Player
================================ */
const player = document.getElementById('player');
const musicBtn = document.querySelector('.music-btn');
let started = false;
let playing = false;

document.addEventListener(
  'touchstart',
  () => {
    if (!started && player) {
      player.play();
      started = true;
      playing = true;
    }
  },
  { once: true }
);

document.addEventListener(
  'click',
  () => {
    if (!started && player) {
      player.play();
      started = true;
      playing = true;
    }
  },
  { once: true }
);

musicBtn?.addEventListener('click', e => {
  e.stopPropagation();
  if (!player) return;

  playing ? player.pause() : player.play();
  playing = !playing;
});
