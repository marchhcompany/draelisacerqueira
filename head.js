document.documentElement.classList.add('js');

// Google Analytics (GA4) + Google Ads com Consent Mode: cookies só com o "Aceitar".
window.GA_ID = 'G-VWBWQSQR42';
// Google Ads: ID da conta (AW-XXXXXXXXXX) e o rótulo de cada conversão (Ferramentas > Conversões > Configuração da tag).
window.ADS_ID = '';
window.ADS_CONVERSOES = { clique_whatsapp: '', clique_telefone: '' };
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
(function () {
  var aceito = false;
  try { aceito = localStorage.getItem('cookies-estatistica') === 'sim'; } catch (e) {}
  var c = aceito ? 'granted' : 'denied';
  gtag('consent', 'default', {
    ad_storage: c, ad_user_data: c, ad_personalization: c,
    analytics_storage: c
  });
  var temGA = /^G-[A-Z0-9]{6,}$/.test(window.GA_ID);
  var temAds = /^AW-\d{6,}$/.test(window.ADS_ID);
  if (!temGA && !temAds) return;
  gtag('js', new Date());
  if (temGA) gtag('config', window.GA_ID);
  if (temAds) gtag('config', window.ADS_ID);
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + (temGA ? window.GA_ID : window.ADS_ID);
  document.head.appendChild(s);
})();
