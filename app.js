// ============================================
// SALVUSPET DEMO - Sistema Completo v1.0
// ============================================

console.log('🐾 SalvusPet Demo Iniciada!');

// === 1. SISTEMA DE NAVEGAÇÃO ===
const routes = {
    'landing': 'pagina-principal.html',
    'login': 'index.html',
    'dashboard-doador': 'dashboard-doador.html',
    'dashboard-protetor': 'dashboard-protetor.html',
    'dashboard-clinica': 'dashboard-clinica.html',
    'criar-campanha': 'criar-campanha.html',
    'gerenciar-campanha': 'gerenciar-campanha.html',
    'verificacao': 'verificacao-identidade.html',
    'doar': 'doacao-rapida.html',
    'cadastro-parceiro': 'cadastro-parceiro.html',
    'solicitacoes': 'solicitacoes-clinica.html',
    'agendamento': 'agendamento-procedimento.html'
};

function navigateTo(routeName) {
    if (routes[routeName]) {
        window.location.href = routes[routeName];
    } else {
        console.error('Rota não encontrada:', routeName);
    }
}

// === 2. SISTEMA DE AUTENTICAÇÃO MOCK ===
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector('input[type="email"]')?.value;
    const userType = localStorage.getItem('userType') || 'doador';
    
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin inline-block">progress_activity</span> Entrando...';
    btn.disabled = true;
    
    setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email || 'demo@salvuspet.com');
        localStorage.setItem('userName', 'João Silva');
        
        showToast('Login realizado com sucesso!');
        
        setTimeout(() => {
            switch(userType) {
                case 'doador':
                    navigateTo('dashboard-doador');
                    break;
                case 'protetor':
                    navigateTo('dashboard-protetor');
                    break;
                case 'clinica':
                    navigateTo('dashboard-clinica');
                    break;
                default:
                    navigateTo('dashboard-doador');
            }
        }, 800);
    }, 1500);
}

// === 3. SELETOR DE TIPO DE USUÁRIO (NO LOGIN) ===
function setUserType(type) {
    localStorage.setItem('userType', type);
    console.log('Tipo de usuário definido:', type);
}

// === 4. ANIMAÇÕES DE NÚMEROS (CONTADOR) ===
function animateNumber(element, target, duration = 1500) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            if (target >= 1000) {
                element.textContent = 'R$ ' + target.toLocaleString('pt-BR');
            } else {
                element.textContent = target.toLocaleString('pt-BR');
            }
            clearInterval(timer);
        } else {
            if (target >= 1000) {
                element.textContent = 'R$ ' + Math.floor(current).toLocaleString('pt-BR');
            } else {
                element.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
        }
    }, 16);
}

// === 5. PROGRESS BAR ANIMADA ===
function animateProgressBar(element, targetWidth) {
    element.style.transition = 'width 1.5s ease-out';
    setTimeout(() => {
        element.style.width = targetWidth + '%';
    }, 200);
}

// === 6. TOAST NOTIFICATIONS ===
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-primary' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-[9999] text-white ${bgColor} flex items-center gap-2`;
    toast.innerHTML = `
        <span class="material-symbols-outlined text-sm">${type === 'success' ? '' : type === 'error' ? 'error' : 'info'}</span>
        <span>${message}</span>
    `;
    toast.style.animation = 'slideInRight 0.3s ease-out';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// === 7. SIMULAÇÃO DE ENVIO DE CAMPANHA ===
function handleCampaignSubmit(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin inline-block">progress_activity</span> Criando campanha...';
    btn.disabled = true;
    
    setTimeout(() => {
        showToast('Campanha enviada para aprovação com sucesso!');
        
        localStorage.setItem('campaignCreated', 'true');
        
        setTimeout(() => {
            navigateTo('dashboard-protetor');
        }, 1500);
    }, 2000);
}

// === 8. SIMULAÇÃO DE DOAÇÃO ===
function handleDonation(amount) {
    localStorage.setItem('lastDonation', amount);
    localStorage.setItem('lastDonationDate', new Date().toISOString());
    
    showToast(`Doação de R$ ${amount} processada com sucesso! 🎉`);
    
    setTimeout(() => {
        navigateTo('dashboard-doador');
    }, 2000);
}

// === 9. ACEITAR/RECUSAR SOLICITAÇÃO ===
function handleRequestAction(action, campaignId) {
    const btn = window.event.target;
    const card = btn.closest('.card') || btn.closest('[class*="rounded-xl"]');
    
    btn.disabled = true;
    
    if (action === 'accept') {
        btn.innerHTML = '<span class="material-symbols-outlined animate-spin inline-block">progress_activity</span> Processando...';
        
        setTimeout(() => {
            showToast('Campanha aceita! Agora você pode agendar o procedimento.');
            localStorage.setItem('acceptedCampaign', campaignId);
            
            setTimeout(() => {
                navigateTo('agendamento');
            }, 1500);
        }, 1500);
    } else {
        btn.innerHTML = 'Recusando...';
        
        setTimeout(() => {
            showToast('Campanha recusada.', 'info');
            
            if (card) {
                card.style.animation = 'slideOutLeft 0.5s ease-out';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        }, 1000);
    }
}

// === 10. AGENDAMENTO ===
function handleScheduling(event) {
    event.preventDefault();
    
    const btn = event.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<span class="material-symbols-outlined animate-spin inline-block">progress_activity</span> Agendando...';
    btn.disabled = true;
    
    setTimeout(() => {
        showToast('Procedimento agendado com sucesso! O tutor foi notificado.');
        
        setTimeout(() => {
            navigateTo('dashboard-clinica');
        }, 2000);
    }, 1500);
}

// === 11. VERIFICAÇÃO DE IDENTIDADE - UPLOAD ===
let verificationStep = 1;

function handleVerificationUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const uploadArea = event.target.closest('[class*="border-dashed"]') || event.target.parentElement;
        
        uploadArea.innerHTML = `
            <div class="flex items-center justify-center gap-3 p-4">
                <span class="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
                <div class="text-left">
                    <p class="font-bold text-sm">${file.name}</p>
                    <p class="text-xs text-gray-500">Enviado com sucesso!</p>
                </div>
            </div>
        `;
        
        verificationStep++;
        localStorage.setItem('verificationStep', verificationStep);
        
        updateVerificationProgress();
        
        showToast(`Documento ${verificationStep - 1}/3 enviado!`, 'success');
        
        if (verificationStep > 3) {
            setTimeout(() => {
                showToast('Todos os documentos enviados! Aguarde análise.');
                setTimeout(() => {
                    navigateTo('dashboard-protetor');
                }, 2000);
            }, 1000);
        }
    }
}

function updateVerificationProgress() {
    const step = parseInt(localStorage.getItem('verificationStep') || '1');
    const progressBar = document.querySelector('[class*="bg-primary"][class*="h-"]');
    
    if (progressBar) {
        const percentage = (step / 3) * 100;
        animateProgressBar(progressBar, percentage);
        
        const percentageText = document.querySelector('[class*="text-primary"][class*="font-bold"]');
        if (percentageText && percentageText.textContent.includes('%')) {
            percentageText.textContent = Math.round(percentage) + '%';
        }
    }
}

// === 12. DARK MODE ===
function initDarkMode() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const themeIcons = document.querySelectorAll('.theme-icon');
    const htmlElement = document.documentElement;

    function updateIcons(isDark) {
        themeIcons.forEach(icon => {
            icon.textContent = isDark ? 'light_mode' : 'dark_mode';
        });
    }

    function checkTheme() {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
            updateIcons(true);
        } else {
            htmlElement.classList.add('light');
            htmlElement.classList.remove('dark');
            updateIcons(false);
        }
    }

    checkTheme();

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                htmlElement.classList.add('light');
                localStorage.theme = 'light';
                updateIcons(false);
            } else {
                htmlElement.classList.remove('light');
                htmlElement.classList.add('dark');
                localStorage.theme = 'dark';
                updateIcons(true);
            }
        });
    });
}

// === 13. MOBILE MENU ===
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuContent = document.getElementById('menu-content');

    function openMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                if (menuContent) menuContent.classList.remove('translate-x-full');
            }, 10);
        }
    }

    function closeMenu() {
        if (menuContent) {
            menuContent.classList.add('translate-x-full');
            setTimeout(() => {
                if (mobileMenu) mobileMenu.classList.add('hidden');
            }, 300);
        }
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
}

// === 14. INICIALIZAÇÃO AUTOMÁTICA ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Inicializando SalvusPet Demo...');
    
    // Inicializar dark mode
    initDarkMode();
    
    // Inicializar mobile menu
    initMobileMenu();
    
    // Animar números
    document.querySelectorAll('[data-animate-number]').forEach(el => {
        const target = parseInt(el.textContent.replace(/\D/g, ''));
        if (target && !isNaN(target)) {
            el.textContent = '0';
            setTimeout(() => {
                animateNumber(el, target);
            }, 300);
        }
    });
    
    // Animar progress bars
    document.querySelectorAll('[data-progress]').forEach(el => {
        const target = parseInt(el.dataset.progress);
        if (target && !isNaN(target)) {
            setTimeout(() => {
                animateProgressBar(el, target);
            }, 500);
        }
    });
    
    // Auto-attach form handlers
    const loginForm = document.querySelector('form[data-login-form]');
    if (loginForm) {
        console.log('📝 Form de login encontrado');
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const campaignForm = document.querySelector('form[data-campaign-form]');
    if (campaignForm) {
        console.log('📝 Form de campanha encontrado');
        campaignForm.addEventListener('submit', handleCampaignSubmit);
    }
    
    const schedulingForm = document.querySelector('form[data-scheduling-form]');
    if (schedulingForm) {
        console.log('📝 Form de agendamento encontrado');
        schedulingForm.addEventListener('submit', handleScheduling);
    }
    
    // Upload handlers
    document.querySelectorAll('input[type="file"][data-verification]').forEach(input => {
        input.addEventListener('change', handleVerificationUpload);
    });
    
    // Verificar autenticação
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn && userName) {
        console.log('👤 Usuário logado:', userName);
    }
    
    console.log('✅ SalvusPet Demo carregada com sucesso!');
});

// === 15. ADICIONAR ESTILOS DE ANIMAÇÃO ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Expor funções globalmente
window.navigateTo = navigateTo;
window.handleLogin = handleLogin;
window.setUserType = setUserType;
window.handleDonation = handleDonation;
window.handleRequestAction = handleRequestAction;
window.handleCampaignSubmit = handleCampaignSubmit;
window.handleScheduling = handleScheduling;
window.handleVerificationUpload = handleVerificationUpload;
window.showToast = showToast;