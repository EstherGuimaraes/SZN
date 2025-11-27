import { getAll, getById } from "../services/policia.service.js";

export async function listarDenuncias(req, res) {
  try {
    const data = await getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar denúncias" });
  }
}

export async function detalheDenuncia(req, res) {
  try {
    const { id } = req.params;
    const denuncia = await getById(Number(id));

    if (!denuncia) return res.status(404).json({ erro: "Denúncia não encontrada" });

    res.json(denuncia);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar denúncia" });
  }
}
