export async function carregarPersonagens() {
    const res = await fetch("http://localhost:3000/marvel");
    const personagens = await res.json();
  
    const container = document.getElementById("listaPersonagens");
    container.innerHTML = "";
  
    personagens.forEach(p => {
      let imgUrl = p.imagem;
  
      if (imgUrl.startsWith("http://")) {
        imgUrl = imgUrl.replace("http://", "https://");
      }
  
      if (imgUrl.includes("image_not_available")) return;
  
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <img src="${imgUrl}" alt="${p.nome}">
        <h3>${p.nome}</h3>
        <p class="descricao">${p.descricao}</p>
        <p class="preco">R$ ${p.preco}</p>
        <button onclick="alert('Adicionado ${p.nome} à loja!')">Adicionar</button>
      `;
  
      container.appendChild(card);
    });
  }
  