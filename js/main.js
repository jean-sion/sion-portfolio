/* SION.JIN / 메인 페이지 JS (프레임워크 없음) */
(() => {
  'use strict';

  // 01. 스크롤 시 헤더 경계선 표시
  const header = document.getElementById('siteHeader');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 15);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive:true });

  // 02. 모바일 메뉴: 버튼 상태와 표시 여부를 동기화
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const setMenu = (open) => {
    if (!menuToggle || !mobileNav) return;
    mobileNav.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  };
  menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.matchMedia('(min-width:901px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // 03. 스크롤 인터랙션: JS가 비활성화된 환경에서는 콘텐츠를 그대로 노출
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:0.08, rootMargin:'0px 0px 40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // 03-1. 히어로 작업 이미지 자동 슬라이더
  // 약 4.5초 간격, 850ms 부드러운 가로 슬라이드. 점 클릭 시 바로 해당 작업으로 이동.
  // 마우스를 올리거나 키보드 포커스가 있으면 일시정지하고, 탭이 보이지 않을 때도 정지.
  const carousel = document.getElementById('heroCarousel');
  if (carousel) {
    const track = document.getElementById('heroCarouselTrack');
    const slides = [...carousel.querySelectorAll('.hero-slide')];
    const dots = [...carousel.querySelectorAll('.hero-carousel-dot')];
    const counter = document.getElementById('heroCarouselCount');
    const intervalMs = 4500; // 자동 전환 간격: 밀리초 (4500 = 4.5초)
    let current = 0;
    let timer = null;
    let hovered = false;
    let focused = false;
    let isVisible = true;

    function goToSlide(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translate3d(-${current * 100}%, 0, 0)`;
      slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === current);
        dot.setAttribute('aria-pressed', String(i === current));
      });
      if (counter) counter.textContent = `${String(current + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    }

    function stopAuto() {
      if (timer !== null) { window.clearInterval(timer); timer = null; }
    }
    function startAuto() {
      stopAuto();
      if (slides.length < 2 || reducedMotion || hovered || focused || !isVisible || document.hidden) return;
      timer = window.setInterval(() => goToSlide(current + 1), intervalMs);
    }

    dots.forEach(dot => dot.addEventListener('click', () => {
      goToSlide(Number(dot.dataset.slide));
      // 사용자 선택 후 새로운 4.5초 대기 시작
      startAuto();
    }));
    carousel.addEventListener('mouseenter', () => { hovered = true; stopAuto(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; startAuto(); });
    carousel.addEventListener('focusin', () => { focused = true; stopAuto(); });
    carousel.addEventListener('focusout', () => {
      // 내부 다른 버튼으로 포커스가 옮겨가는 경우에는 계속 일시정지
      window.requestAnimationFrame(() => {
        focused = carousel.contains(document.activeElement);
        if (!focused) startAuto();
      });
    });
    document.addEventListener('visibilitychange', startAuto);
    if ('IntersectionObserver' in window) {
      const visibilityObserver = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
        startAuto();
      }, { threshold: 0.15 });
      visibilityObserver.observe(carousel);
    }
    goToSlide(0);
    startAuto();
  }

  // 04. 프로젝트 카드는 실제 상세 HTML 링크로 연결됩니다.

  // 06. 맨 위로 이동
  document.getElementById('backTop')?.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior:reducedMotion ? 'instant' : 'smooth' });
  });

  // 07. AMS 사이트의 실제 스크린샷을 assets/images에 넣으면 자동 표시
  // 파일이 없는 상태에서는 404 깨진 이미지 대신 의도된 플레이스홀더가 보입니다.
  document.querySelectorAll('.ams-browser').forEach(browser => {
    const screenshot = browser.querySelector('.ams-site-screenshot');
    if (!screenshot) return;
    const showIfLoaded = () => { if (screenshot.naturalWidth > 0) browser.classList.add('has-screenshot'); };
    screenshot.addEventListener('load', showIfLoaded);
    if (screenshot.complete) showIfLoaded();
  });
})();


// =======================================
// MORE WORKS — CATEGORY FILTER
// =======================================

function initMoreWorksFilter() {

  const buttons = document.querySelectorAll(
    ".gallery-filter"
  );

  const cards = document.querySelectorAll(
    ".gallery-card"
  );

  const count = document.getElementById(
    "galleryCount"
  );

  if (!buttons.length || !cards.length) return;

  buttons.forEach(button => {

    button.addEventListener("click", () => {

      const selected = button.dataset.filter;

      // 버튼 활성화 상태 변경
      buttons.forEach(btn => {
        const isActive = btn === button;

        btn.classList.toggle(
          "is-active",
          isActive
        );

        btn.setAttribute(
          "aria-pressed",
          String(isActive)
        );
      });

      let visibleCount = 0;

      // 프로젝트 표시/숨김
      cards.forEach(card => {

        const categories = (
          card.dataset.category || ""
        ).split(/\s+/);

        const show =
          selected === "all" ||
          categories.includes(selected);

        card.hidden = !show;

        if (show) visibleCount++;

      });

      // 작업물 개수 표시
      if (count) {
        count.textContent =
          `${visibleCount} PROJECTS`;
      }

    });

  });

}

// 문서 로딩 완료 후 실행
if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initMoreWorksFilter
  );
} else {
  initMoreWorksFilter();
}
