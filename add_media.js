const fs = require('fs');
let c = fs.readFileSync('css/style.css', 'utf8');

if (!c.includes('.projetos-container { flex-direction: column;')) {
    const mediaQuery = `
@media (max-width: 900px) {
    .projetos-container {
        flex-direction: column;
        height: auto;
        max-height: 85vh;
    }
    .projetos-sidebar {
        width: 100%;
        min-width: unset;
        flex-direction: row;
        overflow-x: auto;
        border-right: none;
        border-bottom: 2px dashed var(--cor-primaria);
        padding: 10px;
    }
    .sidebar-btn {
        padding: 10px;
        font-size: 14px;
        white-space: nowrap;
    }
    .projetos-content {
        padding: 20px 10px;
    }
    .sobreArea {
        width: 90vw;
    }
    .sobre-slide {
        flex-direction: column;
        gap: 20px;
        text-align: center;
    }
    .sobre-slide img {
        max-width: 60vw;
        max-height: 30vh;
        margin: 0 auto;
    }
    .sobre-slide-text {
        max-width: 80vw;
    }
    .sobre-slide-text h1 {
        text-align: center;
    }
}
`;
    c += mediaQuery;
    fs.writeFileSync('css/style.css', c);
}
