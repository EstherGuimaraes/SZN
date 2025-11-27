const Denuncia = require("../models/Denuncia");

exports.listarDenuncias = async (req, res) => {
  const denuncias = await Denuncia.findAll();
  res.json(denuncias);
};

exports.detalheDenuncia = async (req, res) => {
  const denuncia = await Denuncia.findByPk(req.params.id);
  if (!denuncia) return res.status(404).json({ erro: "Denúncia não encontrada" });
  res.json(denuncia);
};

exports.criarNovaDenuncia = async (req, res) => {
  const { texto, titulo } = req.body;
  const midia = req.file ? req.file.path : null;

  if (!texto) return res.status(400).json({ erro: "Texto é obrigatório" });

  const denuncia = await Denuncia.create({
    titulo,
    descricao: texto,
    usuarioId: req.usuario.id,
    midia
  });

  res.status(201).json(denuncia);
};
