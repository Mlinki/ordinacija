// Postavljanje trenutne godine u footeru
document.getElementById('year').textContent = new Date().getFullYear();

// Mobilna navigacija (Toggle)
const burger = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');

burger.addEventListener('click', () => {
  const open = mobileNav.style.display === 'block';
  mobileNav.style.display = open ? 'none' : 'block';
  burger.setAttribute('aria-expanded', String(!open));
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal animacija
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealEls.forEach(el => obs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// Slika/Forma za naručivanje -> otvaranje mailto linka
const form = document.getElementById('bookingForm');
const toast = document.getElementById('formToast');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(form);
  const childName = data.get('childName');
  const parentName = data.get('parentName');
  const phone = data.get('phone');
  const date = data.get('date') || 'po dogovoru';
  const reason = data.get('reason');
  const note = data.get('note') || '—';

  const subject = encodeURIComponent('Zahtjev za termin — ' + childName);
  const body = encodeURIComponent(
    'Novi zahtjev za termin\n\n' +
    'Dijete: ' + childName + '\n' +
    'Roditelj: ' + parentName + '\n' +
    'Telefon: ' + phone + '\n' +
    'Željeni datum: ' + date + '\n' +
    'Razlog dolaska: ' + reason + '\n' +
    'Napomena: ' + note
  );

  window.location.href = 'mailto:ordinacija.golubic@example.com?subject=' + subject + '&body=' + body;

  toast.classList.add('show');
  form.reset();
});