// Progressive enhancement for navigation and the graphics-unavailable fallback.
// All photography on graphics-capable browsers lives in the Three.js scene.
function enhanceJourney() {
  const site = document.querySelector('.site');
  if (!site || site.dataset.journeyEnhanced) return !!site;
  site.dataset.journeyEnhanced = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = [
    {id:'top',name:'Orbit'},{id:'calling',name:'The calling'},
    {id:'coast',name:'Stewardship'},{id:'life',name:'The life'},
    {id:'anchor',name:'The anchor'},{id:'heart',name:'The heart'},
    {id:'rise',name:'All of it'},{id:'shore',name:'The shore'}
  ];
  const skip = document.createElement('a');
  skip.href = '#coast'; skip.className = 'experience-skip mono';
  skip.textContent = 'Skip to the story'; site.prepend(skip);
  skip.addEventListener('click', event => {
    const target = document.querySelector('#coast');
    if (window.__journey?.scrollTo) {
      event.preventDefault(); window.__journey.scrollTo(target, {immediate: true});
    }
    const heading = document.querySelector('#coast-h');
    heading.setAttribute('tabindex', '-1'); heading.focus({preventScroll: true});
  });

  const next = document.createElement('a');
  next.className = 'chapter-next';
  next.innerHTML = '<span class="mono chapter-current"></span><span class="chapter-arrow" aria-hidden="true">↓</span>';
  site.append(next);
  next.addEventListener('click', event => {
    const target = document.querySelector(next.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (window.__journey?.scrollTo) window.__journey.scrollTo(target);
    else target.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth'});
  });
  let pending = 0;
  function smooth(a,b,value) {
    const t = Math.max(0,Math.min(1,(value-a)/(b-a))); return t*t*(3-2*t);
  }
  function update() {
    pending = 0;
    let index = 0;
    chapters.forEach(({id},i) => {
      if (document.getElementById(id).getBoundingClientRect().top < innerHeight*.42) index=i;
    });
    const chapter = chapters[index+1];
    next.href = `#${chapter ? chapter.id : 'top'}`;
    next.setAttribute('aria-label', chapter ? `Continue to ${chapter.name}` : 'Back to the beginning');
    next.querySelector('.chapter-current').textContent = `${String(index+1).padStart(2,'0')} / ${chapters[index].name}`;
    next.querySelector('.chapter-arrow').textContent = chapter ? '↓' : '↑';
    const stage = document.querySelector('.stage');
    next.classList.toggle('chapter-hide', !!stage && stage.getBoundingClientRect().top < innerHeight && stage.getBoundingClientRect().bottom > 0);

    const fallback = document.querySelector('.scene-fallback');
    if (!fallback) return;
    const phase = window.__journey?.get() || 0;
    const coast = smooth(2.1,3.2,phase)*(1-smooth(4.7,5.1,phase));
    const family = smooth(4.7,5.1,phase)*(1-smooth(5.6,6,phase));
    const work = smooth(10.1,10.5,phase);
    const deep = smooth(6.5,7.5,phase)*(1-smooth(9.5,10.3,phase));
    fallback.style.setProperty('--coast', coast);
    fallback.style.setProperty('--family', family);
    fallback.style.setProperty('--work', work);
    fallback.style.setProperty('--deep', deep);
    fallback.style.setProperty('--sky', 1-smooth(2,3,phase));
    fallback.style.setProperty('--float', reduced.matches ? '0px' : `${Math.sin(scrollY*.00045)*22}px`);
  }
  addEventListener('scroll', () => { if(!pending) pending=requestAnimationFrame(update); }, {passive:true});
  addEventListener('resize', update, {passive:true});
  update();
  setTimeout(update, 1000);
  return true;
}
if (!enhanceJourney()) {
  const observer = new MutationObserver(() => { if(enhanceJourney()) observer.disconnect(); });
  observer.observe(document.getElementById('root'), {childList:true,subtree:true});
  setTimeout(() => observer.disconnect(),15000);
}
