const form = document.getElementById("formNotas");
const resultado = document.getElementById("resultado");
const limparBtn = document.getElementById("limpar");

// carregar dados salvos
window.onload = () => {
    ["a1", "p1", "pi", "a2", "p2"].forEach(id => {
        const valor = localStorage.getItem(id);
        if (valor) document.getElementById(id).value = valor;
    });
};

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const a1 = parseFloat(document.getElementById("a1").value);
    const p1 = parseFloat(document.getElementById("p1").value);
    const pi = parseFloat(document.getElementById("pi").value);
    const a2 = parseFloat(document.getElementById("a2").value);
    const p2 = parseFloat(document.getElementById("p2").value);

    const notas = [a1, p1, pi, a2, p2];

    if (notas.some(n => isNaN(n))) {
        mostrarResultado("Preencha todos os campos!", "erro");
        return;
    }

    if (notas.some(n => n < 0 || n > 10)) {
        mostrarResultado("Notas devem estar entre 0 e 10!", "erro");
        return;
    }

    // salvar no navegador
    ["a1", "p1", "pi", "a2", "p2"].forEach((id, i) => {
        localStorage.setItem(id, notas[i]);
    });

    const n1 = (a1 + p1) / 2;
    const n2 = pi;
    const n3 = (a2 + p2) / 2;
    const media = (n1 + n2 + n3) / 3;

    if (media >= 7) {
        mostrarResultado(`Média: ${media.toFixed(2)} - Aprovado ✅`, "aprovado");
    } else {
        mostrarResultado(`Média: ${media.toFixed(2)} - Reprovado ❌`, "reprovado");
    }
});

// botão limpar
limparBtn.addEventListener("click", () => {
    form.reset();
    resultado.innerHTML = "";
    resultado.className = "";

    ["a1", "p1", "pi", "a2", "p2"].forEach(id => {
        localStorage.removeItem(id);
    });
});

function mostrarResultado(msg, tipo) {
    resultado.innerHTML = msg;
    resultado.className = "";
    resultado.classList.add("mostrar");

    if (tipo) resultado.classList.add(tipo);
}