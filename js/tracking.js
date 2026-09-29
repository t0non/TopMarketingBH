/**
 * Tracking Global - Top Marketing BH
 * Este script captura UTMs, classifica a origem e persiste os dados em localStorage e cookies.
 */

(function() {
  const TRACKING_KEY = 'tm_tracking_data';
  const trackedParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'campaign', 'adset', 'ad', 'fbclid', 'gclid'
  ];

  // Helper para ler/gravar cookies
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Gera _fbc se não existir mas existir fbclid
  function setupMetaCookies(urlParams) {
    const fbclid = urlParams.get('fbclid');
    let fbc = getCookie('_fbc');
    let fbp = getCookie('_fbp');

    if (fbclid && !fbc) {
      const timestamp = new Date().getTime();
      fbc = `fb.1.${timestamp}.${fbclid}`;
      setCookie('_fbc', fbc, 90);
    }
    
    // O Meta Pixel nativo gerará _fbp, mas se não existir, preparamos (opcional).
    if (!fbp) {
      const version = 'fb.1.';
      const timestamp = new Date().getTime();
      const random = Math.round(Math.random() * 2147483647);
      fbp = `${version}${timestamp}.${random}`;
      setCookie('_fbp', fbp, 90);
    }
  }

  // Define a origem baseado nas regras
  function defineOrigem(source, fbclid, gclid) {
    const src = (source || '').toLowerCase();
    
    if (src.includes('meta') || src.includes('facebook') || src.includes('instagram') || fbclid) {
      return 'META ADS';
    }
    
    if (src.includes('google') || gclid) {
      return 'GOOGLE ADS';
    }
    
    // Se existir UTM source mas não cair nas regras, retorna o source, caso contrário Orgânico
    return src ? src.toUpperCase() : 'ORGÂNICO';
  }

  function initTracking() {
    const urlParams = new URLSearchParams(window.location.search);
    let currentData = {};
    
    // 1. Tentar recuperar do localStorage ou cookie
    try {
      const stored = localStorage.getItem(TRACKING_KEY) || getCookie(TRACKING_KEY);
      if (stored) {
        currentData = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Erro ao ler tracking data:', e);
    }

    // 2. Atualizar com novos parâmetros da URL
    let hasNewData = false;
    trackedParams.forEach(param => {
      const val = urlParams.get(param);
      if (val) {
        currentData[param] = val;
        hasNewData = true;
      }
    });

    // 3. Atualizar page info (só na primeira visita)
    if (!currentData.first_visit_timestamp) {
      currentData.first_visit_timestamp = new Date().toISOString();
      currentData.landing_page = window.location.href.split('?')[0];
      hasNewData = true;
    }
    currentData.page_url = window.location.href; // Sempre atualiza com a atual

    // 4. Classificar origem (sempre rodar para atualizar caso venha nova UTM)
    const newOrigem = defineOrigem(currentData.utm_source, currentData.fbclid, currentData.gclid);
    if (newOrigem !== 'ORGÂNICO' || !currentData.origem) {
      currentData.origem = newOrigem;
      hasNewData = true;
    }

    // 5. Salvar de volta
    try {
      const dataStr = JSON.stringify(currentData);
      localStorage.setItem(TRACKING_KEY, dataStr);
      setCookie(TRACKING_KEY, dataStr, 90);
    } catch (e) {
      console.warn('Erro ao salvar tracking data:', e);
    }

    // 6. Configurar _fbc e _fbp
    setupMetaCookies(urlParams);
  }

  function fireEvent(eventName, data = {}) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, data);
    }
    if (typeof fbq === 'function') {
      fbq('trackCustom', eventName, data);
    }
    console.log('[Tracking Event]', eventName, data);
  }

  function initFormHandling() {
    const form = document.getElementById('lead-form');
    if (!form) return;

    let currentData = {};
    try {
      const stored = localStorage.getItem(TRACKING_KEY) || getCookie(TRACKING_KEY);
      if (stored) currentData = JSON.parse(stored);
    } catch(e) {}

    // Preenche os campos hidden com dados de tracking
    // Os campos já existem no HTML do formulário multi-step
    const hiddenFields = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'landing_page', 'gbraid', 'wbraid', 'data_hora'];
    
    // Aguarda o DOM estar pronto e preenche os campos
    function fillHiddenFields() {
      hiddenFields.forEach(field => {
        let input = document.getElementById(field);
        if (!input) return;
        if (field === 'data_hora') {
          input.value = new Date().toISOString();
        } else if (currentData[field]) {
          input.value = currentData[field];
        }
      });
    }

    // Preenche imediatamente e também quando o form aparecer
    fillHiddenFields();
    // Observer para quando o form ficar visível
    const observer = new MutationObserver(fillHiddenFields);
    observer.observe(form, { attributes: true, attributeFilter: ['style'] });

    // form_start é disparado pelo botão de início (ms-btn-start-action) via inline
    // form_step é disparado pelo msGoTo via inline

    const selects = form.querySelectorAll('select');
    selects.forEach(select => {
      select.addEventListener('change', (e) => {
        fireEvent('form_step', { step_name: e.target.name, step_value: e.target.value });
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      fireEvent('form_submit');
      
      const btn = document.getElementById('btn-submit');
      const loading = document.getElementById('form-loading');
      
      btn.style.display = 'none';
      if (loading) loading.style.display = 'block';

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      
      payload.fbp = getCookie('_fbp') || '';
      payload.fbc = getCookie('_fbc') || '';
      payload.event_id = 'evt_' + new Date().getTime();
      payload.origem = currentData.origem || 'ORGÂNICO';
      payload.lead_id = 'lead_' + new Date().getTime();

      try {
        const res = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const budget = payload.investimento;
          let msg = "Olá, vim pelo site da Top Marketing. Acabei de preencher a análise da minha empresa.";
          
          if (budget !== "R$500-1.000") {
             fireEvent('qualified_lead', { value: budget });
          }

          if (budget === "R$500-1.000") {
             msg = "Olá, preenchi o formulário no site. Tenho verba inicial e queria entender como funciona.";
          } else if (budget === "R$2.000+") {
             msg = "Olá, preenchi a análise. Quero agendar minha reunião estratégica para escalar meus resultados.";
          }

          fireEvent('whatsapp_click');
          const phone = '553197922538';
          const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
          window.location.href = url;
        } else {
          alert("Ocorreu um erro ao enviar. Por favor, tente novamente ou nos chame no WhatsApp.");
          btn.style.display = 'flex';
          if (loading) loading.style.display = 'none';
        }
      } catch (err) {
        console.error(err);
        alert("Ocorreu um erro na conexão. Por favor, tente novamente.");
        btn.style.display = 'flex';
        if (loading) loading.style.display = 'none';
      }
    });
  }

  // Executar
  initTracking();
  initFormHandling();
})();
