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
