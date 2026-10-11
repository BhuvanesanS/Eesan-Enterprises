const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

document.querySelector('.quote-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = `Hello Eesan Enterprises,%0A%0AI need a quote for construction materials.%0A%0AName: ${encodeURIComponent(form.get('name'))}%0APhone: ${encodeURIComponent(form.get('phone'))}%0AMaterial: ${encodeURIComponent(form.get('material'))}%0AQuantity & location: ${encodeURIComponent(form.get('details'))}`;
  window.open(`https://wa.me/919080777754?text=${message}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();

const quotePopup = document.getElementById('quote-popup');
const popupClose = document.querySelector('.popup-close');
const popupDetails = document.querySelector('.popup-details');
const popupSessionKey = 'eesan-enterprises-quote-popup-seen';

const hasSeenQuotePopup = () => {
  try {
    return sessionStorage.getItem(popupSessionKey) === 'true';
  } catch (_) {
    return false;
  }
};

const closeQuotePopup = () => {
  quotePopup.classList.remove('is-open');
  quotePopup.setAttribute('aria-hidden', 'true');
  try {
    sessionStorage.setItem(popupSessionKey, 'true');
  } catch (_) {
    // The popup can still close when browser storage is unavailable.
  }
};

const openQuotePopup = () => {
  quotePopup.classList.add('is-open');
  quotePopup.setAttribute('aria-hidden', 'false');
  popupClose.focus();
};

popupClose.addEventListener('click', closeQuotePopup);
popupDetails.addEventListener('click', closeQuotePopup);
quotePopup.addEventListener('click', (event) => {
  if (event.target === quotePopup) closeQuotePopup();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && quotePopup.classList.contains('is-open')) closeQuotePopup();
});

window.addEventListener('load', () => {
  window.setTimeout(() => document.body.classList.add('is-loaded'), 520);
  if (!hasSeenQuotePopup()) window.setTimeout(openQuotePopup, 7000);
});

const revealTargets = document.querySelectorAll('.section-heading, .material-card, .material-guide > *, .guide-grid article, .supply-visual, .supply-copy, .quote-banner > *, .faq > *, .faq details, .contact-copy, .quote-form, .intro-strip > *');
revealTargets.forEach((element) => element.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealTargets.forEach((element) => revealObserver.observe(element));
