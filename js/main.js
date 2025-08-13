// main.js
import Produto from './Produto.js';
import Cliente from './Cliente.js';

let produtos = JSON.parse(localStorage.getItem('produtos') || '[]')
    .map(Produto.fromJSON);

let clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    .map(Cliente.fromJSON);

function cadastrarProduto() {
    const nome = document.getElementById('produto').value;
    const descricao = document.getElementById('descricao').value;
    const codigo = document.getElementById('codigo').value;
    const preco = document.getElementById('preco').value;
    const link = document.getElementById('linkAmazon').value;

    const novoProduto = new Produto(nome, descricao, codigo, preco, link);

    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos.map(p => p.toJSON())));

    alert('Produto cadastrado com sucesso!');
}
