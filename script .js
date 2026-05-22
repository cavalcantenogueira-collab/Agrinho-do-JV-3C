/**
 * PROJETO: Agro Forte, Futuro Sustentável
 * ARQUIVO: script.js
 * DESCRIÇÃO: Controla a interatividade dos tópicos, alternância de tema,
 *            responsividade do menu mobile e validação com simulação lógica.
 */

// Base de Dados dos Tópicos para Injeção Dinâmica no DOM
const topicsData = {
    consumo: {
        title: "Consumo Consciente e Redução de Desperdício",
        description: "A otimização de recursos começa com a gestão precisa dos insumos. O uso de sensores de umidade no solo e monitoramento via satélite impede o desperdício de água potável e a aplicação excessiva de fertilizantes, protegendo os lençóis freáticos e reduzindo custos operacionais.",
        image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=600&q=80"
    },
    energia: {
        title: "Energia Renovável no Dia a Dia",
        description: "A transição energética no campo é uma realidade viável. A integração de matrizes solares fotovoltaicas para alimentação de pivôs de irrigação, associada à conversão de biomassa e resíduos orgânicos animais em biogás, confere autossuficiência e resiliência às propriedades rurais.",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
    },
    tecnologia: {
        title: "Agricultura Sustentável com Tecnologia",
        description: "A agricultura de precisão emprega inteligência artificial e drones para mapear falhas em lavouras. Tratores e maquinários autônomos realizam o plantio com distanciamento milimétrico, reduzindo a compactação do solo e maximizando a colheita por metro quadrado de forma limpa.",
        image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
    },
    impactos: {
        title: "Impactos Ambientais das Novas Tecnologias",
        description: "As inovações tecnológicas atuam diretamente na mitigação das pegadas de carbono. Ao permitir a transição para sistemas de plantio direto e rotação de culturas assistida por softwares, os novos mecanismos agrícolas preservam microrganismos vitais do solo e retêm mais CO₂.",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80"
    },
    educacao: {
        title: "Educação Ambiental com Recursos Digitais",
        description: "Capacitar o trabalhador do campo e aproximar a sociedade da produção sustentável é fundamental. Plataformas de ensino à distância (EAD), simulações virtuais e dados abertos conectam centros de pesquisa diretamente ao produtor rural, acelerando a adoção de boas práticas.",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
    }
};

// Inicialização do DOM e Mapeamento de Elementos
document.addEventListener("DOMContentLoaded", () => {
    // Seletores Gerais
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const contentDisplay = document.getElementById("contentDisplay");
    
    // Seletores do Simulador
    const simulatorForm = document.getElementById("simulatorForm");
    const hectaresInput = document.getElementById("hectares");
    const practiceSelect = document.getElementById("practiceSelect");
    const inputError = document.getElementById("inputError");
    const simulatorResult = document.getElementById("simulatorResult");
    const resultText = document.getElementById("resultText");

    /**
     * GESTÃO DE TEMA (MODO ESCURO)
     * Verifica preferência salva no navegador ou aplica o padrão light
     */
    const currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    themeToggle.addEventListener("click", () => {
        let theme = "light";
        if (document.documentElement.getAttribute("data-theme") !== "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            theme = "dark";
        } else {
            document.documentElement.removeAttribute("data-theme");
        }
        localStorage.setItem("theme", theme);
    });

    /**
     * NAVEGAÇÃO MOBILE (MENU HAMBÚRGUER)
     */
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");
    });

    // Fecha o menu mobile ao clicar em um link
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
            
            // Gerencia classe ativa visual do menu superior
            mainNav.querySelectorAll("a").forEach(item => item.classList.remove("active"));
            link.classList.add("active");
        });
    });

    /**
     * NAVEGAÇÃO DINÂMICA POR TÓPICOS (ABAS/TABS)
     */
    function renderTopic(topicKey) {
        const data = topicsData[topicKey];
        if (!data) return;

        // Injeta a estrutura HTML estruturada com base nas regras do CSS Flexbox
        contentDisplay.innerHTML = `
            <div class="topic-grid">
                <div class="topic-text">
                    <h4>${data.title}</h4>
                    <p>${data.description}</p>
                </div>
                <img src="${data.image}" alt="Representação visual de ${data.title}" class="topic-image">
            </div>
        `;
    }

    // Adiciona evento de clique para cada botão de aba
    tabButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            
            const selectedTopic = e.target.getAttribute("data-topic");
            renderTopic(selectedTopic);
        });
    });

    // Renderização inicial do primeiro tópico padrão
    renderTopic("consumo");

    /**
     * VALIDAÇÃO DE FORMULÁRIO E SIMULADOR LÓGICO
     */
    simulatorForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Impede o envio real do formulário
        
        const hectares = parseFloat(hectaresInput.value);
        const practice = practiceSelect.value;
        
        // Limpa estados de erro anteriores
        inputError.textContent = "";
        simulatorResult.classList.add("hidden");

        // Validação Manual Customizada
        if (isNaN(hectares) || hectares <= 0) {
            inputError.textContent = "Por favor, insira um valor maior que zero.";
            hectaresInput.focus();
            return;
        }

        if (!practice) {
            alert("Selecione uma prática agrícola válida.");
            return;
        }

        // Execução da lógica com base na escolha do usuário
        let resultadoCalculado = "";

        switch (practice) {
            case "solar":
                const kwhEconomizados = hectares * 145;
                resultadoCalculado = `Ao converter áreas de infraestrutura para captação solar em sua propriedade de ${hectares} hectares, a redução estimada de emissão de CO₂ é de aproximadamente ${(kwhEconomizados * 0.5).toFixed(1)} kg por mês, devido à geração limpa de energia.`;
                break;
            case "gotejamento":
                const litrosAgua = hectares * 12000;
                resultadoCalculado = `A substituição dos sistemas tradicionais por gotejamento automatizado em ${hectares} hectares gerará uma economia estimada de até ${litrosAgua.toLocaleString('pt-BR')} litros de água por safra, mantendo a umidade ideal da raiz.`;
                break;
            case "plantio":
                const nitrogenioRetido = hectares * 45;
                resultadoCalculado = `O manejo por Plantio Direto em sua propriedade de ${hectares} hectares evitará a erosão severa do solo e fixará cerca de ${nitrogenioRetido} kg de nutrientes orgânicos nativos na terra sem a necessidade de aditivos químicos agressivos.`;
                break;
            default:
                resultadoCalculado = "Prática não reconhecida pelo sistema.";
        }

        // Apresentação dos dados de forma dinâmica e fluida
        resultText.textContent = resultadoCalculado;
        simulatorResult.classList.remove("hidden");
    });
});
