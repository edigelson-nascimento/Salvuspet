/**
 * Salvuspet - Lógica Storyboard 2026
 * Foco: Resiliência, Simulação de Erros, Tempo Real e Uploads.
 */

const mockData = {
    donor: {
        name: "Carlos Edu",
        email: "carlos.heroi@gmail.com",
        document: "123.456.789-00",
        avatar: "https://i.pravatar.cc/150?u=donor",
        verified: false,
        metrics: { totalDonated: "R$ 1.450", animalsHelped: 12, campaignsSupported: 8 },
        featuredCampaigns: [
            { id: 1, name: "Tobias", location: "Curitiba, PR", goal: 2500, raised: 1850, img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop", tag: "Saúde", desc: "Fratura exposta em resgate rodoviário." },
            { id: 2, name: "Mel & Filhos", location: "São Paulo, SP", goal: 1200, raised: 980, img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop", tag: "Alimentação", desc: "Mãe amamentando 6 filhotes resgatados." },
            { id: 3, name: "Rex", location: "Belo Horizonte, MG", goal: 5000, raised: 1200, img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=800&auto=format&fit=crop", tag: "Resgate", desc: "Construção de abrigo térmico para o inverno." }
        ],
        documents: {
            identity: { status: "Pendente", icon: "fa-id-card", label: "Identidade (RG/CNH)" },
            residence: { status: "Pendente", icon: "fa-map-location-dot", label: "Comprovante de Residência" }
        }
    },
    protector: {
        name: "ONG Patas Unidas",
        email: "contato@patas.org",
        document: "12.345.678/0001-90",
        avatar: "https://i.pravatar.cc/150?u=protector",
        verified: true,
        metrics: { activeCampaigns: 2, totalRaised: "R$ 42.100", animalsHelped: 156 },
        myCampaigns: [
            { id: 10, name: "Reforma Canil B", status: "Ativa", progress: 65, img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop", raised: "R$ 6.500", goal: "R$ 10.000", updates: 12 },
            { id: 11, name: "Cirurgia da Luna", status: "Ativa", progress: 92, img: "https://images.unsplash.com/photo-1517423440428-a5a00ad1e3e8?q=80&w=800&auto=format&fit=crop", raised: "R$ 1.840", goal: "R$ 2.000", updates: 4 }
        ],
        documents: {
            selfie: { status: "Aprovado", icon: "fa-camera-retro", label: "Selfie com Documento" },
            identity: { status: "Aprovado", icon: "fa-id-card", label: "Identidade do Responsável" },
            cnpj: { status: "Aprovado", icon: "fa-file-invoice", label: "Cartão CNPJ Atualizado" },
            statute: { status: "Pendente", icon: "fa-book-atlas", label: "Estatuto Social (PDF)" }
        }
    }
};

const takenData = {
    emails: ["admin@salvuspet.com.br", "contato@patas.org", "carlos.heroi@gmail.com"],
    documents: ["123.456.789-00", "12.345.678/0001-90"]
};

const transparencyData = {
    1: {
        updates: [
            { date: "15 Mai", desc: "Tobias operado com sucesso! Veja a nota da clínica anexa.", img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=200&auto=format" },
            { date: "10 Mai", desc: "Resgate concluído. Ele já está medicado e seguro.", img: "https://images.unsplash.com/photo-1541591419107-bb2485dc4742?q=80&w=200&auto=format" }
        ],
        donors: ["Lucas R.", "Ana P.", "Bruno M.", "Carla F.", "Roberto S."]
    }
};

const liveActions = [
    { user: "Mariana L.", action: "doou R$ 50 para Tobias", time: "agora", type: "donation" },
    { user: "ONG Patas", action: "postou um update para Luna", time: "2 min atrás", type: "update" },
    { user: "Felipe S.", action: "acabou de se cadastrar", time: "5 min atrás", type: "join" }
];

let currentView = 'home';
let isRegisterMode = false;

// --- INICIALIZAÇÃO ---
function initApp() {
    const dashboardView = document.getElementById('dashboardView');
    if (dashboardView) {
        initDashboard();
    } else {
        initIndex();
    }
}

function initIndex() {
    const campaignContainer = document.getElementById('featuredCampaignsIndex');
    if (campaignContainer) {
        campaignContainer.innerHTML = mockData.donor.featuredCampaigns.map(c => `
            <div onclick="openCampaignDetail(${c.id})" class="story-panel overflow-hidden bg-white cursor-pointer group">
                <div class="relative overflow-hidden">
                    <img src="${c.img}" class="w-full h-56 object-cover border-b-3 border-slate-900 group-hover:scale-105 transition-transform duration-500">
                    <div class="absolute top-4 left-4 bg-teal-400 border-2 border-slate-900 px-3 py-1 text-[10px] font-black uppercase italic rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        ${c.tag}
                    </div>
                </div>
                <div class="p-6">
                    <h4 class="font-black uppercase text-xl mb-3 leading-tight italic truncate">${c.name}</h4>
                    <p class="text-[10px] font-bold text-slate-400 uppercase mb-4"><i class="fa-solid fa-location-dot mr-1"></i> ${c.location}</p>
                    <div class="w-full bg-slate-100 border-2 border-slate-900 h-4 rounded-lg mb-2 overflow-hidden">
                        <div class="bg-teal-400 h-full transition-all duration-1000" style="width: ${(c.raised/c.goal)*100}%"></div>
                    </div>
                    <div class="flex justify-between text-[10px] font-black uppercase italic mb-6">
                        <span>${Math.round((c.raised/c.goal)*100)}% Arrecadado</span>
                        <span class="text-teal-600">R$ ${c.raised} / ${c.goal}</span>
                    </div>
                    <button class="btn-story w-full bg-slate-900 text-white py-3 rounded-xl uppercase text-xs font-black italic">Ver Roteiro 🎬</button>
                </div>
            </div>
        `).join('');
    }

    const feedContainer = document.getElementById('liveFeed');
    if (feedContainer) {
        renderLiveFeed();
        setInterval(simulateLiveAction, 3000);
    }
}

function renderLiveFeed() {
    const container = document.getElementById('liveFeed');
    if (!container) return;
    container.innerHTML = liveActions.map(a => `
        <div class="story-panel p-4 bg-white flex items-center gap-4 animate-pop-in">
            <div class="w-10 h-10 rounded-lg border-2 border-slate-900 flex items-center justify-center ${a.type === 'donation' ? 'bg-teal-100 text-teal-600' : 'bg-sky-100 text-sky-600'}">
                <i class="fa-solid ${a.type === 'donation' ? 'fa-heart' : a.type === 'update' ? 'fa-clapperboard' : 'fa-user-plus'}"></i>
            </div>
            <div class="leading-none">
                <p class="text-[10px] font-black uppercase italic">${a.user}</p>
                <p class="text-[8px] font-bold text-slate-400 uppercase mt-1">${a.action}</p>
                <p class="text-[7px] font-black text-rose-500 uppercase mt-1">${a.time}</p>
            </div>
        </div>
    `).join('');
}

function simulateLiveAction() {
    const users = ["Rafaela", "Guilherme", "Paula", "Marcos"];
    const actions = ["doou R$ 25", "doou R$ 10", "acabou de se cadastrar"];
    const newUser = users[Math.floor(Math.random() * users.length)];
    const newAction = actions[Math.floor(Math.random() * actions.length)];
    const container = document.getElementById('liveFeed');
    if (container) {
        const newCard = document.createElement('div');
        newCard.className = "story-panel p-4 bg-white flex items-center gap-4 animate-pop-in";
        newCard.innerHTML = `<div class="w-10 h-10 rounded-lg border-2 border-slate-900 flex items-center justify-center bg-teal-100 text-teal-600"><i class="fa-solid fa-bolt"></i></div><div class="leading-none"><p class="text-[10px] font-black uppercase italic">${newUser}</p><p class="text-[8px] font-bold text-slate-400 uppercase mt-1">${newAction}</p><p class="text-[7px] font-black text-rose-500 uppercase mt-1">agora</p></div>`;
        container.prepend(newCard);
        if (container.children.length > 4) container.lastElementChild.remove();
    }
}

// --- AUTH LOGIC ---
window.handleAuth = async (event) => {
    event.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = event.target;
    const email = form.querySelector('input[type="email"]')?.value;
    const doc = form.querySelector('#docField input')?.value;

    if (isRegisterMode) {
        if (takenData.emails.includes(email) || takenData.documents.includes(doc)) {
            showToast("Erro de Script! 🎬", "E-mail ou Documento já em uso por outro ator.", true);
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 500);
            return;
        }
    }

    btn.innerHTML = "Gravando Cena... 🎬";
    btn.classList.add('bg-teal-500');
    await new Promise(r => setTimeout(r, 1000));
    const role = localStorage.getItem('tempRole') || 'donor';
    localStorage.setItem('userRole', role);
    window.location.href = 'dashboard.html';
}

window.switchTab = (tab) => {
    isRegisterMode = tab === 'register';
    const isLogin = tab === 'login';
    document.getElementById('tabLogin').className = `flex-1 py-4 font-black uppercase italic text-sm ${isLogin ? 'bg-teal-400 text-slate-900 border-r-3 border-slate-900' : 'bg-white text-slate-400'}`;
    document.getElementById('tabRegister').className = `flex-1 py-4 font-black uppercase italic text-sm ${!isLogin ? 'bg-teal-400 text-slate-900 border-l-3 border-slate-900' : 'bg-white text-slate-400'}`;
    document.getElementById('nameField').classList.toggle('hidden', isLogin);
    document.getElementById('docField').classList.toggle('hidden', isLogin);
    document.getElementById('submitBtn').innerText = isLogin ? "Entrar na Missão 🎬" : "Criar Novo Roteiro ✨";
}

// --- DASHBOARD CORE ---
function initDashboard() {
    let role = localStorage.getItem('userRole') || 'donor';
    renderSidebar(role);
    refreshView();
}

function refreshView() {
    const role = localStorage.getItem('userRole') || 'donor';
    const data = mockData[role];
    const viewContainer = document.getElementById('dashboardView');
    if (!viewContainer || !data) return;

    const nameEl = document.getElementById('userName');
    const avatarEl = document.getElementById('userAvatar');
    const badgeEl = document.getElementById('headerBadge');

    if (nameEl) nameEl.innerHTML = `${data.name} ${data.verified ? '✔️' : ''}`;
    if (avatarEl) avatarEl.src = data.avatar;
    if (badgeEl) badgeEl.innerHTML = `<span class="text-[8px] uppercase font-black px-2 py-0.5 rounded-full border-2 border-slate-900 bg-white">${role === 'donor' ? 'Doador' : 'Protetor'}</span>`;

    viewContainer.innerHTML = '';
    if (currentView === 'home') {
        role === 'donor' ? renderDonorHome(data) : renderProtectorHome(data);
    } else if (currentView === 'profile') {
        renderProfile(role, data);
    }
}

function renderSidebar(role) {
    const nav = document.getElementById('sidebarNav');
    if (!nav) return;
    const menus = role === 'donor' 
        ? [{ id: 'home', icon: 'fa-clapperboard', label: 'Causas' }, { id: 'profile', icon: 'fa-user-gear', label: 'Perfil & Docs' }]
        : [{ id: 'home', icon: 'fa-clipboard-list', label: 'Painel ONG' }, { id: 'profile', icon: 'fa-building-shield', label: 'Instituição & Docs' }];

    nav.innerHTML = menus.map(m => `
        <button onclick="setView('${m.id}')" class="flex items-center gap-4 w-full px-5 py-4 border-3 transition-all ${currentView === m.id ? 'bg-slate-900 text-white border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(45,212,191,1)]' : 'text-slate-400 border-transparent hover:bg-slate-50 rounded-xl'}">
            <i class="fa-solid ${m.icon} w-5"></i> 
            <span class="font-black uppercase text-[10px] tracking-widest">${m.label}</span>
        </button>
    `).join('');
}

function renderDonorHome(data) {
    const container = document.getElementById('dashboardView');
    if (document.getElementById('pageTitle')) document.getElementById('pageTitle').innerText = "Board de Produção";
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Investido</p><p class="text-2xl font-black italic text-teal-500">${data.metrics.totalDonated}</p></div>
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Vidas</p><p class="text-2xl font-black italic text-sky-500">${data.metrics.animalsHelped}</p></div>
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Causas</p><p class="text-2xl font-black italic text-amber-500">${data.metrics.campaignsSupported}</p></div>
        </div>
        <h3 class="text-sm font-black uppercase italic border-b-2 border-slate-900 pb-1 mb-6">Campanhas Ativas</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            ${data.featuredCampaigns.map(c => `<div onclick="openCampaignDetail(${c.id})" class="story-panel overflow-hidden bg-white cursor-pointer group"><img src="${c.img}" class="w-full h-40 object-cover border-b-3 border-slate-900 group-hover:scale-105 transition-transform duration-500"><div class="p-5"><h4 class="font-black uppercase truncate text-sm mb-2 italic">${c.name}</h4><div class="w-full bg-slate-100 border-2 border-slate-900 h-3 rounded-md mb-2 overflow-hidden"><div class="bg-teal-400 h-full" style="width: ${(c.raised/c.goal)*100}%"></div></div></div></div>`).join('')}
        </div>
    `;
}

function renderProtectorHome(data) {
    const container = document.getElementById('dashboardView');
    if (document.getElementById('pageTitle')) document.getElementById('pageTitle').innerText = "Painel ONG";
    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Arrecadado</p><p class="text-2xl font-black italic text-teal-600">${data.metrics.totalRaised}</p></div>
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Ajudados</p><p class="text-2xl font-black italic text-sky-600">${data.metrics.animalsHelped}</p></div>
            <div class="story-panel p-6 bg-white"><p class="text-[8px] font-black uppercase text-slate-400 mb-1">Ativas</p><p class="text-2xl font-black italic text-amber-600">${data.metrics.activeCampaigns}</p></div>
        </div>
        <h3 class="text-sm font-black uppercase italic border-b-2 border-slate-900 pb-1 mb-6">Minhas Campanhas</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            ${data.myCampaigns.map(c => `<div class="story-panel p-5 flex flex-col md:flex-row gap-6 bg-white"><img src="${c.img}" class="w-full md:w-32 h-32 rounded-xl border-3 border-slate-900 object-cover shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"><div class="flex-1"><h5 class="text-lg font-black uppercase italic">${c.name}</h5><div class="w-full bg-slate-100 border-2 border-slate-900 h-4 rounded-lg my-2 overflow-hidden"><div class="bg-orange-400 h-full" style="width: ${c.progress}%"></div></div><div class="flex gap-2 mt-4"><button onclick="toggleModal('updateModal')" class="btn-story flex-1 bg-slate-900 text-white py-2 rounded-lg text-[10px] uppercase font-black italic">Update 🎥</button><button onclick="openCampaignDetail(${c.id})" class="btn-story flex-1 bg-white text-slate-900 py-2 rounded-lg text-[10px] uppercase font-black italic">Detalhes</button></div></div></div>`).join('')}
        </div>
    `;
}

function renderProfile(role, data) {
    const container = document.getElementById('dashboardView');
    if (document.getElementById('pageTitle')) document.getElementById('pageTitle').innerText = "Configurações & Docs";
    
    container.innerHTML = `
        <div class="max-w-4xl mx-auto space-y-10 mb-12">
            <!-- CABEÇALHO PERFIL -->
            <div class="story-panel p-6 bg-white flex flex-col md:flex-row items-center gap-6">
                <div class="relative group">
                    <img id="profileImage" src="${data.avatar}" class="w-24 h-24 rounded-3xl border-4 border-slate-900 object-cover shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <label class="absolute -bottom-2 -right-2 w-8 h-8 bg-teal-400 border-2 border-slate-900 rounded-lg flex items-center justify-center text-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        <i class="fa-solid fa-camera text-xs"></i>
                        <input type="file" class="hidden" onchange="handleSimulatedUpload('Avatar', 'p-avatar')">
                    </label>
                </div>
                <div class="text-center md:text-left">
                    <h3 class="text-2xl font-black uppercase italic">${data.name} ${data.verified ? '✔️' : ''}</h3>
                    <p class="text-[9px] font-black uppercase opacity-40 mt-1">${role === 'donor' ? 'Doador Herói' : 'Instituição de Proteção'}</p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <!-- DADOS BÁSICOS -->
                <div class="story-panel p-6 bg-white space-y-4">
                    <h4 class="font-black uppercase italic text-xs border-b pb-2 mb-4">Informações de Roteiro</h4>
                    <div>
                        <label class="text-[8px] font-black uppercase opacity-40 mb-1 block">E-mail de Contato</label>
                        <input type="text" value="${data.email}" class="w-full p-3 border-2 border-slate-900 rounded-xl font-bold">
                    </div>
                    <div>
                        <label class="text-[8px] font-black uppercase opacity-40 mb-1 block">Documento Identificador</label>
                        <input type="text" value="${data.document}" class="w-full p-3 border-2 border-slate-900 rounded-xl font-bold">
                    </div>
                    <button onclick="showToast('Salvo!', 'Seu roteiro foi atualizado.')" class="btn-story w-full bg-slate-900 text-white py-4 rounded-xl uppercase text-xs font-black italic">Gravar Alterações 💾</button>
                </div>

                <!-- CENTRAL DE DOCUMENTOS (Uploads) -->
                <div class="story-panel p-6 bg-slate-50 border-slate-300">
                    <h4 class="font-black uppercase italic text-xs border-b border-slate-200 pb-2 mb-6">Central de Verificação 🎬</h4>
                    <div class="space-y-4">
                        ${Object.entries(data.documents).map(([key, doc]) => `
                            <div class="bg-white border-2 border-slate-900 p-4 rounded-xl shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center gap-3">
                                        <i class="fa-solid ${doc.icon} text-slate-400"></i>
                                        <span class="text-[10px] font-black uppercase italic">${doc.label}</span>
                                    </div>
                                    <span id="status-${key}" class="text-[7px] font-black px-2 py-1 rounded-lg border uppercase ${doc.status === 'Aprovado' ? 'bg-teal-50 text-teal-600 border-teal-200' : 'bg-rose-50 text-rose-500 border-rose-200'}">
                                        ${doc.status}
                                    </span>
                                </div>
                                <div class="flex gap-2">
                                    <label class="btn-story flex-1 bg-white text-slate-900 py-2 rounded-lg text-[9px] uppercase font-black italic text-center cursor-pointer flex items-center justify-center gap-2">
                                        <i class="fa-solid fa-cloud-arrow-up"></i> Selecionar
                                        <input type="file" class="hidden" onchange="handleSimulatedUpload('${doc.label}', '${key}')">
                                    </label>
                                    ${doc.status === 'Aprovado' ? `<button class="w-8 h-8 flex items-center justify-center bg-teal-100 border-2 border-slate-900 rounded-lg text-teal-600"><i class="fa-solid fa-eye"></i></button>` : ''}
                                </div>
                                <div id="progress-container-${key}" class="hidden mt-3">
                                    <div class="w-full bg-slate-100 border border-slate-900 h-2 rounded-full overflow-hidden">
                                        <div id="progress-bar-${key}" class="bg-teal-400 h-full transition-all duration-300" style="width: 0%"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <p class="text-[8px] font-bold text-slate-400 mt-6 uppercase italic text-center">A verificação garante que você é um ator real nesta produção.</p>
                </div>
            </div>
        </div>
    `;
}

// --- LOGICA DE UPLOAD SIMULADA ---
window.handleSimulatedUpload = (label, key) => {
    const progressContainer = document.getElementById(`progress-container-${key}`);
    const progressBar = document.getElementById(`progress-bar-${key}`);
    const statusLabel = document.getElementById(`status-${key}`);

    if (progressContainer) progressContainer.classList.remove('hidden');
    
    showToast("Upload Iniciado 🎬", `Enviando arquivo para ${label}...`);

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                if (statusLabel) {
                    statusLabel.innerText = "Em Análise";
                    statusLabel.classList.replace('bg-rose-50', 'bg-amber-50');
                    statusLabel.classList.replace('text-rose-500', 'text-amber-500');
                    statusLabel.classList.replace('border-rose-200', 'border-amber-200');
                }
                showToast("Sucesso! 🐾", `${label} enviado para revisão da produção.`);
                if (progressContainer) progressContainer.classList.add('hidden');
            }, 500);
        }
        if (progressBar) progressBar.style.width = progress + "%";
    }, 200);
};

// --- UTILITÁRIOS ---
window.showToast = (t, m, isError = false) => {
    const el = document.getElementById('toast');
    if(!el) return;
    document.getElementById('toastTitle').innerText = t;
    document.getElementById('toastMsg').innerText = m;
    const iconContainer = el.querySelector('div:first-child');
    if (isError) {
        iconContainer.classList.replace('bg-teal-400', 'bg-rose-500');
        iconContainer.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        el.classList.add('border-rose-500');
    } else {
        iconContainer.classList.replace('bg-rose-500', 'bg-teal-400');
        iconContainer.innerHTML = '<i class="fa-solid fa-check"></i>';
        el.classList.remove('border-rose-500');
    }
    el.classList.replace('translate-y-32', 'translate-y-0');
    el.classList.replace('opacity-0', 'opacity-100');
    setTimeout(() => { el.classList.replace('translate-y-0', 'translate-y-32'); el.classList.replace('opacity-100', 'opacity-0'); }, 4000);
}

window.setView = (v) => { currentView = v; refreshView(); renderSidebar(localStorage.getItem('userRole')); }
window.toggleModal = (id) => { const el = document.getElementById(id); if(el) { el.classList.toggle('hidden'); el.classList.toggle('flex'); } }
window.toggleMobileSidebar = () => { document.getElementById('sidebar')?.classList.toggle('-translate-x-full'); document.getElementById('sidebarOverlay')?.classList.toggle('hidden'); }
window.logout = () => { localStorage.clear(); window.location.href = 'index.html'; }
window.openLoginModal = (role) => { localStorage.setItem('tempRole', role); const m = document.getElementById('loginModal'); m.classList.remove('hidden'); m.classList.add('flex'); }
window.closeLoginModal = () => { const m = document.getElementById('loginModal'); m.classList.add('hidden'); m.classList.remove('flex'); }

window.openCampaignDetail = (id) => {
    const t = transparencyData[id] || { updates: [], donors: [] };
    const allCamps = [...mockData.donor.featuredCampaigns, ...mockData.protector.myCampaigns];
    const c = allCamps.find(x => x.id === id);
    if(!c) return;
    if (document.getElementById('detailImg')) document.getElementById('detailImg').src = c.img;
    if (document.getElementById('detailName')) document.getElementById('detailName').innerText = c.name;
    const timelineEl = document.getElementById('transparencyTimeline');
    if (timelineEl) timelineEl.innerHTML = t.updates.map(u => `<div class="flex gap-4 p-3 bg-white border-2 border-slate-900 rounded-xl shadow-[4px_4px_0px_0px_rgba(45,212,191,1)]"><img src="${u.img}" class="w-16 h-16 rounded-lg object-cover border-2 border-slate-900"><div><p class="text-[8px] font-black text-teal-600 uppercase mb-1">${u.date}</p><p class="text-[10px] font-bold leading-tight">${u.desc}</p></div></div>`).join('') || '<p class="text-xs italic opacity-30">Sem registros.</p>';
    toggleModal('campaignDetailModal');
}

document.addEventListener('DOMContentLoaded', initApp);