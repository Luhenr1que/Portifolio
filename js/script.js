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
    
        { image: './assets/img/lings/java.png',    text: 'Java',         tipo: 'dev' },
        { image: './assets/img/lings/python.png',  text: 'Python',       tipo: 'dev' },
        { image: './assets/img/lings/php.png',     text: 'PHP',          tipo: 'dev' },
        { image: './assets/img/lings/laravel.png', text: 'Laravel',      tipo: 'dev' },
        { image: './assets/img/lings/node.png',    text: 'Node.js',      tipo: 'dev' },
        { image: './assets/img/lings/web.png',     text: 'WEB',          tipo: 'dev' },
        { image: './assets/img/lings/react.png',   text: 'React Native', tipo: 'dev' },

        { image: './assets/img/lings/mysql.png',   text: 'MySQL',        tipo: 'database' },
        { image: './assets/img/lings/sql.png',     text: 'SQL',          tipo: 'database' },
        { image: './assets/img/lings/mongo.png',   text: 'MongoDB',      tipo: 'database' },

        { image: './assets/img/lings/git.png', text: 'Git',  tipo: 'ferramentas' },
        { image: './assets/img/lings/github.png', text: 'Github',  tipo: 'ferramentas' },
        { image: './assets/img/lings/photoshop.png', text: 'Photoshop',  tipo: 'ferramentas' },
        { image: './assets/img/lings/canva.png',    text: 'Canva',     tipo: 'ferramentas' }
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

let num = 0;

const sobre = [
    [{ id: 1, image: './assets/img/sobre/etec.png', text: 'Escolaridade', desc: 'Sou formado como Técnico em Administração e Técnico em Desenvolvimento de Sistemas pela ETEC de Guaianazes, onde adquiri base sólida em gestão, tecnologia, lógica de programação e desenvolvimento de sistemas voltados para soluções reais.' }],
    [{ id: 2, image: './assets/img/sobre/cna.png', text: 'Inglês', desc: 'Curso de inglês pelo CNA, com nível intermediário, capacitado para leitura técnica, compreensão de documentação e comunicação básica em ambientes profissionais.' }],
    [{ id: 3, image: './assets/img/sobre/tcc.png', text: 'Trabalhos de Conclusão de Curso', desc: 'Realização de dois TCCs, incluindo o projeto social "Manual do Imigrante" e uma pesquisa sobre a Síndrome de Burnout em docentes da rede pública, unindo tecnologia, análise social e pesquisa acadêmica.' }],
];

const sobreMim = document.getElementById('sobreTextArea');

function renderizar(){
    const item = sobre[num];
    sobreMim.innerHTML = `
        <div class="sobre-item">
            <img src='${item[0].image}'>
            <div>
                <h1>${item[0].text}</h1>
                <h2>${item[0].desc}</h2>
            </div>
        </div>
    `;
}

function passar(lado){
    if(lado){ // direita
        if(num < sobre.length - 1){
            num++;
        } else {
            num = 0;
        }
    } else { // esquerda
        if(num > 0){
            num--;
        } else {
            num = sobre.length - 1;
        }
    }

    renderizar(); 
}

// render inicial
if (sobreMim) {
    renderizar();
} else {
    console.error('Elemento não encontrado');
}


