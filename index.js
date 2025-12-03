/*dark mode*/
const botao = document.getElementById("botao-darkmode");

botao.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        botao.textContent = "☀️";
    } else {
        botao.textContent = "🌙";
    }
});

/*contador de likes e dislikes*/

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".cards section").forEach((card, index) => {

        const likeBtn = card.querySelector(".btn-like");
        const dislikeBtn = card.querySelector(".btn-dislike");

        const likeCounter = card.querySelector(".contador-like");
        const dislikeCounter = card.querySelector(".contador-dislike");

        let likes = 0;
        let dislikes = 0;

        likeBtn.addEventListener("click", () => {
            likes++;
            likeCounter.textContent = likes;
        });

        dislikeBtn.addEventListener("click", () => {
            dislikes++;
            dislikeCounter.textContent = dislikes;
        });

    });

});

// Seleção do modal
const modal = document.getElementById("modal-comentarios");
const tituloPonto = document.getElementById("titulo-ponto");
const campoComentario = document.getElementById("campo-comentario");
const listaComentarios = document.getElementById("lista-comentarios");
const fechar = document.querySelector(".fechar-modal");
const btnSalvar = document.getElementById("btn-salvar-comentario");

let pontoAtual = ""; // ID do card selecionado

// Quando clicar no botão de comentar
document.querySelectorAll(".btn-coment").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest("section");
        pontoAtual = card.id;    // pega o ID do ponto turístico

        // Mostrar o título personalizado
        let titulo = card.querySelector("h3").innerText;
        tituloPonto.innerText = `Comentários sobre ${titulo}`;

        // Carregar comentários salvos
        carregarComentarios();

        modal.style.display = "flex";
    });
});

// Fechar modal
fechar.addEventListener("click", () => {
    modal.style.display = "none";
});

// Se clicar fora da caixa, fecha
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Salvar comentário no localStorage
btnSalvar.addEventListener("click", () => {
    let texto = campoComentario.value.trim();

    if (texto === "") return;

    let comentarios = JSON.parse(localStorage.getItem(pontoAtual)) || [];

    comentarios.push(texto);

    localStorage.setItem(pontoAtual, JSON.stringify(comentarios));

    campoComentario.value = "";
    carregarComentarios();
});

// Mostrar comentários
function carregarComentarios() {
    let comentarios = JSON.parse(localStorage.getItem(pontoAtual)) || [];

    listaComentarios.innerHTML = "";

    comentarios.forEach((c) => {
        let p = document.createElement("p");
        p.innerText = c;
        listaComentarios.appendChild(p);
    });
}
