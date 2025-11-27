import { criarDenuncia } from "../services/denuncia.service.js";

export default async function handler(req, res) {
  try {
    const { titulo, descricao } = req.body;
    const usuarioId = req.usuario?.id || 1; // Temporário, virá do token JWT
    const midia = req.file ? req.file.path : null;

    if (!titulo || !descricao) {
      return res.status(400).json({ 
        erro: "Título e descrição são obrigatórios" 
      });
    }

    const novaD= await criarDenuncia(usuarioId, titulo, descricao, midia);
    
    res.status(201).json({ 
      mensagem: "Denúncia criada com sucesso",
      denuncia: novaD 
    });
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ 
      erro: "Erro ao criar denúncia",
      mensagem: error.message 
    });
  }
}
