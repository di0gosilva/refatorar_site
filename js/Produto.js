export default class Produto {
    constructor(nome, descricao, codigo, preco, link, qtd = 0) {
        this.nome = nome;
        this.descricao = descricao;
        this.codigo = codigo;
        this.preco = parseFloat(preco);
        this.link = link;
        this.qtd = qtd;
    }

    getTotal() {
        return this.preco * this.qtd;
    }

    toJSON() {
        return { ...this };
    }

    static fromJSON(json) {
        return new Produto(
            json.nome,
            json.descricao,
            json.codigo,
            json.preco,
            json.link,
            json.qtd
        );
    }
}
