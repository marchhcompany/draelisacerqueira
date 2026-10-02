'use strict';

document.addEventListener('DOMContentLoaded',()=>{
 if(window.AOS&&!matchMedia('(prefers-reduced-motion: reduce)').matches)AOS.init({duration:700,once:true,offset:45,easing:'ease-out-cubic'});
 document.getElementById('year').textContent=new Date().getFullYear();
 if(!document.getElementById("inicio"))return;
 const message='Olá, gostaria de agendar uma consulta com a Dra. Elisa Cerqueira.';
 document.querySelectorAll('[data-book]').forEach(a=>a.href='https://wa.me/5521994780668?text='+encodeURIComponent(message));
 document.querySelectorAll('[data-service]').forEach(a=>{a.href='https://wa.me/5521994780668?text='+encodeURIComponent('Olá, gostaria de saber sobre '+a.dataset.service+' e agendar uma consulta com a Dra. Elisa Cerqueira.');a.target='_blank';a.rel='noopener'});
 const menu=document.getElementById('menu-toggle'),nav=document.getElementById('nav-links');
 function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu')}
 menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
 const progress=document.getElementById('progress');let ticking=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';ticking=false}addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateProgress);ticking=true}},{passive:true});updateProgress();
 const sticky=document.getElementById('mobile-book'),hero=document.getElementById('hero-book'),loc=document.getElementById('localizacao'),footer=document.getElementById('rodape');let heroVisible=true,locationVisible=false,footerVisible=false;function updateSticky(){sticky.classList.toggle('hidden',heroVisible||locationVisible||footerVisible)}
 new IntersectionObserver(e=>{heroVisible=e[0].isIntersecting;updateSticky()},{threshold:.25}).observe(hero);
 new IntersectionObserver(e=>{locationVisible=e[0].isIntersecting;updateSticky()},{threshold:0}).observe(loc);
 new IntersectionObserver(e=>{footerVisible=e[0].isIntersecting;updateSticky()},{threshold:0}).observe(footer);
 const reveals=document.querySelectorAll('.reveal');if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll(":scope>.reveal").forEach(el=>el.classList.add("in"));io.unobserve(e.target)}}),{threshold:.15});reveals.forEach(el=>{el.style.transitionDelay=(el.dataset.delay||0)+"ms";io.observe(el.parentElement)})}else reveals.forEach(el=>el.classList.add('in'));
 const score=document.querySelector('.review-score strong');if(score&&!matchMedia('(prefers-reduced-motion: reduce)').matches){score.textContent='0,0';new IntersectionObserver((es,o)=>{if(!es[0].isIntersecting)return;o.disconnect();const t0=performance.now();(function tick(t){const p=Math.min(1,(t-t0)/1200),v=5*(1-Math.pow(1-p,3));score.textContent=v.toFixed(1).replace('.',',');if(p<1)requestAnimationFrame(tick)})(t0)},{threshold:.5}).observe(score)}

 const mapFrame=document.querySelector(".map iframe[data-src]"),mapBtn=document.querySelector(".map-load");if(mapFrame){let started=false;const load=()=>{if(started)return;started=true;mapFrame.addEventListener("load",()=>mapBtn&&mapBtn.classList.add("gone"),{once:true});mapFrame.src=mapFrame.dataset.src;mapFrame.removeAttribute("data-src")};if(mapBtn)mapBtn.addEventListener("click",load);"IntersectionObserver" in window?new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();load()}},{rootMargin:"500px 0px"}).observe(mapFrame.parentElement):load()}
 const header=document.querySelector('.header');let scrolled=false;addEventListener('scroll',()=>{const s=scrollY>20;if(s!==scrolled){scrolled=s;header.classList.toggle('scrolled',s)}},{passive:true});
});

// Aviso de cookies (LGPD) e eventos do Analytics — vale para todas as páginas
(function () {
  var CHAVE = 'cookies-estatistica';
  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }
  function aviso() {
    if (document.querySelector('.cookie-banner')) return;
    var b = document.createElement('div');
    b.className = 'cookie-banner';
    b.setAttribute('role', 'region');
    b.setAttribute('aria-label', 'Aviso de cookies');
    b.innerHTML = '<p>Usamos cookies de estatística para entender as visitas e melhorar o site. Veja a <a href="/privacidade.html">política de privacidade</a>.</p>' +
      '<div class="cookie-actions"><button type="button" class="btn btn-line" data-cookie="nao">Recusar</button><button type="button" class="btn btn-dark" data-cookie="sim">Aceitar</button></div>';
    b.addEventListener('click', function (e) {
      var bt = e.target.closest('[data-cookie]');
      if (!bt) return;
      var sim = bt.dataset.cookie === 'sim';
      gravar(sim ? 'sim' : 'nao');
      if (sim && window.gtag) gtag('consent', 'update', { analytics_storage: 'granted' });
      b.remove();
    });
    document.body.appendChild(b);
  }
  function iniciar() {
    if (!ler()) aviso();
    document.querySelectorAll('[data-cookie-reset]').forEach(function (bt) {
      bt.addEventListener('click', function () {
        try { localStorage.removeItem(CHAVE); } catch (e) {}
        if (window.gtag) gtag('consent', 'update', { analytics_storage: 'denied' });
        aviso();
      });
    });
    // Eventos: de qual seção veio o clique
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a || !window.gtag) return;
      var h = a.getAttribute('href'), ev = null;
      if (h.indexOf('wa.me/') > -1) ev = 'clique_whatsapp';
      else if (h.indexOf('tel:') === 0) ev = 'clique_telefone';
      else if (h.indexOf('/maps/dir/') > -1) ev = 'clique_como_chegar';
      else if (h.indexOf('/maps/search/') > -1) ev = 'clique_avaliacoes';
      if (!ev) return;
      var s = a.closest('section[id], header, footer, #mobile-book');
      var secao = !s ? 'outro' : s.id === 'mobile-book' ? 'barra_celular' : s.tagName === 'HEADER' ? 'cabecalho' : s.tagName === 'FOOTER' ? 'rodape' : s.id;
      gtag('event', ev, { secao: secao, link_url: h.split('?')[0] });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar); else iniciar();
})();
