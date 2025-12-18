// Temas com apenas uma cor cada
const temas = {
    padrao: '#6a0dad',
    laranja: '#ff6b35', 
    azul: '#2196f3',
    amarelo: '#ffd700',
    rosa: '#e91e63',
    vermelho: '#ff2515',
    verde: '#4caf50',
    azulEscuro: '#0d47a1'
};

document.addEventListener('DOMContentLoaded', function() {
    let tema = localStorage.getItem('tema') || 'padrao';
    let modo = localStorage.getItem('modo') || 'light';
    
    const cor = temas[tema];
    const select = document.getElementById('temaCor');
    if (select) select.value = tema;
    
    function aplicar() {
        localStorage.setItem('tema', tema);
        localStorage.setItem('modo', modo);
        
        const isDark = modo === 'dark';
        const bg = isDark ? '#111' : '#f9f9f9';
        const navBg = isDark ? '#191919' : '#fcfcfc';
        const text = isDark ? '#fff' : '#111';
        const border = isDark ? 
            (tema === 'vermelho' ? '#ed2a2a' : 
             tema === 'padrao' ? '#9b4dca' : cor) : cor;
        const trilhoBg = isDark ? '#292929' : cor;
        
        // Aplicar estilos
        const container = document.querySelector('.container');
        if (container) {
            container.style.backgroundColor = bg;
            container.style.color = text;
            container.className = `container ${modo}`;
        }
        
        const nav = document.getElementById('navBar');
        if (nav) {
            nav.style.backgroundColor = navBg;
            nav.style.borderBottomColor = border;
            nav.className = modo;
        }
        
        const trilho = document.getElementById('trilho');
        if (trilho) {
            trilho.style.backgroundColor = trilhoBg;
            trilho.className = `trilho ${modo}`;
        }
        
        const btn = document.getElementById('toggleTheme');
        if (btn) {
            btn.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
            btn.style.backgroundColor = cor;
        }
        
        const img = document.getElementById('temaImg');
        if (img) img.src = isDark ? "./img/moon.png" : "./img/sun.png";
        
        // Nav texts
        document.querySelectorAll('.navText').forEach(el => {
            el.style.color = border;
            el.className = `navText ${modo}`;
        });
    }
    
    // Eventos
    document.getElementById('toggleTheme')?.addEventListener('click', () => {
        modo = modo === 'light' ? 'dark' : 'light';
        aplicar();
    });
    
    document.getElementById('trilho')?.addEventListener('click', () => {
        modo = modo === 'light' ? 'dark' : 'light';
        aplicar();
    });
    
    select?.addEventListener('change', function() {
        tema = this.value;
        aplicar();
    });
    
    aplicar();
});