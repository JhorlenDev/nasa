// Internacionalização, Localização e Alerta de Máscara
(function(){
  const i18n = {
    pt: {
      app_title: 'Tefé Climate Alert',
      change_city: 'Alterar cidade',
      nav_home: 'Início',
      nav_alerts: 'Alertas',
      nav_forecast: 'Previsão',
      satellite_title: '🛰️ Dados de Satélite NASA',
      emergency_btn: '🚑 CONTATOS DE EMERGÊNCIA',
      mask_alert: 'Qualidade do ar ruim: Use máscara',
      default_banner_tefe: '🚨 ALERTA: Nível do Rio Solimões em elevação - Risco de enchente',
      default_banner_manaus: '🚨 ALERTA: Nível do Rio Negro em elevação - Risco de enchente',
      just_now: 'Agora mesmo',
      minutes_ago: (m)=> `Há ${m} min`,
      cards: {
        temperature: '🌡️ Temperatura',
        river: '🛶 Nível do Rio',
        humidity: '💧 Umidade',
        rainfall: '🌧️ Precipitação',
        sub: {
          temp: 'Calor extremo - Evite exposição prolongada',
          river: 'Acima do normal - Monitoramento ativo',
          humidity: 'Dentro dos parâmetros normais',
          rainfall_low: 'Baixa - Risco de seca prolongada'
        }
      },
      satellite_labels: ['LANDSAT 8/9:', 'MODIS Terra:', 'SMAP:', 'Última atualização:'],
      notifications_samples: [
        '🔥 Alerta de Calor Extremo: Temperatura atingiu 38°C. Evite atividades ao ar livre entre 10h-16h.',
        '🌊 Monitoramento do Rio: Nível do Rio Solimões subiu 0.5m nas últimas 24h. Comunidades ribeirinhas em alerta.',
        '🛰️ Dados MODIS: Detecção de focos de calor a 15km de Tefé. Bombeiros acionados.',
        '🌧️ Previsão Seca: Sem chuvas previstas para os próximos 7 dias. Economize água.',
        '🌱 SMAP Update: Umidade do solo em declínio. Agricultores devem intensificar irrigação.'
      ],
      emergency_popup: `CONTATOS DE EMERGÊNCIA - TEFÉ\n\nBombeiros: 193\nSAMU: 192\nPolícia: 190\nDefesa Civil: (97) 3343-2156\nHospital Regional: (97) 3343-2274\nRádio Comunitária: (97) 3343-2089\n\nEm caso de enchente, procure abrigos em terrenos elevados.\nEm caso de calor extremo, mantenha-se hidratado.`
    },
    en: {
      app_title: 'Tefé Climate Alert',
      change_city: 'Change city',
      nav_home: 'Home',
      nav_alerts: 'Alerts',
      nav_forecast: 'Forecast',
      satellite_title: '🛰️ NASA Satellite Data',
      emergency_btn: '🚑 EMERGENCY CONTACTS',
      mask_alert: 'Poor air quality: Wear a mask',
      default_banner_tefe: '🚨 ALERT: Solimões River level rising - Flood risk',
      default_banner_manaus: '🚨 ALERT: Negro River level rising - Flood risk',
      just_now: 'Just now',
      minutes_ago: (m)=> `${m} min ago`,
      cards: {
        temperature: '🌡️ Temperature',
        river: '🛶 River Level',
        humidity: '💧 Humidity',
        rainfall: '🌧️ Rainfall',
        sub: {
          temp: 'Extreme heat - Avoid prolonged exposure',
          river: 'Above normal - Active monitoring',
          humidity: 'Within normal range',
          rainfall_low: 'Low - Risk of prolonged drought'
        }
      },
      satellite_labels: ['LANDSAT 8/9:', 'MODIS Terra:', 'SMAP:', 'Last update:'],
      notifications_samples: [
        '🔥 Extreme Heat Alert: Temperature reached 38°C. Avoid outdoor activities between 10am-4pm.',
        '🌊 River Monitoring: Solimões River level rose 0.5m in the last 24h. Riverside communities on alert.',
        '🛰️ MODIS Data: Heat sources detected 15km from Tefé. Firefighters alerted.',
        '🌧️ Dry Forecast: No rain expected for the next 7 days. Save water.',
        '🌱 SMAP Update: Soil moisture declining. Farmers should intensify irrigation.'
      ],
      emergency_popup: `EMERGENCY CONTACTS - TEFÉ\n\nFire Department: 193\nEMS: 192\nPolice: 190\nCivil Defense: (97) 3343-2156\nRegional Hospital: (97) 3343-2274\nCommunity Radio: (97) 3343-2089\n\nIn case of flooding, seek shelters on higher ground.\nIn case of extreme heat, stay hydrated.`
    }
  };

  window.__i18n = i18n;
  window.currentLang = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'pt';
  window.currentCity = (typeof localStorage !== 'undefined' && localStorage.getItem('city')) || 'Tefé, Amazonas - Brasil';

  function setLanguage(lang){
    window.currentLang = (lang === 'en') ? 'en' : 'pt';
    try { localStorage.setItem('lang', window.currentLang); } catch {}
    applyTranslations();
  }
  function defaultBannerFor(city, lang){
    const dict = i18n[lang||window.currentLang];
    const isManaus = /Manaus/i.test(city||window.currentCity);
    return isManaus ? dict.default_banner_manaus : dict.default_banner_tefe;
  }

  function applyTranslations(){
    const dict = i18n[window.currentLang];
    const titleEl = document.querySelector('.header h1');
    if (titleEl) titleEl.textContent = dict.app_title;
    const banner = document.getElementById('alertBanner');
    if (banner) banner.textContent = defaultBannerFor(window.currentCity);
    const lastUpd = document.getElementById('lastUpdate');
    if (lastUpd) lastUpd.textContent = dict.just_now;
    const navLabels = document.querySelectorAll('.bottom-nav .nav-item .nav-label');
    if (navLabels && navLabels.length >= 3) {
      navLabels[0].textContent = dict.nav_home;
      navLabels[1].textContent = dict.nav_alerts;
      navLabels[2].textContent = dict.nav_forecast;
    }
    const satTitle = document.querySelector('.satellite-title');
    if (satTitle) satTitle.textContent = dict.satellite_title;
    // Ajustar valores dos itens de satélite (segundo span)
    const satValueSpans = Array.from(document.querySelectorAll('.satellite-item span:last-child'));
    if (satValueSpans[0]) satValueSpans[0].textContent = (window.currentLang==='en') ? 'Vegetation cover: 67%' : 'Cobertura vegetal: 67%';
    if (satValueSpans[1]) satValueSpans[1].textContent = (window.currentLang==='en') ? 'Surface temperature: 35.2°C' : 'Temperatura superfície: 35.2°C';
    if (satValueSpans[2]) satValueSpans[2].textContent = (window.currentLang==='en') ? 'Soil moisture: 23%' : 'Umidade do solo: 23%';
    const emergBtn = document.querySelector('.emergency-btn');
    if (emergBtn) emergBtn.textContent = dict.emergency_btn;
    const changeCitySpan = document.querySelector('.location-btn [data-i18n="change_city"]');
    if (changeCitySpan) changeCitySpan.textContent = dict.change_city;
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = window.currentLang;

    // Cartões principais: títulos e subtítulos
    const cardTitles = Array.from(document.querySelectorAll('.status-card .card-title'));
    if (cardTitles.length >= 4){
      cardTitles[0].textContent = dict.cards.temperature;
      cardTitles[1].textContent = dict.cards.river;
      cardTitles[2].textContent = dict.cards.humidity;
      cardTitles[3].textContent = dict.cards.rainfall;
    }
    const cardSub = Array.from(document.querySelectorAll('.status-card .card-subtitle'));
    if (cardSub.length >= 4){
      cardSub[0].textContent = dict.cards.sub.temp;
      cardSub[1].textContent = dict.cards.sub.river;
      cardSub[2].textContent = dict.cards.sub.humidity;
      cardSub[3].textContent = dict.cards.sub.rainfall_low;
    }

    // Labels dos itens de satélite (primeiro span de cada .satellite-item)
    const satItems = Array.from(document.querySelectorAll('.satellite-item span:first-child'));
    dict.satellite_labels.forEach((txt, i)=>{ if (satItems[i]) satItems[i].textContent = txt; });

    // Notificações exemplo: se existirem, reescreve o texto
    const notifTexts = Array.from(document.querySelectorAll('#notificationsScreen .notification .notification-text'));
    dict.notifications_samples.forEach((txt,i)=>{ if (notifTexts[i]) notifTexts[i].innerHTML = txt; });

    // Previsão: título, nomes de dias e descrições comuns
    const forecastHeader = document.querySelector('#forecastScreen h3');
    if (forecastHeader){
      forecastHeader.textContent = (window.currentLang==='en') ? '7-Day Forecast' : 'Previsão 7 Dias';
    }
    const dayMap = window.currentLang === 'en' ? ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] : ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
    const forecastItems = Array.from(document.querySelectorAll('#forecastScreen .forecast-item'));
    forecastItems.forEach((it)=>{
      const day = it.querySelector('.forecast-day');
      const desc = it.querySelector('.forecast-desc');
      if (day){
        const v = day.textContent.trim().toLowerCase();
        if (window.currentLang==='en'){
          if (v.includes('hoje')) day.textContent = 'Today';
          else if (v.includes('amanhã') || v.includes('amanha')) day.textContent = 'Tomorrow';
          else {
            const idx = ['segunda','terça','terça-feira','quarta','quinta','sexta','sábado','sabado','domingo'].findIndex(d=> v.includes(d));
            if (idx>=0){
              const mapIdx = [0,1,1,2,3,4,5,5,6][idx];
              day.textContent = dayMap[mapIdx];
            }
          }
        } else {
          // retornar a PT não é necessário aqui; mantemos o texto existente
        }
      }
      if (desc){
        let t = desc.textContent.trim().toLowerCase();
        if (window.currentLang==='en'){
          if (t.includes('ensolarado')||t.includes('sol e calor')||t.includes('sol intenso')) desc.textContent='Sunny and hot';
          else if (t.includes('parcialmente nublado')) desc.textContent='Partly cloudy';
          else if (t.includes('possível chuva')||t.includes('chuva')) desc.textContent='Possible rain';
          else if (t.includes('nublado')) desc.textContent='Cloudy';
          else if (t.includes('chuvas isoladas')) desc.textContent='Isolated showers';
          else if (t.includes('muito quente')) desc.textContent='Very hot';
        }
      }
    });
  }
  function updateLocationDisplay(){
    const el = document.getElementById('locationDisplay') || document.querySelector('.location');
    if (el) el.textContent = `📍 ${window.currentCity}`;
    // Atualiza banner default conforme cidade
    const banner = document.getElementById('alertBanner');
    if (banner) banner.textContent = defaultBannerFor(window.currentCity);
  }
  function onCitySelect(value){
    // Restringe às opções fornecidas
    window.currentCity = /Manaus/i.test(value) ? 'Manaus, Amazonas - Brasil' : 'Tefé, Amazonas - Brasil';
    try { localStorage.setItem('city', window.currentCity); } catch {}
    updateLocationDisplay();
    applyTranslations();
    try { if (typeof window.refreshData === 'function') window.refreshData(null); } catch {}
  }
  function triggerMaskAlert(){
    const dict = i18n[window.currentLang];
    const banner = document.getElementById('alertBanner');
    if (!banner) return;
    const originalText = banner.textContent;
    const originalBg = banner.style.background;
    banner.textContent = `😷 ${dict.mask_alert}`;
    banner.style.background = '#FF9800';
    setTimeout(()=>{
      banner.textContent = originalText;
      banner.style.background = originalBg || '#ff4444';
    }, 6000);
  }

  // Expor funções necessárias no escopo global
  window.setLanguage = setLanguage;
  window.applyTranslations = applyTranslations;
  window.updateLocationDisplay = updateLocationDisplay;
  window.onCitySelect = onCitySelect;
  window.triggerMaskAlert = triggerMaskAlert;

  // Init
  try {
    applyTranslations();
    updateLocationDisplay();
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
      langSelect.value = window.currentLang;
      langSelect.addEventListener('change', (e)=> setLanguage(e.target.value));
    }
    const citySelect = document.getElementById('citySelect');
    if (citySelect) {
      // Seleciona valor persistido
      citySelect.value = /Manaus/i.test(window.currentCity) ? 'Manaus, Amazonas - Brasil' : 'Tefé, Amazonas - Brasil';
      citySelect.addEventListener('change', (e)=> onCitySelect(e.target.value));
    }
  } catch {}

  // Simulação de fumaça (chance baixa a cada 10s)
  setInterval(()=>{
    if (Math.random() > 0.98) triggerMaskAlert();
  }, 10000);
})();
