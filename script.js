/* Most portfolio content lives in data.js. Edit that file to add projects or update skills. */
const PORTFOLIO = window.JEXURE_DATA || { projects: [], skills: [] };
const PROJECTS = PORTFOLIO.projects || [];
const S = PORTFOLIO.skills || [];

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('[data-go]').forEach(a=>a.addEventListener('click',e=>{const target=document.getElementById(a.dataset.go);if(target){e.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});$('#main-links')?.classList.remove('open');$('#menu-toggle')?.setAttribute('aria-expanded','false')}}));
$('#menu-toggle')?.addEventListener('click',()=>{const menu=$('#main-links'),btn=$('#menu-toggle'),open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu')});
$('#year').textContent=new Date().getFullYear();
// Theme behavior: follow the operating system until the visitor chooses a theme manually.
const themeButton = $('#th');
const themeMedia = window.matchMedia('(prefers-color-scheme: dark)');
const getSavedTheme = () => {
  try { return localStorage.getItem('jexure-theme'); } catch (_) { return null; }
};
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
  if (themeButton) {
    const next = theme === 'dark' ? 'light' : 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${next} theme`);
    themeButton.setAttribute('title', `Switch to ${next} theme`);
  }
};
applyTheme(getSavedTheme() || (themeMedia.matches ? 'dark' : 'light'));
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('jexure-theme', next); } catch (_) { /* Theme still works for this visit. */ }
});
const onSystemThemeChange = event => {
  if (!getSavedTheme()) applyTheme(event.matches ? 'dark' : 'light');
};
if (themeMedia.addEventListener) themeMedia.addEventListener('change', onSystemThemeChange);
else if (themeMedia.addListener) themeMedia.addListener(onSystemThemeChange);
// typing
const roles=['Tech Enthusiast','Web Builder','App Prototyper','Problem Solver'];let ri=0,ci=0,del=0;
(function t(){const w=roles[ri];ci+=del?-1:1;$('#ty').textContent=w.slice(0,ci);let d=del?40:90;
if(!del&&ci===w.length){del=1;d=1400}else if(del&&ci===0){del=0;ri=(ri+1)%roles.length;d=300}setTimeout(t,d)})();
// skills
$('#sk').innerHTML=S.map(s=>`<div class="card rv" data-t="${s.categories.join(' ')}"><div class="ico" style="background:${s.color}">${s.name.slice(0,2)}</div><div class="top">${s.name}<span>${s.level}</span></div><div class="bar"><i data-w="${s.progress}"></i></div></div>`).join('');
$$('[data-f]').forEach(b=>b.onclick=()=>{$$('[data-f]').forEach(x=>x.classList.toggle('on',x===b));$$('#sk .card').forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&!c.dataset.t.split(' ').includes(b.dataset.f)))});
// projects – rendered from the PROJECTS list at the top of this file
$('#pj').innerHTML=PROJECTS.map(p=>`<article class="card rv" data-t="${p.category}"><div class="thumb"><img src="${p.image}" alt="${p.title} preview" loading="lazy" onerror="this.parentNode.classList.add('noimg')"></div><div class="pb"><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>${p.link?`<a class="plink" href="${p.link}" target="_blank" rel="noopener">View project</a>`:''}</div></article>`).join('');
// Stats are derived from data.js, so they update when projects or skills change.
const statValues = {
  projects: PROJECTS.length,
  languages: S.filter(s => s.type === 'language').length,
  skills: S.length,
  learning: S.filter(s => s.level.toLowerCase() === 'learning').length
};
$$('[data-stat]').forEach(el => { el.dataset.n = String(statValues[el.dataset.stat] ?? 0); });

$$('[data-p]').forEach(b=>b.onclick=()=>{$$('[data-p]').forEach(x=>x.classList.toggle('on',x===b));$$('#pj .card').forEach(c=>c.classList.toggle('hide',b.dataset.p!=='all'&&c.dataset.t!==b.dataset.p))});
// glow follows pointer + tilt
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.card');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}});
const fr=$('#fr'),ph=$('.photo');ph.addEventListener('pointermove',e=>{const r=ph.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;fr.style.transform=`rotateY(${x*10}deg) rotateX(${-y*8}deg)`});
ph.addEventListener('pointerleave',()=>fr.style.transform='');
// reveal, bars, counters
const cnt=el=>{const n=+el.dataset.n,d=+el.dataset.d||0,s=el.dataset.s||'';let t0;(function f(t){t0=t0||t;const p=Math.min((t-t0)/1400,1);el.textContent=(n*(1-Math.pow(1-p,3))).toFixed(d)+(p===1?s:'');if(p<1)requestAnimationFrame(f)})(0)};
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;el.classList.add('in');const b=el.querySelector('[data-w]');if(b)b.style.width=b.dataset.w+'%';const n=el.querySelector('[data-n]');if(n)cnt(n);io.unobserve(el)}),{threshold:.2});
$$('.rv').forEach(el=>io.observe(el));$$('.float [data-n]').forEach(cnt);
// nav highlight
const secs=['top','about','skills','projects','contact'].map(id=>document.getElementById(id));
addEventListener('scroll',()=>{let cur=0;secs.forEach((s,i)=>{if(s.getBoundingClientRect().top<200)cur=i});$$('.links a').forEach((a,i)=>a.classList.toggle('on',i===cur))},{passive:true});
// contact
$('#send').onclick=()=>{const name=$('#nm'),email=$('#em'),message=$('#ms'),note=$('#form-note');if(!name.reportValidity()||!email.reportValidity()||!message.reportValidity())return;const subject='Portfolio message from '+name.value;const body=message.value+'\n\nFrom: '+name.value+' ('+email.value+')';const isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);if(isMobile){note.textContent='Opening your email app…';location.href='mailto:jexurecode@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);}else{note.textContent='Opening Gmail in a new tab. Review your message and press Send in Gmail.';const url='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent('jexurecode@gmail.com')+'&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);const win=window.open(url,'_blank','noopener,noreferrer');if(!win){note.textContent='Your browser blocked the new tab. Allow pop-ups for this site, or email jexurecode@gmail.com directly.';}}};
// Lightweight animated network background. Respect reduced-motion and hidden tabs.
const cv=$('#net'),cx=cv.getContext('2d');let W=0,H=0,pts=[],raf=0;
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
function rs(){const dpr=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+'px';cv.style.height=H+'px';cx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(innerWidth<600?28:55,Math.floor(W/(innerWidth<600?24:22)));pts=Array.from({length:count},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28}));}
function dr(){raf=0;if(document.hidden||reduceMotion)return;cx.clearRect(0,0,W,H);for(let i=0;i<pts.length;i++){const p=pts[i];p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+H)%H;cx.fillStyle='#4fd1ff';cx.fillRect(p.x,p.y,2,2);for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){cx.strokeStyle=`rgba(26,123,255,${.28*(1-d/130)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}}raf=requestAnimationFrame(dr)}
function startCanvas(){if(!reduceMotion&&!document.hidden&&!raf)raf=requestAnimationFrame(dr)}
function stopCanvas(){if(raf){cancelAnimationFrame(raf);raf=0}}
rs();addEventListener('resize',()=>{rs();startCanvas()},{passive:true});document.addEventListener('visibilitychange',()=>document.hidden?stopCanvas():startCanvas());startCanvas();
