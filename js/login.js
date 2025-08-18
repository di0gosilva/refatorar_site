// js/login.js
document.getElementById('formCadastro').addEventListener('submit', async e => {
    e.preventDefault();

    const cliente = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        pagamento: document.getElementById('pagamento').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

    try {
        const resp = await fetch('http://localhost:3000/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        const data = await resp.json();
        alert(data.message);
        document.getElementById('formCadastro').reset();
    } catch (err) {
        console.error(err);
        alert('Erro ao cadastrar. Tente novamente.');
    }
});

document.getElementById('formLogin').addEventListener('submit', async e => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
        const resp = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        if (resp.ok) {
            const data = await resp.json();
            alert(`Bem-vindo, ${data.usuario.nome}`);
            // Aqui você pode salvar no sessionStorage/localStorage se quiser
            localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
            window.location.href = 'index.html';
        } else {
            const erro = await resp.json();
            alert(erro.message);
        }
    } catch (err) {
        console.error(err);
        alert('Erro no login. Tente novamente.');
    }
});
