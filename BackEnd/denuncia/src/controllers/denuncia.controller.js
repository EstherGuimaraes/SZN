import { getAll, getById, criarDenuncia } from "../services/denuncia.service.js";

export async function listarDenuncias(req, res) {
  try {
    const denuncias = await getAll();
    res.json({ 
      total: denuncias.length,
      denuncias 
    });
  } catch (error) {
    console.error("Erro ao listar denúncias:", error);
    res.status(500).json({ 
      erro: "Erro ao listar denúncias",
      mensagem: error.message 
    });
  }
}

export async function detalheDenuncia(req, res) {
  try {
    const { id } = req.params;
    const denuncia = await getById(id);
    
    if (!denuncia) {
      return res.status(404).json({ 
        erro: "Denúncia não encontrada" 
      });
    }
    
    res.json(denuncia);
  } catch (error) {
    console.error("Erro ao buscar denúncia:", error);
    res.status(500).json({ 
      erro: "Erro ao buscar denúncia",
      mensagem: error.message 
    });
  }
}

export async function criarNovaDenuncia(req, res) {
  try {
    const { titulo, descricao } = req.body;
    const usuarioId = req.usuario?.id || 1; // Virá do token JWT
    const midia = req.file ? req.file.path : null;

    if (!titulo || !descricao) {
      return res.status(400).json({ 
        erro: "Título e descrição são obrigatórios" 
      });
    }

    const novaDenuncia = await criarDenuncia(usuarioId, titulo, descricao, midia);
    
    res.status(201).json({ 
      mensagem: "Denúncia criada com sucesso",
      denuncia: novaDenuncia 
    });
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    res.status(500).json({ 
      erro: "Erro ao criar denúncia",
      mensagem: error.message 
    });
  }
}
