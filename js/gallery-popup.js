/* SION.JIN / More Works Filter + Image Popup (no libraries) */
(() => {
  'use strict';

  // Filters work on both <a> long-form cards and <button> popup cards.
  const filters = [...document.querySelectorAll('.gallery-filter')];
  const cards = [...document.querySelectorAll('#moreWorksGrid > .gallery-card')];
  const count = document.getElementById('galleryCount');
  const updateCount = n => { if (count) count.textContent = `${n} WORKS`; };
  updateCount(cards.length);

  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach(f => {
      const selected = f === button;
      f.classList.toggle('is-active', selected);
      f.setAttribute('aria-pressed', String(selected));
    });
    let shown = 0;
    cards.forEach(card => {
      const categories = (card.dataset.category || '').split(/\s+/);
      const visible = category === 'all' || categories.includes(category);
      card.hidden = !visible;
      if (visible) shown++;
    });
    updateCount(shown);
  }));

  // First image reuses the existing card thumbnail.
  // Additional filenames are example slots to be replaced with actual images.
  // Missing image files show instructions instead of a broken <img>.
  const popupWorks = {
    'onyourfit-manual': {
      title: '온유어핏 반신욕기 사용설명서 제작',
      images: [
        null
      ]
    },
    'athome-ribbon': {
      title: '엣홈045 리본 페스츄리 생지',
      images: [
        null,
        './assets/images/project/detail-page/athome-ribbon/01.jpg',
        './assets/images/project/detail-page/athome-ribbon/02.gif',
        './assets/images/project/detail-page/athome-ribbon/05.jpg',
        './assets/images/project/detail-page/athome-ribbon/09.jpg'
      ]
    },
    'jeniscent-photo': {
      title: '제니센트 콘텐츠 촬영',
      images: [
        null,
        './assets/images/project/zeni 02.jpg',
        './assets/images/project/zeni 03.jpg'        
      ]
    },
    'athome-croissant': {
      title: '엣홈045 크로와상 할인전',
      images: [
        null,

      ]
    },
    'animal-poster': {
      title: '동물 일러스트 포스터',
      images: [
        null,
      ]
    },
    'AMS-VIEW': {
      title: 'AMS 옥외 간판 디자인',
      images: [
        null,
      ]
    },

     'SAO-COOKIE': {
      title: '사오공감 쿠키 3종 패키지 디자인',
      images: [
        null,
        './assets/images/project/ATHOME-PACK2.jpg',
        './assets/images/project/ATHOME-PACK3.jpg',
        './assets/images/project/ATHOME-PACK4.jpg'
        

      ]
    },

     'SAO-COOKIE2': {
      title: '사오공감 쿠키 지관 패키지 디자인',
      images: [
        null,
        './assets/images/project/ATHOME-PACK6.png'
        

      ]
    },
     'SAO-COOKIE3': {
      title: '사오공감 라벨 디자인',
      images: [
        null,
        

      ]
    },


  };

  const dialog = document.getElementById('portfolioPopup');
  const title = document.getElementById('portfolioPopupTitle');
  const image = document.getElementById('portfolioPopupImage');
  const fallback = document.getElementById('portfolioPopupFallback');
  const counter = document.getElementById('portfolioPopupCount');
  const closeBtn = document.getElementById('portfolioPopupClose');
  const prev = document.getElementById('portfolioPopupPrev');
  const next = document.getElementById('portfolioPopupNext');
  if (!dialog || !title || !image || !fallback || !counter || !closeBtn || !prev || !next) return;

  let currentFiles = [];
  let currentIndex = 0;
  let token = 0;

  function showFallback(src, i) {
    image.hidden = true;
    image.removeAttribute('src');
    fallback.hidden = false;
    fallback.textContent = `작업 이미지 ${String(i + 1).padStart(2, '0')}를 준비 중입니다.\n\n${src || ''}`;
  }
  function showImage() {
    const index = currentIndex;
    const src = currentFiles[index];
    token++;
    const currentToken = token;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(currentFiles.length).padStart(2, '0')}`;
    prev.disabled = index <= 0;
    next.disabled = index >= currentFiles.length - 1;
    if (!src) return showFallback('', index);
    fallback.hidden = true;
    image.hidden = true;
    // Avoid showing broken images: load and validate before swapping.
    const candidate = new Image();
    candidate.onload = () => {
      if (token !== currentToken) return;
      image.src = src;
      image.alt = `${title.textContent} 작업 이미지 ${index + 1}`;
      image.hidden = false;
      fallback.hidden = true;
    };
    candidate.onerror = () => {
      if (token !== currentToken) return;
      showFallback(src, index);
    };
    candidate.src = src;
  }

  document.querySelectorAll('button.gallery-popup-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = popupWorks[card.dataset.popup];
      if (!data) return;
      const thumb = card.querySelector('.gallery-image img')?.getAttribute('src');
      currentFiles = data.images.map(src => src || thumb);
      currentIndex = 0;
      title.textContent = data.title;
      showImage();
      dialog.showModal();
    });
  });
  prev.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; showImage(); }
  });
  next.addEventListener('click', () => {
    if (currentIndex < currentFiles.length - 1) { currentIndex++; showImage(); }
  });
  closeBtn.addEventListener('click', () => dialog.close());

  // The browser closes a native dialog with Escape. Arrow keys navigate images.
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && !prev.disabled) { event.preventDefault(); prev.click(); }
    if (event.key === 'ArrowRight' && !next.disabled) { event.preventDefault(); next.click(); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
})();
