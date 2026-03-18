async function buscar() {
  const termo = document.getElementById("pesquisa").value;
  const resultado = document.getElementById("resultado");

  if (!termo) {
    resultado.innerHTML = "<p>Escreva aqui...</p>";
    return;
  }

  resultado.innerHTML = "Carregando...";

  try {
    const resposta = await fetch(
      `https://itunes.apple.com/search?term=${termo}&media=music&limit=8`
    );

    const dados = await resposta.json();

    resultado.innerHTML = "";

    if (!dados.results || dados.results.length === 0) {
      resultado.innerHTML = "<p>Nenhuma música encontrada </p>";
      return;
    }

    dados.results.forEach(musica => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${musica.artworkUrl100}">
        <h3>${musica.trackName}</h3>
        <p>${musica.artistName}</p>
        <audio controls src="${musica.previewUrl}"></audio>
      `;

      resultado.appendChild(card);
    });

  } catch (erro) {
    console.log(erro);
    resultado.innerHTML = "<p>Erro ao buscar músicas</p>";
  }
}

// ENTER para buscar
document.getElementById("pesquisa").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    buscar();
  }
});