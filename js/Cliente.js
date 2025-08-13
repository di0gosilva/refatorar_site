export default class Cliente {
    constructor(nome, sobrenome, cpf, telefone, endereco, formaPagamento, email, senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.formaPagamento = formaPagamento;
        this.email = email;
        this.senha = senha;
    }

    validarSenha(senhaDigitada) {
        return this.senha === senhaDigitada;
    }

    toJSON() {
        return { ...this };
    }

    static fromJSON(json) {
        return new Cliente(
            json.nome,
            json.sobrenome,
            json.cpf,
            json.telefone,
            json.endereco,
            json.formaPagamento,
            json.email,
            json.senha
        );
    }
}
