const botao = document.getElementById("saibaMais");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", () => {
    mensagem.textContent =
    "A sustentabilidade garante produção agrícola e preservação ambiental.";
});

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const resultado = document.getElementById("resultado");

    if(nome === "" || email === ""){
        resultado.textContent = "Preencha todos os campos.";
        resultado.style.color = "red";
    } else {
        resultado.textContent = "Cadastro realizado com sucesso!";
        resultado.style.color = "green";
    }
});

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".menu-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(sec => {
        if(window.scrollY >= sec.offsetTop - 200){
            current = sec.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }
    });

});