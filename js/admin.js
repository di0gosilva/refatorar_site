// Credenciais fixas
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234";

// Elementos
const secLogin = document.getElementById("loginAdmin");
const secPainel = document.getElementById("areaAdmin");
const btnLogin = document.getElementById("btnAdminLogin");
const btnLogout = document.getElementById("btnLogout");

// Verifica se já está logado
if (sessionStorage.getItem("adminLogado") === "true") {
    mostrarPainel();
} else {
    mostrarLogin();
}

// Função para mostrar login
function mostrarLogin() {
    secLogin.style.display = "block";
    secPainel.style.display = "none";
    btnLogout.style.display = "none";
}

// Função para mostrar painel
function mostrarPainel() {
    secLogin.style.display = "none";
    secPainel.style.display = "block";
}

// Evento de login
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

// Evento de logout
btnLogout.addEventListener("click", () => {
    sessionStorage.removeItem("adminLogado");
    mostrarLogin();
});
