// BOTÃO SAIBA MAIS

const botao = document.getElementById("saibaMais");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {

    mensagem.textContent =
    "A agricultura sustentável garante produtividade e preservação ambiental para as futuras gerações.";

});


// MODO ESCURO

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

});


// VALIDAÇÃO DO FORMULÁRIO

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const resultado = document.getElementById("resultado");

    if(nome === "" || email === ""){

        resultado.textContent =
        "Preencha todos os campos.";

        resultado.style.color = "red";

    }
    else{

        resultado.textContent =
        "Cadastro realizado com sucesso!";

        resultado.style.color = "green";

    }

});


// MENU ATIVO POR ROLAGEM

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 200;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});


// EFEITO DOS CARDS

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.05)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "scale(1)";

    });

});