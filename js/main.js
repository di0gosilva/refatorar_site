const produtos = [
{ img: "./imagens/img0.jpg", nome: "Produto 1", preco: 50 },
{ img: "./imagens/img1.jpg", nome: "Produto 2", preco: 60 },
{ img: "./imagens/img2.jpg", nome: "Produto 3", preco: 75 },
{ img: "./imagens/img3.jpg", nome: "Produto 4", preco: 120 },
{ img: "./imagens/img4.jpg", nome: "Produto 5", preco: 30 },
{ img: "./imagens/img5.jpg", nome: "Produto 6", preco: 60 },
{ img: "./imagens/img6.jpg", nome: "Produto 7", preco: 80 },
{ img: "./imagens/img7.jpg", nome: "Produto 8", preco: 100 },
{ img: "./imagens/img8.jpg", nome: "Produto 9", preco: 45 },
{ img: "./imagens/img9.jpg", nome: "Produto 10", preco: 90 },
{ img: "./imagens/img10.jpg", nome: "Produto 11", preco: 50 },
{ img: "./imagens/img11.jpg", nome: "Produto 12", preco: 60 },
{ img: "./imagens/img12.jpg", nome: "Produto 13", preco: 70 },
{ img: "./imagens/img13.jpg", nome: "Produto 14", preco: 80 },
];

const container = document.getElementById("listaProdutos");

produtos.forEach(prod => {
const card = document.createElement("div");
card.classList.add("card");

card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nome}">
    <h3>${prod.nome}</h3>
    <p>R$ ${prod.preco.toFixed(2)}</p>
`;

container.appendChild(card);
});
