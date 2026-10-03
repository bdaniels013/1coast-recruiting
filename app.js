'use strict';
const $ = (selector) => document.querySelector(selector);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = $('.site-header');
const menuButton = $('.menu-toggle');
const mobileMenu = $('#mobile-menu');
function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); menuButton.blur(); } });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if(event.matches) closeMenu(); });
let scrollFrame = 0;
function updateScroll() {
  scrollFrame = 0;
  const y = window.scrollY;
  const total = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  header.classList.toggle('scrolled', y > 40);
  $('.journey-indicator').classList.toggle('visible', y > innerHeight * .5);
  $('#journey-progress').style.height = `${Math.min(100, y / total * 100)}%`;
  if (!reducedMotion.matches) {
    const image = $('.hero-image');
    image.style.transform = `translateY(${Math.min(y * .16, innerHeight * .16)}px) scale(1.025)`;
    const anchor = $('#anchor').getBoundingClientRect();
    $('#anchor').style.setProperty('--anchor-drop', Math.max(0, Math.min(1, (innerHeight - anchor.top) / (innerHeight + anchor.height))));
  }
  let chapter = document.querySelector('.chapter');
  for (const section of document.querySelectorAll('.chapter')) {
    if(section.getBoundingClientRect().top < innerHeight * .5) chapter = section;
  }
  $('#journey-label').textContent = chapter.dataset.chapter;
}
window.addEventListener('scroll', () => { if(!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
window.addEventListener('resize', updateScroll, {passive:true});
updateScroll();
// A sparse, subtle star field. The content never depends on Canvas or WebGL.
try {
  const canvas = $('#stars');
  const ctx = canvas.getContext('2d');
  if(ctx) {
    function drawStars() {
      const width = canvas.clientWidth, height = canvas.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * dpr; canvas.height = height * dpr;
      ctx.scale(dpr,dpr); ctx.clearRect(0,0,width,height);
      let seed = 42;
      const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      for(let i=0;i<80;i++) {
        const x = random() * width, y = random() * height;
        ctx.fillStyle = `rgba(210,228,236,${.15 + random()*.4})`;
        ctx.beginPath(); ctx.arc(x,y,.25 + random()*.7,0,Math.PI*2); ctx.fill();
      }
    }
    drawStars(); window.addEventListener('resize', drawStars, {passive:true});
  }
} catch (_) { /* Static photography and all content remain available. */ }
const beats = [
  {kicker:'Self as the source',title:'I give until\nI run out.',copy:'When I ask my own strength to sustain everything, even good intentions can leave me empty.',verse:'John 15:5'},
  {kicker:'Empty, and taking',title:'Empty, I start\ntaking.',copy:'Exhaustion can turn service into a demand. I begin asking the people around me to fill what they cannot sustain.',verse:'Matthew 11:28'},
  {kicker:'Jesus as the source',title:'Receive before\nyou pour.',copy:'Jesus invites us to abide in Him. We receive His grace and learn to serve from dependence, rather than self-sufficiency.',verse:'John 15:5'},
  {kicker:'He was there first',title:'He is already\nat work.',copy:'The people around us are never just projects. God is at work in their lives before we arrive. Our part begins with listening.',verse:'John 6:44'},
  {kicker:'Sent to carry it',title:'Carry what\nyou receive.',copy:'We go with humility, share the good news, and offer what we have been given. The outcome belongs to Him.',verse:'Matthew 28:19'},
  {kicker:'Iron sharpens iron',title:'Strengthened\ntogether.',copy:'We need people who speak truth with love. Prayer, accountability, and presence help us keep growing in faith.',verse:'Proverbs 27:17'},
  {kicker:'Filled together',title:'One source.\nMany lives.',copy:'Each person remains rooted in Christ. Together, what we receive becomes service, discipleship, and love that reaches beyond us.',verse:'John 7:38'}
];
let activeBeat = 0, playTimer = null;
const visual = $('.source-visual');
function showBeat(index, announce = true) {
  activeBeat = Math.max(0, Math.min(beats.length-1, index));
  const beat = beats[activeBeat];
  $('#beat-number').textContent = String(activeBeat+1).padStart(2,'0');
  $('#beat-kicker').textContent = beat.kicker;
  $('#beat-title').replaceChildren();
  beat.title.split('\n').forEach((line,i) => { if(i) $('#beat-title').append(document.createElement('br')); $('#beat-title').append(document.createTextNode(line)); });
  $('#beat-copy').textContent = beat.copy; $('#beat-verse').textContent = beat.verse;
  visual.dataset.scene = activeBeat;
  visual.classList.toggle('flowing', activeBeat >= 2 && !reducedMotion.matches);
  $('.visual-index').textContent = `${String(activeBeat+1).padStart(2,'0')} — 07`;
  document.querySelectorAll('[data-beat]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.beat) === activeBeat)));
  $('#next-beat').innerHTML = activeBeat === 6 ? 'Start again <span aria-hidden="true">↺</span>' : 'Next chapter <span aria-hidden="true">→</span>';
  if(announce) $('#beat-status').textContent = `Chapter ${activeBeat+1} of 7. ${beat.kicker}. ${beat.title.replace('\n',' ')} ${beat.copy}`;
}
function stopStory() { clearInterval(playTimer); playTimer=null; $('#play-story').innerHTML='<span aria-hidden="true">▷</span> Play the story'; }
document.querySelectorAll('[data-beat]').forEach(button => button.addEventListener('click', () => { stopStory(); showBeat(Number(button.dataset.beat)); }));
$('#next-beat').addEventListener('click', () => {stopStory();showBeat((activeBeat+1)%7);});
$('#play-story').addEventListener('click', () => {
  if(playTimer) { stopStory(); return; }
  if(activeBeat === 6) showBeat(0);
  $('#play-story').innerHTML='<span aria-hidden="true">Ⅱ</span> Pause the story';
  playTimer = setInterval(() => { if(activeBeat === 6) {stopStory();return;} showBeat(activeBeat+1,false); },6500);
});
document.addEventListener('visibilitychange', () => {if(document.hidden) stopStory();});
if('IntersectionObserver' in window) new IntersectionObserver(entries => { if(!entries[0].isIntersecting) stopStory(); },{threshold:.1}).observe($('.source-experience'));
reducedMotion.addEventListener('change', () => {stopStory();showBeat(activeBeat,false);updateScroll();});
showBeat(0,false);
// With no configured destination, prepare a local note and never imply delivery.
const config = window.ANCHOR_CONFIG || {};
$('#submit-intro').disabled = false;
let introDraft = '';
if(config.formEndpoint || config.contactEmail) {
  $('#submit-intro').innerHTML = 'Start the conversation <span aria-hidden="true">↗</span>';
  $('#delivery-note').textContent = config.formEndpoint ? 'Your introduction will be sent to Anchor. Share only what you are comfortable sending.' : 'Your email app will open so you can review and send your introduction.';
}
$('#intro-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if(!form.reportValidity()) return;
  const values = Object.fromEntries(new FormData(form));
  introDraft = `ANCHOR — An introduction\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\nCalling: ${values.interest || 'Still discerning'}\n\n${values.note.trim() || 'I would like to learn more and start a conversation.'}\n`;
  $('#form-result').hidden=false;
  const status=$('#form-status'), submit=$('#submit-intro');
  if(config.formEndpoint) {
    submit.disabled=true;status.textContent='Sending your introduction…';
    try {
      const endpoint=new URL(config.formEndpoint,location.href);
      if(endpoint.protocol!=='https:' && endpoint.origin!==location.origin) throw new Error('HTTPS is required.');
      const response=await fetch(endpoint.href,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(values)});
      if(!response.ok) throw new Error('Submission failed.');
      status.textContent='Your introduction was sent. Thank you for reaching out.';
    } catch (_) {status.textContent='Your introduction could not be sent. Download or copy it below so you can share it directly.';}
    finally {submit.disabled=false;}
  } else if(config.contactEmail) {
    const mailLink = document.createElement('a');
    mailLink.href=`mailto:${encodeURIComponent(config.contactEmail)}?subject=${encodeURIComponent('ANCHOR — An introduction')}&body=${encodeURIComponent(introDraft)}`;
    mailLink.click();status.textContent='Your introduction is ready. Review and send it in your email app, or download it below. It has not been sent by this page.';
  } else {status.textContent='Your introduction is ready. Download or copy it to share with Blake. Nothing has been sent.';}
});
$('#download-intro').addEventListener('click', () => {
  if(!introDraft) return;
  const url=URL.createObjectURL(new Blob([introDraft],{type:'text/plain;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download='anchor-introduction.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
$('#copy-intro').addEventListener('click', async () => {
  try {await navigator.clipboard.writeText(introDraft);$('#copy-intro').textContent='Copied ✓';}
  catch (_) {$('#form-status').textContent='Clipboard access is unavailable. Download your note instead.';}
});
