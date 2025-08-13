import Cliente from './Cliente.js';
import { carregarClientes, salvarClientes, setLoginAtual } from './storage.js';

document.getElementById('formCadastro').addEventListener('submit', e => {
    e.preventDefault();
    const cliente = new Cliente(
        document.getElementById('nome').value,
        document.getElementById('sobrenome').value,
        document.getElementById('cpf').value,
        document.getElementById('telefone').value,
        document.getElementById('endereco').value,
        document.getElementById('pagamento').value,
        document.getElementById('email').value,
        document.getElementById('senha').value
    );

    let clientes = carregarClientes();
    clientes.push(cliente);
    salvarClientes(clientes);
    alert('Cadastro realizado com sucesso!');
});

let clientes = JSON.parse(localStorage.getItem("clientes") || "[]")
    .map(Cliente.fromJSON);

document.getElementById("btnLoginCliente").addEventListener("click", () => {
    const email = document.getElementById("clienteEmail").value;
    const senha = document.getElementById("clienteSenha").value;

    const cliente = clientes.find(c => c.email === email && c.senha === senha);

    if (cliente) {
        sessionStorage.setItem("clienteLogado", JSON.stringify(cliente));
        window.location.href = "loja.html"; 
    } else {
        alert("E-mail ou senha inválidos!");
    }
});
