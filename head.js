document.documentElement.classList.add('js');

// Google Analytics (GA4) com Consent Mode: estatística só com o "Aceitar"; anúncios sempre negados.
window.GA_ID = 'G-VWBWQSQR42';
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
(function () {
  var aceito = false;
  try { aceito = localStorage.getItem('cookies-estatistica') === 'sim'; } catch (e) {}
  gtag('consent', 'default', {
    ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    analytics_storage: aceito ? 'granted' : 'denied'
  });
  if (!/^G-[A-Z0-9]{6,}$/.test(window.GA_ID)) return;
  gtag('js', new Date());
  gtag('config', window.GA_ID);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + window.GA_ID;
  document.head.appendChild(s);
})();
