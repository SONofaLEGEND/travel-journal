/* ============================================
   CUSTOM CURSOR (smooth lag follow)
============================================ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // Smoothly interpolate inner cursor dot to reduce twitchiness
  cursorX += (mouseX - cursorX) * 0.25;
  cursorY += (mouseY - cursorY) * 0.25;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  // Smoothly interpolate outer ring with elegant lag
  ringX += (mouseX - ringX) * 0.08;
  ringY += (mouseY - ringY) * 0.08;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('[data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

/* ============================================
   PRELOADER -> HERO REVEAL
============================================ */
window.addEventListener('load', () => {
  const tl = gsap.timeline();

  tl.to('#preloaderFill', { width: '100%', duration: 1.1, ease: 'power2.inOut' })
    .to('.preloader-mark', { opacity: 0, duration: 0.4 }, '-=0.2')
    .to('#preloader', {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete: () => { document.getElementById('preloader').style.display = 'none'; }
    })
    .to('.line', {
      y: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.5')
    .to('.btn-outline', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
    .fromTo('.hero-bg', { scale: 1.12 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, '-=1.4');
});

/* preloader needs a clip-path base set before animating out */
document.getElementById('preloader').style.clipPath = 'circle(150% at 50% 50%)';

/* ============================================
   HAMBURGER MENU
============================================ */
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  menuOverlay.classList.toggle('open', menuOpen);
});

document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    hamburger.classList.remove('open');
    menuOverlay.classList.remove('open');
  });
});

/* ============================================
   ABOUT SECTION SCROLL REVEAL
============================================ */
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gsap.to('.about-title, .about-body, .script-line, .arrow-link', {
        opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out'
      });
    }
  });
}, { threshold: 0.35 });

gsap.set('.about-title, .about-body, .script-line, .arrow-link', { opacity: 0, y: 28 });
aboutObserver.observe(document.getElementById('about'));

/* ============================================
   NAVBAR SCROLL EFFECT
============================================ */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ============================================
   COUNTRIES CAROUSEL
   Edit this array to add your own countries, taglines, and photos.
============================================ */
const countries = [
  { name: 'india', tagline: 'spices, chaotic streets, and ancient temples', image: 'assets/images/india.png' },
  { name: 'ireland', tagline: 'grey skies that make the green feel earned', image: 'assets/images/ireland.jpg' },
  { name: 'sri lanka', tagline: 'tea plantations, wild elephants, and warm waves', image: 'assets/images/srilanka.jpg' },
  { name: 'uae', tagline: 'desert dunes, soaring towers, and quiet oases', image: 'assets/images/uae.jpg' },
];

let currentIndex = 0;
const bgA = document.getElementById('carouselBg');
const bgB = document.getElementById('carouselBgNext');
const nameEl = document.getElementById('countryName');
const taglineEl = document.getElementById('countryTagline');
const indexEl = document.getElementById('countIndex');
const totalEl = document.getElementById('countTotal');
const dotsWrap = document.getElementById('dots');
let usingA = true;

function pad(n) { return n < 10 ? '0' + n : n; }

function buildDots() {
  countries.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    dotsWrap.appendChild(d);
  });
}
buildDots();
totalEl.textContent = pad(countries.length);

bgA.style.backgroundImage = `url('${countries[0].image}')`;
bgA.style.backgroundSize = 'cover';
bgA.style.backgroundPosition = 'center';

function goTo(index) {
  currentIndex = (index + countries.length) % countries.length;
  const data = countries[currentIndex];
  const showEl = usingA ? bgB : bgA;
  const hideEl = usingA ? bgA : bgB;

  showEl.style.backgroundImage = `url('${data.image}')`;
  showEl.style.backgroundSize = 'cover';
  showEl.style.backgroundPosition = 'center';
  gsap.to(hideEl, { opacity: 0, duration: 0.55, ease: 'power2.inOut' });
  gsap.to(showEl, { opacity: 1, duration: 0.55, ease: 'power2.inOut' });
  usingA = !usingA;

  const tl = gsap.timeline();
  tl.to([nameEl, taglineEl], { y: -18, opacity: 0, duration: 0.5, ease: 'power2.inOut' })
    .call(() => {
      nameEl.textContent = data.name;
      taglineEl.textContent = data.tagline;
      indexEl.textContent = pad(currentIndex + 1);
    })
    .fromTo([nameEl, taglineEl], { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out' });

  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

document.getElementById('nextBtn').addEventListener('click', () => goTo(currentIndex + 1));
document.getElementById('prevBtn').addEventListener('click', () => goTo(currentIndex - 1));

/* keyboard nav */
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
});

/* touch swipe */
let touchStartX = 0;
const countriesSection = document.getElementById('countries');
countriesSection.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
countriesSection.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (diff > 50) goTo(currentIndex - 1);
  if (diff < -50) goTo(currentIndex + 1);
});
