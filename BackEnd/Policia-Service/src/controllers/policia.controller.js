import { getAll, getById } from "../services/policia.service.js";

export function listarDenuncias(req, res) {
    const data = getAll();
    res.json(data);
}

export function detalheDenuncia(req, res) {
    const { id } = req.params;
    const denuncia = getById(Number(id));

    if (!denuncia) {
        return res.status(404).json({ erro: "Denúncia não encontrada" });
    }

    res.json(denuncia);
}