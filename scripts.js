function obterNivel(xp) {
  if (xp < 1000) return { nivel: "Ferro", emoji: "🪨" };
  else if (xp <= 2000) return { nivel: "Bronze", emoji: "🥉" };
  else if (xp <= 5000) return { nivel: "Prata", emoji: "🥈" };
  else if (xp <= 7000) return { nivel: "Ouro", emoji: "🥇" };
  else if (xp <= 8000) return { nivel: "Platina", emoji: "💎" };
  else if (xp <= 9000) return { nivel: "Ascendente", emoji: "🚀" };
  else if (xp <= 10000) return { nivel: "Imortal", emoji: "🛡️" };
  else return { nivel: "Radiante", emoji: "💫" };
}

function classificarHeroi() {
  const nome = document.getElementById("nomeHeroi").value.trim();
  const xp = parseInt(document.getElementById("xpHeroi").value);
  const resultado = document.getElementById("resultado");

  if (!nome || isNaN(xp) || xp < 0) {
    resultado.textContent = "⚠️ Por favor, insira um nome válido e XP positivo!";
    return;
  }

  const { nivel, emoji } = obterNivel(xp);
  resultado.textContent = `O Herói de nome ${nome} está no nível de ${nivel} ${emoji}`;

  adicionarAoRanking(nome, xp, nivel, emoji);
  salvarRanking();
}

function adicionarAoRanking(nome, xp, nivel, emoji) {
  const tbody = document.querySelector("#tabelaRanking tbody");
  const linha = document.createElement("tr");
  linha.innerHTML = `<td>${nome}</td><td>${xp}</td><td>${nivel}</td><td>${emoji}</td>`;
  tbody.appendChild(linha);
  ordenarRanking();
}

function ordenarRanking() {
  const tbody = document.querySelector("#tabelaRanking tbody");
  const linhas = Array.from(tbody.querySelectorAll("tr"));
  linhas.sort((a, b) => parseInt(b.children[1].textContent) - parseInt(a.children[1].textContent));
  linhas.forEach(linha => tbody.appendChild(linha));
}

function alternarRanking() {
  const rankingDiv = document.getElementById("ranking");
  rankingDiv.style.display = rankingDiv.style.display === "none" ? "block" : "none";
}

function salvarRanking() {
  const tbody = document.querySelector("#tabelaRanking tbody");
  const herois = [];
  tbody.querySelectorAll("tr").forEach(linha => {
    const [nome, xp, nivel, emoji] = Array.from(linha.children).map(td => td.textContent);
    herois.push({ nome, xp, nivel, emoji });
  });
  localStorage.setItem("herois", JSON.stringify(herois));
}

function carregarRanking() {
  const dadosSalvos = localStorage.getItem("herois");
  if (!dadosSalvos) return;
  const herois = JSON.parse(dadosSalvos);
  herois.forEach(h => adicionarAoRanking(h.nome, h.xp, h.nivel, h.emoji));
}

window.onload = carregarRanking;
