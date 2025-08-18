import express from "express";
import crypto from "crypto";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); // 🔑 libera acesso do frontend

// 🔑 Suas chaves da Marvel
const publicKey = "eeb4fc3f006a1a0c51d6833e31138dbc";
const privateKey = "43f9f3a0b3d6c7aca7f292b89d7bc9d5e6051f7e";

app.get("/marvel", async (req, res) => {
  try {
    const ts = new Date().getTime().toString();
    const hash = crypto
      .createHash("md5")
      .update(ts + privateKey + publicKey)
      .digest("hex");

    const url = `https://gateway.marvel.com/v1/public/characters?limit=10&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    const response = await fetch(url);
    const data = await response.json();

    // 🔑 transforma os personagens, adicionando descrição e preço
    const personagens = data.data.results.map(p => ({
      id: p.id,
      nome: p.name,
      descricao: p.description && p.description.trim() !== "" 
        ? p.description 
        : "Sem descrição disponível.",
      imagem: `${p.thumbnail.path}.${p.thumbnail.extension}`,
      preco: (Math.random() * 100 + 20).toFixed(2) // preço aleatório entre 20 e 120
    }));

    res.json(personagens);
  } catch (err) {
    console.error("Erro ao buscar personagens:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
