const frases = [
  'Seja bem-vindo ao meu portfólio',
  'Transformando ideias em soluções digitais',
  'Código limpo, design funcional',
  'Desenvolvimento focado em resultados',
  'Do conceito ao produto final',
  'Soluções modernas para problemas reais',
  'Tecnologia pensada para pessoas',
  'Criando experiências digitais eficientes'
];

let index = 0;
let digitando = false;

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.txt .text');
    if (textElement) {
        startLoop(textElement);
    }
});

async function startLoop(element) {
    if (digitando) return;
    digitando = true;

    while (true) {
        await type(element, frases[index]);
        await wait(2000);
        await erase(element);
        index = (index + 1) % frases.length;
    }
}

async function type(element, texto) {
    let textoAtual = ''; 
    for (const letra of texto) {
        textoAtual += letra;
        element.textContent = textoAtual;
        await wait(100);
    }
}

async function erase(element) {
    let texto = element.textContent;
    for (let i = texto.length; i >= 0; i--) {
        element.textContent = texto.substring(0, i);
        await wait(50);
    }
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const ling = [
    
        { image: '../assets/img/lings/java.png',    text: 'Java',         tipo: 'dev' },
        { image: '../assets/img/lings/python.png',  text: 'Python',       tipo: 'dev' },
        { image: '../assets/img/lings/php.png',     text: 'PHP',          tipo: 'dev' },
        { image: '../assets/img/lings/laravel.png', text: 'Laravel',      tipo: 'dev' },
        { image: '../assets/img/lings/node.png',    text: 'Node.js',      tipo: 'dev' },
        { image: '../assets/img/lings/web.png',     text: 'WEB',          tipo: 'dev' },
        { image: '../assets/img/lings/react.png',   text: 'React Native', tipo: 'dev' },

        { image: '../assets/img/lings/mysql.png',   text: 'MySQL',        tipo: 'database' },
        { image: '../assets/img/lings/sql.png',     text: 'SQL',          tipo: 'database' },
        { image: '../assets/img/lings/mongo.png',   text: 'MongoDB',      tipo: 'database' },

        { image: '../assets/img/lings/git.png', text: 'Git',  tipo: 'ferramentas' },
        { image: '../assets/img/lings/github.png', text: 'Github',  tipo: 'ferramentas' },
        { image: '../assets/img/lings/photoshop.png', text: 'Photoshop',  tipo: 'ferramentas' },
        { image: '../assets/img/lings/canva.png',    text: 'Canva',     tipo: 'ferramentas' }
]

ling.forEach(item => {
  const container = document.getElementById(item.tipo);

  if (!container) return;

  container.innerHTML += `
    <div class="skill-card">
      <img src="${item.image}" class="iconLing" alt="${item.text}">
      <span>${item.text}</span>
    </div>
  `;
});