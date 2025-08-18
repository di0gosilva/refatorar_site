import { carregarProdutos, salvarProdutos, getLoginAtual } from './storage.js';

const produtos = carregarProdutos();
const carrinho = produtos.filter(p => p.qtd > 0);

const lista = document.getElementById('listaCarrinho');
const total = document.getElementById('totalCarrinho');

let totalGeral = 0;
carrinho.forEach(p => {
    totalGeral += p.getTotal();
    const li = document.createElement('li');
    li.textContent = `${p.qtd}x ${p.nome} - R$ ${p.getTotal().toFixed(2)}`;
    lista.appendChild(li);
});

total.textContent = `Total: R$ ${totalGeral.toFixed(2)}`;

document.getElementById('finalizarCompra').addEventListener('click', () => {
    if (!getLoginAtual()) {
        alert('Faça login antes de finalizar a compra!');
        return;
    }
    alert('Compra realizada com sucesso!');
    produtos.forEach(p => p.qtd = 0);
    salvarProdutos(produtos);
    window.location.href = 'index.html';
});
