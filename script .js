/**
 * PROJETO: Agro Forte, Futuro Sustentável
 * ARQUIVO: script.js
 */

const dbTopics = {
    consumo: {
        title: "Consumo Consciente e Redução de Desperdício",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_2",
        text: "O consumo consciente no agronegócio foca na eliminação planejada do desperdício de insumos hídricos e de compostos biológicos...",
        extraTitle: "Benefício Prático",
        extraDesc: "O uso de sensores de irrigação direcionada de precisão diminui o consumo total de água potável no cultivo em até 40% anuais."
    },
    energia: {
        title: "Energia Renovável no Dia a Dia do Campo",
        image: "http://googleusercontent.com/image_collection/image_retrieval/2715399768348622291_0",
        text: "A fazenda moderna é autossuficiente. A integração de placas solares fotovoltaicas montadas em áreas de baixa produtividade...",
        extraTitle: "Transformação Sustentável",
        extraDesc: "O biogás de biomassa orgânica evita o descarte nocivo de esterco animal, transformando detritos em energia."
    },
    tecnologia: {
        title: "Agricultura Sustentável com Tecnologia de Ponta",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_0",
        text: "Drones e Inteligência Artificial revolucionaram a administração da lavoura. Através de leituras espectrais...",
        extraTitle: "Fato Tecnológico",
        extraDesc: "O mapeamento aéreo por IA pode guiar tratores autônomos na aplicação seletiva de defensivos biológicos."
    },
    impactos: {
        title: "Impactos Ambientais das Novas Tecnologias no Campo",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_1",
        text: "A implementação de maquinários com rastreamento GPS inteligente evita a re-passagem desnecessária no mesmo rastro de solo...",
        extraTitle: "Vantagem Ecológica",
        extraDesc: "Evitar a compactação do solo resulta em melhor absorção das águas das chuvas."
    },
    educacao: {
        title: "Educação Ambiental com Recursos Digitais",
        image: "http://googleusercontent.com/image_collection/image_retrieval/16861845410880397731_3",
        text: "Levar a ciência para o produtor rural é a maior barreira para a abraçar a ecologia. Plataformas de ensino virtual...",
        extraTitle: "Crescimento Coletivo",
        extraDesc: "Cursos curtos online baseados em aplicativos móveis alcançam milhões de pequenos produtores rurais."
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const navInicio = document.getElementById("navInicio");
    const navHub = document.getElementById("navHub");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const themeBtn = document.getElementById("themeBtn");
    const brandLogo = document.getElementById("brandLogo");

    const heroSection = document.getElementById("inicio");
    const hubSection = document.getElementById("hub");
    const detailPanel = document.getElementById("detailPanel");
    const detailCard = document.getElementById("detailCard");
    const btnBackToHub = document.getElementById("btnBackToHub");

    // LÓGICA DO SCROLL CORRIGIDA
    window.addEventListener("scroll", () => {
        if (detailPanel.style.display !== "block") {
            // Pega a posição exata do topo da seção do painel em relação à tela
            const hubTop = hubSection.getBoundingClientRect().top;

            // Se o topo da seção do painel atingir a metade superior da tela do usuário
            if (hubTop <= window.innerHeight / 2) {
                navHub.classList.add("active");
                navInicio.classList.remove("active");
            } else {
                navInicio.classList.add("active");
                navHub.classList.remove("active");
            }
        }
    });

    function resetToHub() {
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: hubSection.offsetTop - 90, behavior: "smooth" });
    }

    navInicio.addEventListener("click", (e) => {
        e.preventDefault();
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    navHub.addEventListener("click", (e) => {
        e.preventDefault();
        detailPanel.style.display = "none";
        hubSection.style.display = "block";
        heroSection.style.display = "flex";
        window.scrollTo({ top: hubSection.offsetTop - 90, behavior: "smooth" });
    });

    brandLogo.addEventListener("click", resetToHub);
    btnBackToHub.addEventListener("click", resetToHub);

    function showTopicDetail(topicId) {
        hubSection.style.display = "none";
        heroSection.style.display = "none";
        detailPanel.style.display = "block";
        
        navHub.classList.add("active");
        navInicio.classList.remove("active");
        
        window.scrollTo({ top: 0, behavior: "smooth" });

        if (topicId === "simulador") {
            detailCard.innerHTML = `
                <div class="detail-body">
                    <h4 class="detail-title">Simulador de Eficiência Verde</h4>
                    <p class="detail-text">Adote práticas ecológicas e calcule a economia de recursos hídricos para sua propriedade agrícola!</p>
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
                            <p>Preencha os campos ao lado para calcular o impacto projetado para sua terra.</p>
                        </div>
                    </div>
                </div>
            `;
            attachSimulatorEvents();
        } else {
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

    document.querySelectorAll(".topic-card").forEach(card => {
        card.addEventListener("click", () => {
            const topicId = card.getAttribute("data-topic-id");
            showTopicDetail(topicId);
        });
    });

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

            if (isNaN(hectares) || hectares <= 0) {
                simError.textContent = "Digite uma área territorial válida superior a 0 hectares.";
                return;
            }
            if (!practice) {
                simError.textContent = "Por favor, selecione uma tecnologia ecológica.";
                return;
            }

            let resultHtml = "";
            if (practice === "gotejamento") {
                resultHtml = `
                    <h5>Excelente Escolha Ecológica!</h5>
                    <p>Economia anual de água limpa estimada em:</p>
                    <span class="badge-saving">${(hectares * 15000).toLocaleString('pt-BR')} Litros Poupados</span>
                `;
            } else if (practice === "solar") {
                resultHtml = `
                    <h5>Energia Limpa Ativada!</h5>
                    <p>Evita emissões prejudiciais de CO₂ estimadas em:</p>
                    <span class="badge-saving">${(hectares * 180).toLocaleString('pt-BR')} kg de CO₂ p/ ano</span>
                `;
            } else if (practice === "plantio") {
                resultHtml = `
                    <h5>Manejo Biológico Conservado!</h5>
                    <p>Sua propriedade rural conserva cerca de:</p>
                    <span class="badge-saving">${hectares * 4} Toneladas de nutrientes retidos</span>
                `;
            }
            simResults.innerHTML = resultHtml;
        });
    }

    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }
    themeBtn.addEventListener("click", () => {
        if (document.documentElement.getAttribute("data-theme") === "dark") {
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    menuToggle.addEventListener("click", () => mainNav.classList.toggle("active"));
    mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("active")));
});