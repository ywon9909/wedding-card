const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const items = Array.from(document.querySelectorAll('.gallery-item'));
const closeBtn = document.querySelector('.close-btn');
const openGallery = document.getElementById('openGallery');
let currentIndex = 0;

openGallery.addEventListener('click', () => {
  currentIndex = 0; // 첫 사진부터
  modalImg.src = items[currentIndex].src;
  modal.classList.add('show');
});


const gridModal = document.getElementById('gridModal');
const closeGrid = document.getElementById('closeGrid');
const openGalleryBtn = document.querySelector('.gallery-open-btn');

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    modalImg.src = item.src;
    gridModal.classList.remove('show');
    modal.classList.add('show');
  });
});

openGalleryBtn.addEventListener('click', () => {
  gridModal.classList.add('show');
});

openGalleryBtn.addEventListener('click', () => {
  gridModal.classList.add('show');
});
/* ====== 갤러리 클릭 ====== */
items.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    modalImg.src = item.src;
    modal.classList.add('show');
  });
});

/* ====== 닫기 ====== */
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});

/* ====== 스와이프 ====== */
let startX = 0;
let endX = 0;

modalImg.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

modalImg.addEventListener('touchmove', e => {
  endX = e.touches[0].clientX;
});

modalImg.addEventListener('touchend', () => {
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      showNext();
    } else {
      showPrev();
    }
  }
});

function showNext() {
  currentIndex = (currentIndex + 1) % items.length;
  modalImg.src = items[currentIndex].src;
}

function showPrev() {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  modalImg.src = items[currentIndex].src;
}

/* ===== Account Toggle ===== */
document.querySelectorAll('.account-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('show');
  });
});

/* ===== Copy Account ===== */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.copy;
    const text = document.getElementById(targetId).innerText;

    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = '복사 완료!';
      setTimeout(() => (btn.innerText = '복사하기'), 1500);
    });
  });
});
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  showNext();
});

prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  showPrev();
});
