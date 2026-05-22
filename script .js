/**
 * PROJETO: Agro Forte, Futuro Sustentável
 * ARQUIVO: script.js
 * DESCRIÇÃO: Controla a navegação por abas/cards, alternância de temas,
 *            processamento lógico, validações do simulador e troca de foco ativa na rolagem.
 */

// Banco de dados estruturado com as informações profundas de cada tópico
const dbTopics = {
    consumo: {
        title: "Consumo Consciente e Redução de Desperdício",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_2",
        badge: "Consumo Consciente",
        text: "O consumo consciente no agronegócio foca na eliminação planejada do desperdício de insumos hídricos e de compostos biológicos. Utilizando sensores IoT colocados no solo e relatórios climáticos em tempo real, os produtores agora sabem a quantidade exata de água e fertilizante necessária por metro quadrado. Isso não apenas preserva os aquíferos, mas diminui os custos de produção drasticamente, gerando uma agricultura de alto nível econômico e ecológico.",
        extraTitle: "Benefício Prático",
        extraDesc: "O uso de sensores de irrigação direcionada de precisão diminui o consumo total de água potável no cultivo em até 40% anuais."
    },
    energia: {
        title: "Energia Renovável no Dia a Dia do Campo",
        image: "http://googleusercontent.com/image_collection/image_retrieval/2715399768348622291_0",
        badge: "Transição Energética",
        text: "A fazenda moderna é autossuficiente. A integração de placas solares fotovoltaicas montadas em áreas de baixa produtividade ou telhados de galpões abastece sistemas inteiros de distribuição. Além disso, o biogás gerado através da conversão e biodigestão de resíduos animais fornece eletricidade limpa constante, cortando custos fixos de eletricidade pública e reduzindo a pegada ecológica da fazenda a zero.",
        extraTitle: "Transformação Sustentável",
        extraDesc: "O biogás de biomassa orgânica evita o descarte nocivo de esterco animal, transformando detritos em energia e fertilizante natural rico em nitrogênio."
    },
    tecnologia: {
        title: "Agricultura Sustentável com Tecnologia de Ponta",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_0",
        badge: "Inovação Tecnológica",
        text: "Drones e Inteligência Artificial revolucionaram a administração da lavoura. Através de leituras espectrais, os drones sobrevoam a plantação detectando instantaneamente focos de pragas e deficiências minerais antes que fiquem visíveis ao olho humano. Isso permite uma ação direta no ponto afetado, evitando a pulverização de remédios químicos em toda a fazenda de forma indiscriminada.",
        extraTitle: "Fato Tecnológico",
        extraDesc: "O mapeamento aéreo por IA pode guiar tratores autônomos na aplicação seletiva de defensivos biológicos apenas nas plantas doentes detectadas."
    },
    impactos: {
        title: "Impactos Ambientais das Novas Tecnologias no Campo",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_1",
        badge: "Preservação Verde",
        text: "A implementação de maquinários com rastreamento GPS inteligente evita a re-passagem desnecessária no mesmo rastro de solo. Esse sistema reduz o consumo de combustíveis fósseis e diminui a compactação destrutiva da terra, permitindo que as raíces respirem melhor e conservem microrganismos importantes. Além disso, o plantio direto sobre a palha evita que o vento e a chuva causem erosões no terreno fértil.",
        extraTitle: "Vantagem Ecológica",
        extraDesc: "Evitar a compactação do solo resulta em melhor absorção das águas das chuvas, reabastecendo lençóis freáticos sem causar enxurradas degradantes."
    },
    educacao: {
        title: "Educação Ambiental com Recursos Digitais",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_3",
        badge: "Educação & Prática",
        text: "Levar a ciência para o produtor rural é a maior barreira para a adoção ecológica. Plataformas de ensino virtual interativas conectam agrônomos especialistas e institutos de pesquisa ao trabalhador de campo. Por meio de manuais digitais intuitivos e análises de mercado, estudantes e produtores aprendem rapidamente as diretrizes de rotação de cultura, agroflorestas e métodos de conservação biológica.",
        extraTitle: "Crescimento Coletivo",
        extraDesc: "Cursos curtos online baseados em aplicativos móveis alcançam milhões de pequenos produtores rurais, democratizando tecnologias de conservação."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Inicialização de Elementos do DOM
    const themeBtn = document.getElementById("themeBtn");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const brandLogo = document.getElementById("brandLogo");
    const navHub = document.getElementById("navHub");
    const navInicio = document.getElementById("navInicio");

    const hubSection = document.getElementById("hub");
    const heroSection = document.getElementById("inicio");
    const detailPanel = document.getElementById("detailPanel");
    const detailCard = document.getElementById("detailCard");
    const btnBackToHub = document.getElementById("btnBackToHub");

    // Configuração e persistência do Modo Escuro
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // Menu Responsivo Mobile
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            mainNav.classList.remove("active");
        });
    });

    /**
     * NOVO REQUISITO: Detecção dinâmica de rolagem
     * Alterna o destaque ativo do menu superior conforme o scroll atinge a área dos tópicos
     */
    window.addEventListener("scroll", () => {
        // Se o painel de detalhes não estiver aberto, monitoramos o scroll comum das seções
        if (detailPanel.style.display !== "block") {
            const hubTop = hubSection.offsetTop;
            const scrollPos = window.scrollY;

            // Retira a ativação se passar do limite superior do hub menos a folga do header (120px)
            if (scrollPos >= (hubTop - 120)) {
                navHub.classList.add("active");
                navInicio.classList.remove("active");
            } else {
                navInicio.classList.add("active");
                navHub.classList.remove("active");
            }
        }
    });

    // Função de gerenciamento de telas: Voltar para a Grade Principal (Hub)
    function resetToHub() {
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: hubSection.offsetTop - 100, behavior: "smooth" });
    }

    brandLogo.addEventListener("click", resetToHub);
    
    navHub.addEventListener("click", (e) => {
        e.preventDefault();
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: hubSection.offsetTop - 100, behavior: "smooth" });
    });
    
    btnBackToHub.addEventListener("click", resetToHub);

    navInicio.addEventListener("click", (e) => {
        e.preventDefault();
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Manipulação do DOM: Montagem e exibição do conteúdo interno da aba
    function showTopicDetail(topicId) {
        hubSection.style.display = "none";
        heroSection.style.display = "none";
        detailPanel.style.display = "block";
        
        // Mantém o menu marcando a área de informações ativa ao ler os detalhes profundos
        navHub.classList.add("active");
        navInicio.classList.remove("active");
        
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (topicId === "simulador") {
            // Injeção da estrutura do Tópico de Simulação
            detailCard.innerHTML = `
                <div class="detail-body">
                    <h4 class="detail-title">Simulador de Eficiência Verde</h4>
                    <p class="detail-text">Adote práticas ecológicas e calcule a economia de recursos hídricos, redução de CO₂ ou proteção de solo gerada pela escala da sua propriedade agrícola!</p>
                    
                    <div class="sim-grid">
                        <div class="sim-form-container">
                            <form id="simForm" class="sim-form" novalidate>
                                <div class="form-group">
                                    <label for="hectaresInput">Tamanho da Terra (Hectares):</label>
                                    <input type="number" id="hectaresInput" placeholder="Exemplo: 45" required>
                                    <div id="simError" class="form-error"></div>
                                </div>

                                <div class="form-group">
                                    <label for="practiceInput">Estratégia Tecnológica:</label>
                                    <select id="practiceInput" required>
                                        <option value="" disabled selected>Selecione um sistema...</option>
                                        <option value="gotejamento">Irrigação por Gotejamento Automatizado</option>
                                        <option value="solar">Painéis Solares Fotovoltaicos</option>
                                        <option value="plantio">Manejo de Plantio Direto na Palha</option>
                                    </select>
                                </div>

                                <button type="submit" class="btn-calc">Gerar Simulação Verde &rarr;</button>
                            </form>
                        </div>

                        <div class="sim-results" id="simResults">
                            <h5>Aguardando Dados...</h5>
                            <p>Preencha os campos ao lado para que a inteligência ambiental calcule o impacto projetado para sua terra.</p>
                        </div>
                    </div>
                </div>
            `;
            attachSimulatorEvents();
        } else {
            // Injeção dos Tópicos Informativos Tradicionais
            const info = dbTopics[topicId];
            if (!info) return;

            detailCard.innerHTML = `
                <img class="detail-header-img" src="${info.image}" alt="${info.title}">
                <div class="detail-body">
                    <h4 class="detail-title">${info.title}</h4>
                    <p class="detail-text">${info.text}</p>
                    <div class="interactive-extra">
                        <h5>${info.extraTitle}</h5>
                        <p>${info.extraDesc}</p>
                    </div>
                </div>
            `;
        }
    }

    // Vincula eventos de clique aos cards/quadrados informativos
    const cards = document.querySelectorAll(".topic-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const topicId = card.getAttribute("data-topic-id");
            showTopicDetail(topicId);
        });
    });

    // Lógica Matemática e Mensagens Dinâmicas do Simulador
    function attachSimulatorEvents() {
        const simForm = document.getElementById("simForm");
        const hectaresInput = document.getElementById("hectaresInput");
        const practiceInput = document.getElementById("practiceInput");
        const simError = document.getElementById("simError");
        const simResults = document.getElementById("simResults");

        simForm.addEventListener("submit", (e) => {
            e.preventDefault();
            simError.textContent = "";

            const hectares = parseFloat(hectaresInput.value);
            const practice = practiceInput.value;

            // Validação simples obrigatória
            if (isNaN(hectares) || hectares <= 0) {
                simError.textContent = "Digite uma área territorial válida e superior a 0 hectares.";
                hectaresInput.focus();
                return;
            }

            if (!practice) {
                simError.textContent = "Por favor, selecione uma tecnologia ecológica do painel.";
                return;
            }

            let resultHtml = "";
            if (practice === "gotejamento") {
                const aguaSalva = hectares * 15000;
                resultHtml = `
                    <h5>Excelente Escolha Ecológica!</h5>
                    <p>Adotando a irrigação robotizada inteligente em sua lavoura de <strong>${hectares} hectares</strong>, a economia anual de água limpa pode alcançar:</p>
                    <span class="badge-saving">${aguaSalva.toLocaleString('pt-BR')} Litros Poupados</span>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">Isso reduz a energia das bombas hídricas e preserva os mananciais vizinhos.</p>
                `;
            } else if (practice === "solar") {
                const co2Evitado = hectares * 180;
                resultHtml = `
                    <h5>Energia Limpa Ativada!</h5>
                    <p>Utilizando geradores fotovoltaicos de apoio ecológico em sua terra de <strong>${hectares} hectares</strong>, você ajuda a evitar emissões prejudiciais de CO₂:</p>
                    <span class="badge-saving">${co2Evitado.toLocaleString('pt-BR')} kg de CO₂ p/ ano</span>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">Isto equivale ao plantio de cerca de ${(hectares * 12).toFixed(0)} árvores novas.</p>
                `;
            } else if (practice === "plantio") {
                const soloPreservado = hectares * 4;
                resultHtml = `
                    <h5>Manejo Biológico Conservado!</h5>
                    <p>Ao realizar o Plantio Direto sobre cobertura vegetal morta em sua propriedade rural de <strong>${hectares} hectares</strong>, você conserva:</p>
                    <span class="badge-saving">${soloPreservado} Toneladas de nutrientes retidos</span>
                    <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.9;">Sua plantação ganha imunidade hídrica contra períodos inesperados de seca prolongada.</p>
                `;
            }

            simResults.innerHTML = resultHtml;
        });
    }
});