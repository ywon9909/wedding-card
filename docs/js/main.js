const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImg');
const items = document.querySelectorAll('.gallery-item');
const closeBtn = document.querySelector('.close-btn');

items.forEach(item => {
  item.addEventListener('click', () => {
    modalImg.src = item.src;
    modal.classList.add('show');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.remove('show');
  }
});
// ===== Account Toggle =====
document.querySelectorAll('.account-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    content.classList.toggle('show');
  });
});

// ===== Copy Account =====
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
