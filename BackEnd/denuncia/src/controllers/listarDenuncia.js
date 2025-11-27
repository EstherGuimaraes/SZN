import { getAll, getById } from "../services/denuncia.service.js";

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
