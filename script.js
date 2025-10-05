let currentScreen = 'home';

function showScreen(a, b) {
    // Suporta chamadas como showScreen('home') ou showScreen(event, 'home')
    let evt, screen;
    if (typeof a === 'string') {
        screen = a;
        evt = window.event || null;
    } else {
        evt = a || null;
        screen = b;
    }

    // Esconder todas as telas
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('notificationsScreen').classList.add('hidden');
    document.getElementById('forecastScreen').classList.add('hidden');

    // Mostrar tela selecionada
    document.getElementById(screen + 'Screen').classList.remove('hidden');

    // Atualizar navegaÃ§Ã£o
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (evt && evt.target) {
        const item = evt.target.closest('.nav-item');
        if (item) item.classList.add('active');
    }

    currentScreen = screen;
}

function refreshData(evt) {
    // Simular atualizaÃ§Ã£o de dados (varia por cidade)
    const isManaus = typeof window.currentCity === 'string' && /Manaus/i.test(window.currentCity);
    const temps = isManaus ? [30, 31, 32, 33, 34, 35, 36] : [36, 37, 38, 39, 40];
    const rivers = isManaus ? [17.2, 17.5, 18.0, 18.4, 18.9, 19.3] : [13.8, 14.0, 14.2, 14.5, 14.8];
    const humidity = isManaus ? [70, 72, 75, 78, 80, 82, 85] : [75, 76, 78, 80, 82];
    const rainfall = isManaus ? [4, 6, 8, 10, 12, 0] : [0, 1, 2, 3, 4];

    document.getElementById('temperature').textContent =
        temps[Math.floor(Math.random() * temps.length)] + '\u00B0C';
    document.getElementById('riverLevel').textContent =
        rivers[Math.floor(Math.random() * rivers.length)] + 'm';
    document.getElementById('humidity').textContent =
        humidity[Math.floor(Math.random() * humidity.length)] + '%';

    const dict = window.__i18n && window.__i18n[window.currentLang||'pt'];
    document.getElementById('lastUpdate').textContent = dict ? (dict.just_now || 'Agora mesmo') : 'Agora mesmo';

    // Atualiza precipitaÃ§Ã£o, se existir
    const rainfallEl = document.getElementById('rainfall');
    if (rainfallEl) rainfallEl.textContent = `${rainfall[Math.floor(Math.random()*rainfall.length)]}mm`;

    // AnimaÃ§Ã£o de refresh (se houver origem do evento)
    const btn = evt && evt.target ? evt.target : null;
    if (btn) {
        btn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            btn.style.transform = 'rotate(0deg)';
        }, 500);
    }

    // Simular nova notificaÃ§Ã£o
    if (Math.random() > 0.7) {
        setTimeout(() => {
            const d = window.__i18n && window.__i18n[window.currentLang||'pt'];
            alert(d && d.nav_alerts ? (window.currentLang==='en' ? 'New notification: Data updated successfully!' : 'Nova notificaÃ§Ã£o: Dados atualizados com sucesso!') : 'Nova notificaÃ§Ã£o: Dados atualizados com sucesso!');
        }, 1000);
    }
}

function showEmergencyContacts() {
    const dict = window.__i18n && window.__i18n[window.currentLang||'pt'];
    if (dict && dict.emergency_popup) {
        alert(dict.emergency_popup);
    } else {
        alert('CONTATOS DE EMERGÃŠNCIA - TEFÃ‰\n\nBombeiros: 193\nSAMU: 192\nPolÃ­cia: 190\nDefesa Civil: (97) 3343-2156\nHospital Regional: (97) 3343-2274\nRÃ¡dio ComunitÃ¡ria: (97) 3343-2089');
    }
}

// Simular notificaÃ§Ãµes automÃ¡ticas
setInterval(() => {
    if (Math.random() > 0.95) {
        const lang = (window.currentLang||'pt');
        const alerts = lang==='en' ? [
            'Temperature rising â€” Stay hydrated!',
            'River level monitored â€” No critical changes',
            'Satellite data updated',
            'Possible rain in the next hours'
        ] : [
            'Temperatura subindo - Mantenha-se hidratado!',
            'NÃ­vel do rio monitorado - Sem mudanÃ§as crÃ­ticas',
            'Dados de satÃ©lite atualizados',
            'Possibilidade de chuva nas prÃ³ximas horas'
        ];

        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];

        // Mostrar notificaÃ§Ã£o discreta
        const banner = document.getElementById('alertBanner');
        const originalText = banner.textContent;
        banner.textContent = randomAlert;
        banner.style.background = '#4CAF50';

        setTimeout(() => {
            banner.textContent = originalText;
            banner.style.background = '#ff4444';
        }, 3000);
    }
}, 10000);

// Atualizar horÃ¡rio da Ãºltima atualizaÃ§Ã£o
setInterval(() => {
    const minutes = Math.floor(Math.random() * 30) + 1;
    const dict = window.__i18n && window.__i18n[window.currentLang||'pt'];
    const text = dict && dict.minutes_ago ? dict.minutes_ago(minutes) : `HÃ¡ ${minutes} min`;
    document.getElementById('lastUpdate').textContent = text;
}, 60000);

