// Cake It Easy homepage: menu button and forms.
// The page still works without this file; only these extras need it.

// Optional: paste a newsletter signup URL here (e.g. from Mailchimp or Klaviyo).
// While it's empty, "Subscribe" opens an email to info@cakeiteasy.ca instead.
const NEWSLETTER_ENDPOINT = '';
const SHOP_EMAIL = 'info@cakeiteasy.ca';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showMessage(form, text, isError) {
  const msg = form.querySelector('.form__msg');
  msg.textContent = text;
  msg.classList.toggle('form__msg--error', isError);
  msg.classList.toggle('form__msg--ok', !isError);
}

function openEmail(subject, body) {
  window.location.href =
    'mailto:' + SHOP_EMAIL +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);
}

// ---------- Menu button (shown below 1180px) ----------
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
  mobileMenu.hidden = !open;
}

menuButton.addEventListener('click', () => setMenu(mobileMenu.hidden));
// Close the menu after tapping a link, or pressing Escape
mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mobileMenu.hidden) setMenu(false); });

// ---------- Custom cake inquiry ----------
const inquiryButton = document.querySelector('.inquiry-toggle');
const inquiryForm = document.getElementById('inquiry-form');

inquiryButton.addEventListener('click', () => {
  inquiryForm.hidden = false;
  inquiryButton.setAttribute('aria-expanded', 'true');
  inquiryButton.hidden = true;
  inquiryForm.querySelector('input').focus();
});

inquiryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(inquiryForm);
  const name = data.get('name').trim();
  const email = data.get('email').trim();
  const occasion = data.get('occasion').trim();
  const message = data.get('message').trim();

  if (!name || !occasion || !message) {
    showMessage(inquiryForm, 'Please fill in every field.', true);
    return;
  }
  if (!EMAIL_PATTERN.test(email)) {
    showMessage(inquiryForm, 'Please enter a valid email address.', true);
    return;
  }

  openEmail(
    'Custom cake inquiry: ' + occasion,
    'Name: ' + name + '\nEmail: ' + email + '\nOccasion and date: ' + occasion + '\n\n' + message
  );
  showMessage(inquiryForm, "Your email app should open with your inquiry ready to send. If it doesn't, email us at " + SHOP_EMAIL + '.', false);
});

// ---------- Newsletter ----------
const newsletterForm = document.querySelector('.newsletter__form');

newsletterForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = newsletterForm.email.value.trim();

  if (!EMAIL_PATTERN.test(email)) {
    showMessage(newsletterForm, 'Please enter a valid email address.', true);
    return;
  }

  if (!NEWSLETTER_ENDPOINT) {
    openEmail('Newsletter signup', 'Please add ' + email + ' to the Cake It Easy newsletter.');
    showMessage(newsletterForm, 'Almost done: send the email that just opened and we\'ll add you.', false);
    return;
  }

  try {
    const res = await fetch(NEWSLETTER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(res.status);
    newsletterForm.reset();
    showMessage(newsletterForm, "You're subscribed. Thanks!", false);
  } catch (err) {
    showMessage(newsletterForm, 'Something went wrong. Please try again in a moment.', true);
  }
});
