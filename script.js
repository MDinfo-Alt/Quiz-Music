let perguntas = [];
let perguntaAtual = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const mensagemEl = document.getElementById("mensagem");
const quizEl = document.getElementById("quiz");
const finalEl = document.getElementById("final");

fetch("perguntas.json")
    .then(response => response.json())
    .then(data => {
        perguntas = data;
        carregarPergunta(); // SÓ aqui
    })
    .catch(error => {
        perguntaEl.textContent = "Erro ao carregar perguntas.";
        console.error(error);
    });

function carregarPergunta() {
    mensagemEl.textContent = "";
    mensagemEl.style.color = "#e6fff2";
    opcoesEl.innerHTML = "";

    const p = perguntas[perguntaAtual];
    perguntaEl.textContent = p.pergunta;

    p.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.textContent = opcao;
        botao.onclick = () => verificarResposta(index);
        opcoesEl.appendChild(botao);
    });
}

function verificarResposta(resposta) {
    if (resposta === perguntas[perguntaAtual].correta) {
        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            carregarPergunta();
        } else {
            quizEl.classList.add("hidden");
            finalEl.classList.remove("hidden");
        }
    } else {
        mensagemEl.textContent = "❌ Resposta errada! Tente novamente.";
        mensagemEl.style.color = "red";
    }
}
