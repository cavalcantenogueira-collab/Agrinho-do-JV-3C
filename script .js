// Banco de dados simulado para alimentar os tópicos de maneira limpa e dinâmica
const topicsData = {
    consumo: {
        title: "Consumo Consciente e Redução de Desperdício",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
        text: "O consumo consciente no campo envolve a implementação de sistemas avançados de irrigação gotejamento, monitoramento de umidade do solo por sensores e captação da água da chuva. Essas técnicas evitam o desperdício dos recursos hídricos e garantem que a planta receba exatamente o que precisa para prosperar."
    },
    energia: {
        title: "Energia Renovável no Dia a Dia",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
        text: "A matriz energética do agronegócio está mudando. A instalação de painéis solares em galpões, o uso de biomassa gerada a partir de resíduos orgânicos e pequenas usinas eólicas reduzem drasticamente a pegada de carbono da produção, tornando as fazendas autossuficientes e ecologicamente responsáveis."
    },
    tecnologia: {
        title: "Agricultura Sustentável com Tecnologia",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800",
        text: "Tratores autônomos guiados por GPS de alta precisão e drones inteligentes que mapeiam falhas no plantio permitem a aplicação localizada de insumos. Isso significa que defensivos e fertilizantes só são usados onde há real necessidade, poupando o solo e o lençol freático."
    },
    impactos: {
        title: "Impactos Ambientais das Novas Tecnologias",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad451?auto=format&fit=crop&q=80&w=800",
        text: "A tecnologia atua diretamente na regeneração. Ferramentas digitais auxiliam no manejo integrado de pragas e no plantio direto, retendo mais carbono na terra, evitando a erosão e ajudando a conservar florestas nativas e ecossistemas vizinhos às áreas produtivas."
    },
    educacao: {
        title: "Educação Ambiental com Recursos Digitais",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        text: "Capacitar o produtor e a comunidade é vital. Através de plataformas móveis e recursos educacionais digitais, técnicas de sustentabilidade chegam de forma acessível a qualquer smartphone, transformando conhecimento técnico em práticas diárias eficientes."
    }
};

// Captura de elementos do DOM
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const themeToggle = document.getElementById('theme-toggle');
const cardButtons = document.querySelectorAll('.topic-card');
const contentDisplay = document.getElementById('content-display');
const dynamicBody = document.getElementById('dynamic-body');
const closeDisplay = document.getElementById('close-display');
const contactForm = document.getElementById('contact-form');
const userEmail = document.getElementById('user-email');
const formMessage = document.getElementById('form-message');

/* ==========================================================================
   EFEITO: Menu Ativo por Rolagem (ScrollSpy)
   ========================================================================== */
window.addEventListener('scroll', () => {
    let currentSectionId = 'inicio';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Se a rolagem passou do topo da seção menos uma margem do header
        if (window.scrollY >= sectionTop - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        // Remove a borda/classe ativa de todos
        link.classList.remove('active');
        // Adiciona apenas no botão correspondente à seção atual
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================================================
   INTERAÇÃO: Abrir Tópicos/Abas Individualmente
   ========================================================================== */
cardButtons.forEach(card => {
    card.addEventListener('click', () => {
        const key = card.getAttribute('data-topic');
        const data = topicsData[key];

        if (data) {
            // Constrói a aba com informações e imagens de forma dinâmica
            dynamicBody.innerHTML = `
                <h4>${data.title}</h4>
                <img src="${data.image}" alt="${data.title}" class="display-img">
                <p>${data.text}</p>
            `;
            // Revela a caixa de exibição
            contentDisplay.classList.remove('hidden');
            // Rola suavemente até o conteúdo aberto
            contentDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

// Fechar exibição da aba
closeDisplay.addEventListener('click', () => {
    contentDisplay.classList.add('hidden');
});

/* ==========================================================================
   FUNCIONALIDADE: Modo Escuro (Dark Mode)
   ========================================================================== */
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeToggle.textContent = "🌓 Modo Escuro";
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = "☀️ Modo Claro";
    }
});

/* ==========================================================================
   VALIDAÇÃO: Validação Simples de Formulário
   ========================================================================== */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita recarregamento da página

    const emailValue = userEmail.value.trim();

    // Regex simples para validação estrutural de e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        showFormMessage("Por favor, preencha o campo de e-mail.", "error");
    } else if (!emailPattern.test(emailValue)) {
        showFormMessage("Por favor, insira um e-mail válido.", "error");
    } else {
        showFormMessage("Sucesso! Você foi cadastrado em nossa base sustentável.", "success");
        contactForm.reset();
    }
});

// Função auxiliar para exibir feedback dinâmico
function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    
    // Desaparece com a mensagem após 4 segundos
    setTimeout(() => {
        formMessage.textContent = "";
    }, 4000);
}