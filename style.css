// Banco de dados simulado para alimentar os tópicos de maneira limpa e dinâmica
const topicsData = {
    consumo: {
        title: "Consumo Consciente e Redução de Desperdício",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=800",
        text: "O consumo consciente no campo ECO envolve a implementação de sistemas avançados de irrigação gotejamento, monitoramento de umidade do solo por sensores e captação da água da chuva. Essas técnicas evitam o desperdício dos recursos hídricos e garantem que a planta receba exatamente o que precisa para prosperar."
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
        if (window.scrollY >= sectionTop - 100) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
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
            dynamicBody.innerHTML = `
                <h4>${data.title}</h4>
                <img src="${data.image}" alt="${data.title}" class="display-img">
                <p>${data.text}</p>
            `;
            contentDisplay.classList.remove('hidden');
            contentDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
});

closeDisplay.addEventListener('click', () => {
    contentDisplay.classList.add('hidden');
});

/* =