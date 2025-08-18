//acessar o user admin
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";


const secLogin = document.getElementById("loginAdmin");
const secPainel = document.getElementById("areaAdmin");
const btnLogin = document.getElementById("btnAdminLogin");
const btnLogout = document.getElementById("btnLogout");

// Tabela, formulário e busca
const formProduto = document.getElementById("formProduto");
const tabelaProdutos = document.getElementById("tabelaProdutos");
const buscaProduto = document.getElementById("buscaProduto");
const divUser = document.querySelector(".user")

// Variável para saber se está editando
let editIndex = null;

// Verifica se já está logado
if (sessionStorage.getItem("adminLogado") === "true") {
    mostrarPainel();
} else {
    mostrarLogin();
}

// mostrar login
function mostrarLogin() {
    secLogin.style.display = "block";
    secPainel.style.display = "none";
    btnLogout.style.display = "none";
    divUser.style.display = "flex";
}

// mostrar painel
function mostrarPainel() {
    secLogin.style.display = "none";
    secPainel.style.display = "block";
    btnLogout.style.display = "block";
    divUser.style.display = "none";
    carregarProdutos();
}

// login
btnLogin.addEventListener("click", () => {
    const user = document.getElementById("adminUser").value;
    const pass = document.getElementById("adminPass").value;

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        sessionStorage.setItem("adminLogado", "true");
        mostrarPainel();
    } else {
        alert("Usuário ou senha inválidos!");
    }
});

// Logout
btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem("adminLogado");
    mostrarLogin();
});


// Carregar produtos do localStorage
function carregarProdutos(filtro = "") {
    tabelaProdutos.innerHTML = "";
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    produtos
        .filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()))
        .forEach((produto, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>
                <td>
                    <button class="btnEditar" data-index="${index}">Editar</button>
                    <button class="btnExcluir" data-index="${index}">Excluir</button>
                </td>
            `;

            tabelaProdutos.appendChild(tr);
        });

    // Vincula eventos de exclusão
    document.querySelectorAll(".btnExcluir").forEach(btn => {
        btn.addEventListener("click", (e) => {
            excluirProduto(e.target.dataset.index);
        });
    });

    // Vincula eventos de edição
    document.querySelectorAll(".btnEditar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            editarProduto(e.target.dataset.index);
        });
    });
}

// Salvar novo produto ou editar existente
formProduto.addEventListener("submit", (e) => {
    e.preventDefault();

    const produto = {
        nome: document.getElementById("nomeProduto").value,
        desc: document.getElementById("descProduto").value,
        codigo: document.getElementById("codigoProduto").value,
        preco: document.getElementById("precoProduto").value,
        link: document.getElementById("linkProduto").value
    };

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (editIndex === null) {
        // Novo produto
        produtos.push(produto);
    } else {
        // Editar produto
        produtos[editIndex] = produto;
        editIndex = null;
        formProduto.querySelector("button[type='submit']").innerText = "Cadastrar Produto";
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    formProduto.reset();
    carregarProdutos();
});

// Excluir produto
function excluirProduto(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos.splice(index, 1);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos(buscaProduto.value);
}

// Editar produto
function editarProduto(index) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = produtos[index];

    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("descProduto").value = produto.desc;
    document.getElementById("codigoProduto").value = produto.codigo;
    document.getElementById("precoProduto").value = produto.preco;
    document.getElementById("linkProduto").value = produto.link;

    editIndex = index;
    formProduto.querySelector("button[type='submit']").innerText = "Salvar Alterações";
}

// busca o produto
buscaProduto.addEventListener("input", (e) => {
    carregarProdutos(e.target.value);
});