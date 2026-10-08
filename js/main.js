/* ============ KABEYA ILUNGA — interactions ============ */

const WORKS = [
  {file:'genesis.jpg',          title:'Maze Of Blackness I, Genesis', medium:'Acrylics, collage and charcoals on paper',      size:'92 × 86 cm',  year:'2026',      series:'Maze of Blackness', sold:true},
  {file:'red-nails.jpg',        title:'The Red Nails',                medium:'Acrylics and charcoals on paper',                size:'130 × 94 cm', year:'2026',      series:'Maze of Blackness', sold:true},
  {file:'authenticity-i.jpg',   title:'Authenticity I',               medium:'Acrylics and charcoals on paper',                size:'120 × 89 cm', year:'2024',      series:'Afrocentrik'},
  {file:'untitled-i.jpg',       title:'Untitled I',                   medium:'Oil, acrylics and charcoals on paper',           size:'89 × 89 cm',  year:'2025',      series:'Afrocentrik'},
  {file:'feline-look.jpg',      title:'Feline Look',                  medium:'Pastels, acrylics and charcoals on paper',      size:'120 × 89 cm', year:'2024',      series:'Afrocentrik'},
  {file:'dream-blue-sun.jpg',   title:'Dream in a Blue Sun',          medium:'Acrylics and charcoals on paper',                size:'120 × 89 cm', year:'2025',      series:'Afrocentrik'},
  {file:'authenticity-ii.jpg',  title:'Authenticity II',              medium:'Acrylics and charcoals on paper',                size:'120 × 89 cm', year:'2024 to 2025', series:'Afrocentrik'},
  {file:'kuba-legacy.jpg',      title:'Portrait of Kuba Legacy',      medium:'Oil, pastels, acrylics and charcoals on paper',  size:'120 × 89 cm', year:'2025',      series:'Afrocentrik'},
  {file:'matriarchs-grace.jpg', title:"Matriarch's Grace",            medium:'Oil, acrylics and graphite on paper',            size:'120 × 89 cm', year:'2025',      series:'Afrocentrik'},
  {file:'transmission.jpg',     title:'Transmission',                 medium:'Acrylics and graphite on paper',                 size:'70 × 90 cm',  year:'2026',      series:'Maze of Blackness'},
  {file:'crown-continuity.jpg', title:'Crown Of Continuity',          medium:'Acrylics and graphite on paper',                 size:'120 × 89 cm', year:'2026',      series:'Afrocentrik'},
];

/* ---------- works grid ---------- */
const grid = document.getElementById('grid');
let visibleWorks = WORKS.slice();

function renderGrid(){
  if(!grid) return;
  grid.innerHTML = '';
  visibleWorks.forEach((w, i) => {
    const el = document.createElement('article');
    el.className = 'card rv in';
    el.innerHTML =
      '<span class="tag">' + w.series + '</span>' +
      '<button class="card-preview" type="button" aria-label="View ' + w.title + ' large">' +
        '<div class="ph"><img loading="lazy" src="images/works/' + w.file + '" alt="' + w.title + ', Kabeya Ilunga"></div>' +
        '<span class="cap"><span class="card-title">' + w.title + '</span><span class="card-caption">' + w.year + ' · ' + w.size + '</span>' + (w.sold ? '<span class="sold-status">SOLD</span>' : '') + '</span>' +
      '</button>' +
      '<a class="card-detail" href="work.html?work=' + encodeURIComponent(w.file) + '">' + w.title + ' · View details <span aria-hidden="true">→</span></a>';
    el.querySelector('.card-preview').addEventListener('click', event => openLB(i, event.currentTarget));
    grid.appendChild(el);
  });
}

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => {
      b.classList.remove('on');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('on');
    btn.setAttribute('aria-pressed', 'true');
    const f = btn.dataset.f;
    visibleWorks = f === 'all' ? WORKS.slice() : WORKS.filter(w => w.series === f);
    renderGrid();
  });
});

/* ---------- lightbox ---------- */
const lb = document.getElementById('lb');
let lbIndex = 0;
let lastFocused = null;

function openLB(i, opener){
  lbIndex = i;
  lastFocused = opener;
  fillLB();
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lbX').focus();
}
function closeLB(){
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if(lastFocused) lastFocused.focus();
}
function fillLB(){
  const w = visibleWorks[lbIndex];
  const enquireLink = document.getElementById('enquire-link');
  document.getElementById('lbImg').src = 'images/works/' + w.file;
  document.getElementById('lbImg').alt = w.title + ', Kabeya Ilunga';
  document.getElementById('lbTitle').textContent = w.title;
  document.getElementById('lbMedium').textContent = w.medium;
  document.getElementById('lbSize').textContent = w.size;
  document.getElementById('lbYear').textContent = w.year;
  document.getElementById('lbSeries').textContent = w.series;
  if(enquireLink) enquireLink.href = 'contact.html?work=' + encodeURIComponent(w.title);
}
function stepLB(d){
  lbIndex = (lbIndex + d + visibleWorks.length) % visibleWorks.length;
  fillLB();
}

if(lb){
  document.getElementById('lbX').addEventListener('click', closeLB);
  document.getElementById('lbPrev').addEventListener('click', e => { e.stopPropagation(); stepLB(-1); });
  document.getElementById('lbNext').addEventListener('click', e => { e.stopPropagation(); stepLB(1); });
  lb.addEventListener('click', e => { if(e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') closeLB();
    if(e.key === 'ArrowLeft') stepLB(-1);
    if(e.key === 'ArrowRight') stepLB(1);
    if(e.key === 'Tab'){
      const focusable = Array.from(lb.querySelectorAll('a[href],button:not([disabled])'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });
}

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ---------- mobile nav ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if(burger){
  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menu');
    burger.querySelector('i').className = 'bx bx-menu';
  };
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Menu');
    burger.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && navLinks.classList.contains('open')){
      closeMenu();
      burger.focus();
    }
  });
}

/* ---------- desktop pointer ambience ---------- */
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const reducedMotionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if(finePointer.matches && !reducedMotionPreference.matches){
  const pointerGlow = document.createElement('div');
  pointerGlow.className = 'pointer-glow';
  pointerGlow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(pointerGlow);

  document.addEventListener('pointermove', event => {
    pointerGlow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    pointerGlow.classList.add('is-visible');
  });
  document.documentElement.addEventListener('pointerleave', () => pointerGlow.classList.remove('is-visible'));
}

/* ---------- init ---------- */
renderGrid();

/* ---------- artwork detail page ---------- */
const workDetail = document.getElementById('work-detail');
if(workDetail){
  const file = new URLSearchParams(window.location.search).get('work');
  const work = WORKS.find(item => item.file === file);
  const notFound = document.getElementById('work-not-found');

  if(work){
    document.title = work.title + ' | Kabeya Ilunga';
    document.getElementById('work-detail-image').src = 'images/works/' + work.file;
    document.getElementById('work-detail-image').alt = work.title + ', artwork by Kabeya Ilunga';
    document.getElementById('work-detail-title').textContent = work.title;
    document.getElementById('work-detail-series').textContent = work.series;
    document.getElementById('work-detail-medium').textContent = work.medium;
    document.getElementById('work-detail-size').textContent = work.size;
    document.getElementById('work-detail-year').textContent = work.year;
    document.getElementById('work-detail-availability').textContent = work.sold ? 'Sold' : 'Please enquire';
    document.getElementById('work-detail-enquire').href = 'contact.html?work=' + encodeURIComponent(work.title);
    document.getElementById('work-detail-content').hidden = false;
    document.getElementById('work-detail-meta').content = work.title + ', ' + work.series + ' by Kabeya Ilunga.';
  }else{
    notFound.hidden = false;
  }
}

/* ---------- contact form ---------- */
const contactForm = document.getElementById('contact-form');
if(contactForm){
  const formStatus = document.getElementById('form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const enquiryWork = new URLSearchParams(window.location.search).get('work');

  if(enquiryWork){
    const workTitle = enquiryWork.slice(0, 120);
    contactForm.elements.subject.value = 'Enquiry about ' + workTitle;
    contactForm.elements.message.value = 'Hello, I would like to know more about "' + workTitle + '".';
    contactForm.elements._subject.value = 'Artwork enquiry: ' + workTitle;
  }

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(contactForm).entries());
    payload._replyto = payload.email;
    submitButton.disabled = true;
    formStatus.textContent = 'Sending your message...';

    try{
      const response = await fetch('https://formsubmit.co/ajax/studio@kabeyailunga.com', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if(!response.ok || (result.success !== true && result.success !== 'true')){
        throw new Error(result.message || 'The message could not be sent.');
      }
      contactForm.reset();
      formStatus.textContent = 'Thank you for reaching out. Your message has been sent to the artist, and we look forward to speaking with you.';
    }catch(error){
      const mailtoData = new URLSearchParams({
        subject: payload.subject || 'Website enquiry',
        body: 'Name: ' + payload.name + '\nEmail: ' + payload.email + '\n\n' + payload.message
      });
      const emailLink = document.createElement('a');
      emailLink.href = 'mailto:studio@kabeyailunga.com?' + mailtoData.toString();
      emailLink.textContent = 'send it by email instead';
      formStatus.replaceChildren(
        document.createTextNode('The online form is unavailable. '),
        emailLink,
        document.createTextNode('.')
      );
    }finally{
      submitButton.disabled = false;
    }
  });
}

/* ---------- About portrait viewer ---------- */
const photoTrigger = document.querySelector('.about-photo-trigger');
const photoDialog = document.getElementById('about-photo-dialog');
if(photoTrigger && photoDialog){
  const dialogImage = photoDialog.querySelector('.photo-dialog-image');

  photoTrigger.addEventListener('click', event => {
    event.preventDefault();
    dialogImage.src = photoTrigger.href;
    dialogImage.alt = photoTrigger.querySelector('img').alt;
    photoDialog.showModal();
  });
  photoDialog.addEventListener('click', event => {
    if(event.target === photoDialog) photoDialog.close();
  });
  photoDialog.addEventListener('keydown', event => {
    if(event.key === 'Escape'){
      event.preventDefault();
      photoDialog.close();
    }
  });
  photoDialog.addEventListener('close', () => dialogImage.removeAttribute('src'));
}

/* ---------- privacy and analytics consent ---------- */
const consentKey = 'kabeya-analytics-consent';
const consentBanner = document.createElement('aside');
consentBanner.className = 'cookie-banner';
consentBanner.setAttribute('aria-label', 'Privacy and cookie choices');
consentBanner.hidden = true;
consentBanner.innerHTML = `
  <div class="cookie-banner-copy">
    <p class="cookie-banner-title">Your privacy matters</p>
    <p>Analytics is optional and stays off unless you allow it. Essential storage remembers your choice.</p>
    <a href="privacy.html">Read the privacy notice</a>
  </div>
  <div class="cookie-banner-actions">
    <button type="button" data-cookie-choice="reject">Reject optional</button>
    <button type="button" data-cookie-preferences-toggle aria-expanded="false">Preferences</button>
    <button type="button" data-cookie-choice="accept">Accept analytics</button>
  </div>
  <div class="cookie-preferences" hidden>
    <label><input type="checkbox" checked disabled> Essential storage <span>Always active</span></label>
    <label><input type="checkbox" data-analytics-choice> Analytics <span>Google Analytics</span></label>
    <button type="button" data-cookie-save>Save my choices</button>
  </div>`;
document.body.appendChild(consentBanner);

const analyticsConsent = consentBanner.querySelector('[data-analytics-choice]');
const preferencePanel = consentBanner.querySelector('.cookie-preferences');
const preferenceToggle = consentBanner.querySelector('[data-cookie-preferences-toggle]');

function readAnalyticsConsent(){
  try{
    return localStorage.getItem(consentKey);
  }catch(error){
    return null;
  }
}

function applyAnalyticsConsent(allowed){
  if(!allowed && window.kabeyaAnalyticsLoaded){
    window.gtag('consent', 'update', {analytics_storage: 'denied'});
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if(name.startsWith('_ga')){
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      }
    });
    return;
  }

  if(!allowed || window.kabeyaAnalyticsLoaded) return;

  window.kabeyaAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
  window.gtag('consent', 'update', {analytics_storage: 'granted'});
  window.gtag('js', new Date());
  window.gtag('config', 'G-JLCZ047PFZ');

  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-JLCZ047PFZ';
  document.head.appendChild(analyticsScript);
}

function saveAnalyticsChoice(allowed){
  try{
    localStorage.setItem(consentKey, allowed ? 'accepted' : 'rejected');
  }catch(error){
    // Keep the choice for this visit even if browser storage is unavailable.
  }
  analyticsConsent.checked = allowed;
  consentBanner.hidden = true;
  applyAnalyticsConsent(allowed);
}

consentBanner.querySelectorAll('[data-cookie-choice]').forEach(button => {
  button.addEventListener('click', () => saveAnalyticsChoice(button.dataset.cookieChoice === 'accept'));
});
preferenceToggle.addEventListener('click', () => {
  const isOpen = preferencePanel.hidden;
  preferencePanel.hidden = !isOpen;
  preferenceToggle.setAttribute('aria-expanded', String(isOpen));
  analyticsConsent.checked = readAnalyticsConsent() === 'accepted';
});
consentBanner.querySelector('[data-cookie-save]').addEventListener('click', () => {
  saveAnalyticsChoice(analyticsConsent.checked);
});

const savedAnalyticsConsent = readAnalyticsConsent();
if(savedAnalyticsConsent === 'accepted') applyAnalyticsConsent(true);
else if(savedAnalyticsConsent !== 'rejected') consentBanner.hidden = false;

const privacyButton = document.createElement('button');
privacyButton.type = 'button';
privacyButton.className = 'cookie-settings-link';
privacyButton.textContent = 'Privacy and cookies';
privacyButton.addEventListener('click', () => {
  consentBanner.hidden = false;
  preferencePanel.hidden = false;
  preferenceToggle.setAttribute('aria-expanded', 'true');
  analyticsConsent.checked = readAnalyticsConsent() === 'accepted';
  consentBanner.scrollIntoView({block: 'end', behavior: 'smooth'});
});
const copyright = document.querySelector('footer .copy');
if(copyright){
  copyright.append(document.createTextNode(' '), privacyButton);
}
