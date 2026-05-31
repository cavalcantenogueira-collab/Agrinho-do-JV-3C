// Aguarda o carregamento completo do DOM para iniciar os scripts
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DO MODO ESCURO (THEME TOGGLE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    themeToggleBtn.addEventListener('click', () => {
        // Verifica o tema atual no atributo do body
        const currentTheme = document.body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.body.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌿 Modo Escuro';
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️ Modo Claro';
        }
    });


    /* ==========================================================================
       2. EFEITO DE MENU ATIVO DINÂMICO VIA SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Captura o scroll atual adicionando uma folga de 150px para melhor experiência visual
            if (pageYOffset >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Remaneja a classe ativa nas bordas dos links de navegação baseado na posição
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    /* ==========================================================================
       3. SISTEMA DE ABAS / CONTEÚDO DINÂMICO DOS CARDS
       ========================================================================== */
    // Banco de dados em memória contendo as informações individuais independentes
    const topicsData = {
        consumo: {
            title: "Consumo Consciente e Redução de Desperdício",
            desc: "A agricultura moderna exige o uso inteligente de água e insumos. Através de sistemas modernos de gotejamento subterrâneo e sensores de umidade de solo, fazendas conseguem economizar até 40% de recursos hídricos, injetando nutrientes diretamente nas raízes apenas quando necessário.",
            img: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=500&q=80"
        },
        energia: {
            title: "Energia Renovável no Dia a Dia",
            desc: "A transição energética no campo é uma realidade. Telhados de galpões rurais revestidos com painéis fotovoltaicos e a conversão de resíduos orgânicos animais em biogás tornam as propriedades autossustentáveis, reduzindo a pegada de carbono e barateando os custos de produção.",
            img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=500&q=80"
        },
        tecnologia: {
            title: "Agricultura Sustentável com Tecnologia",
            desc: "Drones multiespectrais monitoram a saúde das lavouras em tempo real, gerando mapas que guiam maquinários autônomos. Isso permite aplicar defensivos biológicos apenas nas áreas afetadas, evitando contaminação generalizada do solo e protegendo os polinizadores.",
            img: "https://images.unsplash.com/photo-1560493450-b15b3e90e46e?auto=format&fit=crop&w=500&q=80"
        },
        impactos: {
            title: "Impactos Ambientais das Novas Tecnologias",
            desc: "Ao mapear dados climáticos e aplicar a rotação de culturas digitalizada, eliminamos o desgaste severo da terra. O plantio direto reduz drasticamente a erosão, transformando o ecossistema agrícola em um capturador ativo de carbono, ao invés de um emissor.",
            img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=500&q=80"
        },
        educacao: {
            title: "Educação Ambiental com Recursos Digitais",
            desc: "Capacitar produtores rurais através de plataformas gamificadas e simuladores virtuais acelera a implementação de metodologias verdes. O acesso democrático à informação técnica conecta comunidades tradicionais às maiores inovações de preservação do planeta.",
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80"
        }
    };

    const topicCards = document.querySelectorAll('.topic-card');
    const dynamicArea = document.getElementById('dynamic-content-area');
    const dynamicBody = document.getElementById('dynamic-body');
    const closeBtn = document.getElementById('close-content');

    // Mapeia o evento de clique em cada quadrado (aba) da grade
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const topicKey = card.getAttribute('data-topic');
            const data = topicsData[topicKey];

            if (data) {
                // Constrói a estrutura HTML interna de forma dinâmica e limpa
                dynamicBody.innerHTML = `
                    <div class="expanded-layout">
                        <div class="expanded-text">
                            <h3>${data.title}</h3>
                            <p>${data.desc}</p>
                            <p><strong>Benefício Central:</strong> Equilíbrio produtivo com desperdício zero.</p>
                        </div>
                        <img src="${data.img}" alt="${data.title}" class="expanded-img">
                    </div>
                `;

                // Remove o estado oculto e rola suavemente para o painel de leitura
                dynamicArea.classList.remove('hidden');
                dynamicArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // Fecha a área de conteúdo dinâmico
    closeBtn.addEventListener('click', () => {
        dynamicArea.classList.add('hidden');
    });


    /* ==========================================================================
       4. VALIDAÇÃO SIMPLES DO FORMULÁRIO DE FEEDBACK
       ========================================================================== */
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('user-email');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita o recarregamento padrão da página

        const emailValue = emailInput.value.trim();

        // Limpa mensagens anteriores
        formMessage.textContent = '';
        formMessage.className = 'form-message';

        // Validação Simples: Campo Vazio
        if (emailValue === '') {
            formMessage.textContent = 'Por favor, digite um endereço de e-mail.';
            formMessage.classList.add('error');
            return;
        }

        // Validação com Expressão Regular para testar formato de e-mail válido
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            formMessage.textContent = 'Insira um formato de e-mail válido (exemplo@dominio.com).';
            formMessage.classList.add('error');
            return;
        }

        // Mensagem Dinâmica em caso de sucesso
        formMessage.textContent = 'Obrigado pelo interesse! Juntos construiremos um futuro mais sustentável.';
        formMessage.classList.add('success');
        
        // Limpa o campo após o envio correto
        form.reset();
    });
});