const fs = require('fs');

// Fix script.js
let scriptContent = fs.readFileSync('js/script.js', 'utf8');

const correctSobre = `const sobre = [
    [{ id: 1, image: './assets/img/sobre/etec.png', text: 'Escolaridade', desc: 'Sou formado como Técnico em Administração e Técnico em Desenvolvimento de Sistemas pela ETEC de Guaianazes, onde adquiri base sólida em gestão, tecnologia, lógica de programação e desenvolvimento de sistemas voltados para soluções reais.' }],
    [{ id: 2, image: './assets/img/sobre/cna.png', text: 'Inglês', desc: 'Curso de inglês pelo CNA, com nível intermediário, capacitado para leitura técnica, compreensão de documentação e comunicação básica em ambientes profissionais.' }],
    [{ id: 3, image: './assets/img/sobre/tcc.png', text: 'Trabalhos de Conclusão de Curso', desc: 'Realização de dois TCCs, incluindo o projeto social "Manual do Imigrante" e uma pesquisa sobre a Síndrome de Burnout em docentes da rede pública, unindo tecnologia, análise social e pesquisa acadêmica.' }],
];`;

scriptContent = scriptContent.replace(/const sobre = \[[\s\S]*?\];/m, correctSobre);
fs.writeFileSync('js/script.js', scriptContent, 'utf8');

// Fix index.html
let indexContent = fs.readFileSync('index.html', 'utf8');

const replaceMap = [
    {
        pattern: /AquaDev.*?porte\./,
        replace: 'AquaDev é uma empresa do setor de tecnologia, criada para o TCC, especializada no desenvolvimento de soluções digitais e softwares personalizados para negócios de pequeno e médio porte.'
    },
    {
        pattern: /Aplicativo mobile educativo.*?crian.*?as\./,
        replace: 'Aplicativo mobile educativo voltado ao público infantil, com foco em aprendizado lúdico, interação visual e experiência intuitiva para crianças.'
    },
    {
        pattern: /Aplicativo informativo.*?acess.*?vel\./,
        replace: 'Aplicativo informativo desenvolvido para auxiliar imigrantes com orientações, documentos, direitos e serviços essenciais de forma simples e acessível.'
    },
    {
        pattern: /Aplicativo mobile voltado.*?segura\./,
        replace: 'Aplicativo mobile voltado à área da saúde, oferecendo acesso rápido a informações, serviços médicos e gerenciamento de dados de forma prática e segura.'
    }
];

replaceMap.forEach(item => {
    indexContent = indexContent.replace(item.pattern, item.replace);
});

fs.writeFileSync('index.html', indexContent, 'utf8');
