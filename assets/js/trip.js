/* ============================================
   SHARED CHROME — cursor, preloader, hamburger
============================================ */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateRing(){
  ringX += (mouseX - ringX) * 0.16;
  ringY += (mouseY - ringY) * 0.16;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();
document.querySelectorAll('[data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
});

document.getElementById('preloader').style.clipPath = 'circle(150% at 50% 50%)';
window.addEventListener('load', () => {
  const fill = document.getElementById('preloaderFill');
  const pre = document.getElementById('preloader');
  fill.style.transition = 'width 1s ease';
  requestAnimationFrame(() => { fill.style.width = '100%'; });
  setTimeout(() => {
    pre.style.transition = 'clip-path .9s cubic-bezier(.65,0,.35,1)';
    pre.style.clipPath = 'circle(0% at 50% 50%)';
    setTimeout(() => { pre.style.display = 'none'; }, 950);
  }, 1050);
});

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
   SCROLL REVEALS — bites, memoir splits, quote, gallery
============================================ */
const revealTargets = document.querySelectorAll(
  '.bite-card, .memoir-image, .memoir-text, .pull-quote, .quote-mark, .gallery-item, .stat, .closing-line'
);
revealTargets.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; el.style.transition = 'opacity .8s cubic-bezier(.65,0,.35,1), transform .8s cubic-bezier(.65,0,.35,1)'; });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealTargets.forEach(el => revealObserver.observe(el));

/* stagger bite cards slightly */
document.querySelectorAll('.bite-card').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.08) + 's';
});
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.style.transitionDelay = (i * 0.05) + 's';
});

/* ============================================
   GALLERY LIGHTBOX
============================================ */
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));

function openLightbox(item){
  const bg = getComputedStyle(item).backgroundImage;
  lightboxImage.style.backgroundImage = bg;
  lightboxCaption.textContent = item.dataset.caption || '';
  lightbox.classList.add('open');
}
function closeLightbox(){ lightbox.classList.remove('open'); }

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });