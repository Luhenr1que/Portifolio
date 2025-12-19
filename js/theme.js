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

// Variável global para o container das partículas
let particlesContainer = null;

document.addEventListener('DOMContentLoaded', () => {
    let tema = localStorage.getItem('tema') || 'padrao';
    let modo = localStorage.getItem('modo') || 'light';

    const select = document.getElementById('temaCor');
    if (select) select.value = tema;

    function aplicar() {
        const cor = temas[tema];
        const isDark = modo === 'dark';

        localStorage.setItem('tema', tema);
        localStorage.setItem('modo', modo);

        // CSS variable (principal)
        document.documentElement.style.setProperty('--cor-primaria', cor);

        // Container
        document.body.className = modo;

        const container = document.querySelector('.container');
        if (container) container.className = `container ${modo}`;

        // Navbar
        const nav = document.getElementById('navBar');
        if (nav) {
            nav.className = modo;
            nav.style.borderBottomColor = cor;
        }

        // Trilho
        const trilho = document.getElementById('trilho');
        if (trilho) {
            trilho.className = `trilho ${modo}`;
            trilho.style.backgroundColor = isDark ? '#292929' : cor;
        }

        // Botão toggle
        const btn = document.getElementById('toggleTheme');
        if (btn) {
            btn.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
            btn.style.backgroundColor = cor;
        }

        // Ícone
        const img = document.getElementById('temaImg');
        if (img) img.src = isDark ? './assets/img/moon.png' : './assets/img/sun.png';

        // Textos da nav
        document.querySelectorAll('.navText').forEach(el => {
            el.className = `navText ${modo}`;
            el.style.color = cor;
        });

        // Atualizar cor das partículas
        atualizarCorParticulas(cor);
    }

    // Função para atualizar a cor das partículas
    function atualizarCorParticulas(novaCor) {
        if (particlesContainer) {
            try {
                // Método mais confiável para atualizar cores
                particlesContainer.options.particles.color.value = novaCor;
                particlesContainer.options.particles.links.color = novaCor;

                // Destruir e recriar partículas com nova cor
                particlesContainer.destroy();

                tsParticles.load("tsparticles", {
                    fullScreen: {
                        enable: false,
                        zIndex: -1
                    },
                    background: {
                        color: "transparent"
                    },
                    particles: {
                        number: {
                            value: 80,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: novaCor
                        },
                        shape: {
                            type: "circle"
                        },
                        opacity: {
                            value: 0.5,
                            random: true
                        },
                        size: {
                            value: { min: 1, max: 3 },
                            random: true
                        },
                        links: {
                            enable: true,
                            color: novaCor,
                            opacity: 0.3,
                            distance: 150,
                            width: 3
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out"
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "grab"
                            },
                            onclick: {
                                enable: true,
                                mode: "create",
                                create: {
                                    quantity: 1
                                }
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 140,
                                links: {
                                    opacity: 0.5
                                }
                            },
                            push: {
                                quantity: 4
                            }
                        }
                    },
                    retina_detect: true
                }).then(container => {
                    particlesContainer = container;
                });
            } catch (error) {
                console.error('Erro ao atualizar partículas:', error);
            }
        }
    }

    // Toggle light/dark
    document.getElementById('toggleTheme')?.addEventListener('click', () => {
        modo = modo === 'light' ? 'dark' : 'light';
        aplicar();
    });

    document.getElementById('trilho')?.addEventListener('click', () => {
        modo = modo === 'light' ? 'dark' : 'light';
        aplicar();
    });

    select?.addEventListener('change', function () {
        tema = this.value;
        aplicar();
    });

    document.querySelectorAll('.temaBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            tema = btn.dataset.tema;
            aplicar();
            // Fechar modal após escolher tema
            const modal = document.getElementById('temaModal');
            modal.classList.remove('active');
        });
    });

    // Inicializar partículas
    if (window.tsParticles) {
        tsParticles.load("tsparticles", {
            fullScreen: {
                enable: false,
                zIndex: -1
            },
            background: {
                color: "transparent"
            },
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: temas[tema]
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: { min: 1, max: 3 },
                    random: true
                },
                links: {
                    enable: true,
                    color: temas[tema],
                    opacity: 0.3,
                    distance: 150,
                    width: 3
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "create",
                        create: {
                            quantity: 1 
                        }
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        quantity: 1
                    }
                }
            },
            retina_detect: true
        }).then(container => {
            particlesContainer = container;
            console.log('tsParticles carregado com sucesso!');
            aplicar();
        }).catch(error => {
            console.error('Erro ao carregar tsParticles:', error);
        });
    } else {
        console.error('tsParticles não foi carregado corretamente');
    }

    // Modal functionality - CORREÇÃO AQUI
    const modal = document.getElementById('temaModal');
    const abrirTemas = document.getElementById('abrirTemas');

    // Abrir modal
    if (abrirTemas) {
        abrirTemas.addEventListener('click', () => {
            if (modal) {
                modal.classList.add('active');
            }
        });
    }

    // Fechar clicando fora da caixa
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});