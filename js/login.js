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

document.getElementById('formLogin').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    let clientes = carregarClientes();
    const usuario = clientes.find(c => c.email === email);

    if (usuario && usuario.validarSenha(senha)) {
        setLoginAtual(email);
        alert(`Bem-vindo, ${usuario.nome}`);
        window.location.href = 'index.html';
    } else {
        alert('Email ou senha inválidos!');
    }
});
