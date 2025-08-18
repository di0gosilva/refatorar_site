//tabs para cadastro e login
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
    // Remove "active" de todos
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // Ativa a tab clicada
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
    });
});

// Funções para LocalStorage
function carregarClientes() {
return JSON.parse(localStorage.getItem("clientes")) || [];
}

function salvarClientes(clientes) {
localStorage.setItem("clientes", JSON.stringify(clientes));
}

// CADASTRO
document.getElementById("formCadastro").addEventListener("submit", e => {
e.preventDefault();

const cliente = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    cpf: document.getElementById("cpf").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    pagamento: document.getElementById("pagamento").value,
    email: document.getElementById("email").value,
    senha: document.getElementById("senha").value
};

let clientes = carregarClientes();

// impede cadastro duplicado pelo mesmo email
if (clientes.some(c => c.email === cliente.email)) {
    alert("Já existe um cadastro com este e-mail!");
    return;
}

clientes.push(cliente);
salvarClientes(clientes);

alert("Cadastro realizado com sucesso!");
e.target.reset(); // limpa o formulário
});

// LOGIN
document.getElementById("formLogin").addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;

    let clientes = carregarClientes();

    const clienteEncontrado = clientes.find(c => c.email === email && c.senha === senha);

    if (clienteEncontrado) {
        sessionStorage.setItem("clienteLogado", JSON.stringify(clienteEncontrado));
        alert("Login realizado com sucesso!");
        window.location.href = "index.html"; 
    } else {
        alert("E-mail ou senha inválidos!");
    }
});