/* =========================
   on load（すべてここで初期化）
========================= */
window.addEventListener('load', () => {
  initKV();
  initBusinessSlider();
  initHamburger();
  initMessageObserver();
});


/* =========================
   KV 共通初期化
========================= */
function initKV() {
  const kv = document.querySelector('.key-visual');
  if (!kv || kv.dataset.kvInit) return;

  const mqSP = window.matchMedia('(max-width: 767px)');

  if (mqSP.matches) {
    initKVAnimationSP(kv);
  } else {
    initKVAnimationPC(kv);
  }
}


/* =========================
   KV：PC
========================= */
function initKVAnimationPC(kv) {
  kv.dataset.kvInit = 'pc';

  const orange = kv.querySelector('.orange-el');
  const pink   = kv.querySelector('.pink-el');
  const beige  = kv.querySelector('.beige-el');

  const mv01   = kv.querySelector('.mv01');
  const mv02   = kv.querySelector('.mv02');
  const mvLast = kv.querySelector('.mvlast');
  const band   = kv.querySelector('.band');

  if (!mv01 || !mv02 || !mvLast) return;

  setTimeout(() => kv.classList.add('kv-show'), 100);
  setTimeout(() => orange?.classList.add('is-show'), 1200);

  setTimeout(() => mv01.classList.add('is-show'), 2600);
  setTimeout(() => mv01.classList.remove('is-show'), 6200);

  setTimeout(() => pink?.classList.add('is-show'), 7000);

  setTimeout(() => mv02.classList.add('is-show'), 8600);
  setTimeout(() => mv02.classList.remove('is-show'), 12000);

  setTimeout(() => beige?.classList.add('is-show'), 12800);

  setTimeout(() => {
    kv.classList.add('kv-final');
    band?.classList.add('show-band');
  }, 14800);
}


/* =========================
   KV：SP
========================= */
function initKVAnimationSP(kv) {
  kv.dataset.kvInit = 'sp';

  const orange = kv.querySelector('.orange-el');
  const pink   = kv.querySelector('.pink-el');
  const beige  = kv.querySelector('.beige-el');

  const mv01   = kv.querySelector('.mv01_sp');
  const mv02   = kv.querySelector('.mv02_sp');
  const mvLast = kv.querySelector('.mvlast_sp');
  const band   = kv.querySelector('.band');

  if (!mv01 || !mv02 || !mvLast) return;

  setTimeout(() => kv.classList.add('kv-show'), 100);
  setTimeout(() => orange?.classList.add('is-show'), 1200);

  setTimeout(() => mv01.classList.add('is-show'), 2600);
  setTimeout(() => mv01.classList.remove('is-show'), 6200);

  setTimeout(() => pink?.classList.add('is-show'), 7000);

  setTimeout(() => mv02.classList.add('is-show'), 8600);
  setTimeout(() => mv02.classList.remove('is-show'), 12000);

  setTimeout(() => beige?.classList.add('is-show'), 12800);

  setTimeout(() => {
    kv.classList.add('kv-final');
    band?.classList.add('show-band');
  }, 14800);
}

/* =========================
   hamburger menu
========================= */
function initHamburger() {
  const hamburger = document.getElementById('hamburger-btn');
  const menu = document.getElementById('menuModal');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}


/* =========================
   Business Slider
========================= */
function initBusinessSlider() {
  const track = document.querySelector('.business-slider-wrapper');
  const viewport = document.querySelector('.slider-viewport');
  if (!track || !viewport || track.dataset.sliderInit) return;

  track.dataset.sliderInit = 'true';

  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.slider-arrow.prev');
  const nextBtn = document.querySelector('.slider-arrow.next');
  const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));

  let index = 1;

  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[slides.length - 1].cloneNode(true);
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  const allSlides = Array.from(track.children);

  function slideWidth() {
    const slide = allSlides[0];
    const style = getComputedStyle(slide);
    return slide.offsetWidth +
      parseFloat(style.marginLeft) +
      parseFloat(style.marginRight);
  }

  function move(animate = true) {
    const x =
      -(slideWidth() * index) +
      (viewport.offsetWidth - slideWidth()) / 2;

    track.style.transition = animate ? 'transform 0.4s ease' : 'none';
    track.style.transform = `translateX(${x}px)`;

    allSlides.forEach(s => s.classList.remove('is-active'));
    allSlides[index]?.classList.add('is-active');

    dots.forEach(d => d.classList.remove('active'));
    dots[(index - 1 + dots.length) % dots.length]?.classList.add('active');
  }

  nextBtn?.addEventListener('click', () => {
    index++;
    move();
    if (index === allSlides.length - 1) {
      setTimeout(() => {
        index = 1;
        move(false);
      }, 400);
    }
  });

  prevBtn?.addEventListener('click', () => {
    index--;
    move();
    if (index === 0) {
      setTimeout(() => {
        index = allSlides.length - 2;
        move(false);
      }, 400);
    }
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i + 1;
      move();
    });
  });

  move(false);
  window.addEventListener('resize', () => move(false));
}


/* =========================
   Team Slider（SPのみ）
========================= */
window.addEventListener('load', () => {
  const slider = document.querySelector('.member-slider');
  const list = document.querySelector('.member-list');
  if (!slider || !list) return;

  /* =========================
     元カード取得＆並び替え
  ========================= */
  let baseItems = Array.from(list.children);

  // 意図した並び替え（3番目と4番目）
  if (baseItems.length >= 4) {
    [baseItems[2], baseItems[3]] = [baseItems[3], baseItems[2]];
  }

  list.innerHTML = '';
  baseItems.forEach(item => list.appendChild(item));

  /* =========================
     無限用複製（ここが重要）
  ========================= */

  // 右側用（順方向）
  baseItems.forEach(item =>
    list.appendChild(item.cloneNode(true))
  );

  // 左側用（逆順）
  [...baseItems].reverse().forEach(item =>
    list.insertBefore(item.cloneNode(true), list.firstChild)
  );

  const items = Array.from(list.children);
  const baseLength = baseItems.length;

  // 本物の1枚目が中央
  let index = baseLength;

  function setPosition(animate = true) {
    const card = items[index];
    if (!card) return;

    const cardRect = card.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();

    const cardCenter = cardRect.left + cardRect.width / 2;
    const sliderCenter = sliderRect.left + sliderRect.width / 2;

    const currentX =
      new DOMMatrixReadOnly(getComputedStyle(list).transform).m41;

    const x = sliderCenter - cardCenter + currentX;

    list.style.transition = animate ? 'transform 0.6s ease' : 'none';
    list.style.transform = `translateX(${x}px)`;
  }

  function slide() {
    index++;
    setPosition(true);

    // 右端を超えたら同じ並び位置へ戻す
    if (index >= baseLength * 2) {
      setTimeout(() => {
        index -= baseLength;
        setPosition(false);
      }, 600);
    }
  }

  let timer = setInterval(slide, 2500);

  // ホバー / タップで停止
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => {
    timer = setInterval(slide, 2500);
  });

  setPosition(false);
  window.addEventListener('resize', () => setPosition(false));
});


/* =========================
   Intersection Observer
========================= */
function initMessageObserver() {
  const message = document.querySelector('.message');
  if (!message) return;

  const texts = document.querySelectorAll(
    '.message-text .m1, .message-text .m2, .message-text .m3'
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        texts.forEach((el, i) => {
          setTimeout(() => el.classList.add('is-show'), i * 1300);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.35 });

  observer.observe(message);
}
