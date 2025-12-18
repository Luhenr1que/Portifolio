// ============================================
// VARIÁVEIS GLOBAIS DE BACKGROUND
// ============================================
const BACKGROUND_COLORS = {
    navBgDark: '#191919',
    navBgLight: '#fcfcfcff',
    containerBgDark: '#111',
    containerBgLight: '#f9f9f9ff',
    trilhoBgDark: '#292929',
    textColorDark: '#fff',
    textColorLight: '#111'

};

// ============================================
// FUNÇÃO PARA CRIAR TEMAS DE FORMA CONSISTENTE
// ============================================
function criarTema(primariaLight, primariaDark, corBordaLight, corBordaDark) {
    return {
        light: {
            primaria: primariaLight,
            navBorder: primariaLight,
            navText: primariaLight,
            trilhoBg: primariaLight,
            navBg: BACKGROUND_COLORS.navBgLight,
            containerBg: BACKGROUND_COLORS.containerBgLight,
            textColor: BACKGROUND_COLORS.textColorLight
        },
        dark: {
            primaria: primariaDark,
            navBorder: corBordaDark,
            navText: corBordaDark,
            trilhoBg: BACKGROUND_COLORS.trilhoBgDark,
            navBg: BACKGROUND_COLORS.navBgDark,
            containerBg: BACKGROUND_COLORS.containerBgDark,
            textColor: BACKGROUND_COLORS.textColorDark
        }
    };
}

// ============================================
// DEFINIÇÃO DOS TEMAS
// ============================================
const temas = {
    padrao: criarTema('#6a0dad', '#6a0dad', '#6a0dad', '#9b4dca'),
    laranja: criarTema('#ff6b35', '#ff6b35', '#ff6b35', '#ff9e6d'),
    azul: criarTema('#2196f3', '#2196f3', '#2196f3', '#64b5f6'),
    amarelo: criarTema('#ffd700', '#ffd700', '#ffd700', '#fff176'),
    rosa: criarTema('#e91e63', '#e91e63', '#e91e63', '#f48fb1'),
    vermelho: criarTema('#f44336', '#ff2515ff', '#f44336', '#ed2a2aff'),
    verde: criarTema('#4caf50', '#4caf50', '#4caf50', '#81c784'),
    azulEscuro: criarTema('#0d47a1', '#0d47a1', '#0d47a1', '#5472d3')
};

// ============================================
// CONFIGURAÇÃO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const temaCorSelect = document.getElementById('temaCor');
    const navBar = document.getElementById('navBar');
    const container = document.querySelector('.container');
    const trilho = document.getElementById('trilho');
    const indicador = document.getElementById('indicador');
    const temaImg = document.getElementById('temaImg');
    const navTexts = document.querySelectorAll('.navText');
    

    // Estado atual
    let temaAtual = 'padrao';
    let modoAtual = 'light';

    // ============================================
    // FUNÇÕES AUXILIARES
    // ============================================
    
    /**
     * Salva as preferências do usuário no localStorage
     */
    function salvarPreferencias() {
        localStorage.setItem('tema', temaAtual);
        localStorage.setItem('modo', modoAtual);
    }

    /**
     * Carrega as preferências salvas do usuário
     */
    function carregarPreferencias() {
        const temaSalvo = localStorage.getItem('tema');
        const modoSalvo = localStorage.getItem('modo');

        if (temaSalvo && temas[temaSalvo]) {
            temaAtual = temaSalvo;
            if (temaCorSelect) temaCorSelect.value = temaSalvo;
        }

        if (modoSalvo && (modoSalvo === 'light' || modoSalvo === 'dark')) {
            modoAtual = modoSalvo;
        } else {
            // Verificar preferência do sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            modoAtual = prefersDark ? 'dark' : 'light';
        }
    }

    /**
     * Aplica o tema atual a todos os elementos da página
     */
    function aplicarTema() {
        const config = temas[temaAtual][modoAtual];

        // Aplicar classes CSS
        if (container) container.className = `container ${modoAtual}`;
        if (navBar) navBar.className = modoAtual;
        if (trilho) trilho.className = `trilho ${modoAtual}`;

        // Aplicar estilos diretamente
        if (container) {
            container.style.backgroundColor = config.containerBg;
            container.style.color = config.textColor;
        }

        if (navBar) {
            navBar.style.backgroundColor = config.navBg;
            navBar.style.borderBottomColor = config.navBorder;
        }

        if (trilho) {
            trilho.style.backgroundColor = config.trilhoBg;
        }

        // Atualizar botão de toggle
        if (toggleThemeBtn) {
            toggleThemeBtn.textContent = modoAtual === 'light' ? 'Modo Escuro' : 'Modo Claro';
            toggleThemeBtn.style.backgroundColor = config.primaria;
        }

        // Atualizar ícone do tema
        if (temaImg) {
            temaImg.src = modoAtual === 'light' ? "./img/sun.png" : "./img/moon.png";
        }

        // Atualizar textos de navegação
        navTexts.forEach(navText => {
            navText.className = `navText ${modoAtual}`;
            navText.style.color = config.navText;
        });

        // Estilizar pseudo-elementos
        let pseudoStyle = document.getElementById("navtextAfterStyle");
        if (!pseudoStyle) {
            pseudoStyle = document.createElement("style");
            pseudoStyle.id = "navtextAfterStyle";
            document.head.appendChild(pseudoStyle);
        }

        pseudoStyle.innerHTML = `
            .navText.${modoAtual}::after {
                background-color: ${config.navText} !important;
            }
        `;

        // Aplicar cor primária a outros links
        document.querySelectorAll('a:not(.navText)').forEach(link => {
            link.style.color = config.primaria;
        });

        // Definir variável CSS global
        document.documentElement.style.setProperty('--cor-primaria', config.primaria);
    }

    /**
     * Alterna entre modo claro e escuro
     */
    function alternarModo() {
        modoAtual = modoAtual === 'light' ? 'dark' : 'light';
        salvarPreferencias();
        aplicarTema();
    }

    /**
     * Muda o tema de cores
     * @param {string} novoTema - Nome do novo tema
     */
    function mudarTema(novoTema) {
        if (temas[novoTema]) {
            temaAtual = novoTema;
            salvarPreferencias();
            aplicarTema();
        } else {
            console.warn(`Tema "${novoTema}" não encontrado. Usando tema padrão.`);
            temaAtual = 'padrao';
            salvarPreferencias();
            aplicarTema();
        }
    }

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    
    // Carregar preferências do usuário
    carregarPreferencias();
    
    // Aplicar tema inicial
    aplicarTema();

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    // Botão de alternar tema
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', alternarModo);
    }

    // Seletor de cor do tema
    if (temaCorSelect) {
        temaCorSelect.addEventListener('change', function () {
            mudarTema(this.value);
        });
    }

    // Trilho para alternar tema
    if (trilho) {
        trilho.addEventListener('click', alternarModo);
    }

    // ============================================
    // EXPOSIÇÃO DE FUNÇÕES PARA DEBUG (OPCIONAL)
    // ============================================
    window.debugTema = {
        getTemaAtual: () => temaAtual,
        getModoAtual: () => modoAtual,
        getTemasDisponiveis: () => Object.keys(temas),
        alternarModo: alternarModo,
        mudarTema: mudarTema,
        aplicarTema: aplicarTema
    };

    console.log('Sistema de temas carregado. Use window.debugTema para debug.');
});

// ============================================
// DETECÇÃO DE PREFERÊNCIA DO SISTEMA DINÂMICA
// ============================================
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {

    if (!localStorage.getItem('modo')) {
        const modoPreferido = e.matches ? 'dark' : 'light';
        console.log(`Preferência do sistema alterada para: ${modoPreferido}`);

        if (typeof window.debugTema !== 'undefined' && window.debugTema.mudarTema) {

            window.debugTema.mudarTema(window.debugTema.getTemaAtual());
        }
    }
});