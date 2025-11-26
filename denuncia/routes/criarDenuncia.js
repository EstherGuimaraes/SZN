app.post('/denuncia/nova', verificarToken, upload.single('midia'), async (req, res) => {
  try {
    const texto = req.body.texto;
    const midia = req.file ? req.file.path : null;

    if (!texto) {
      return res.status(400).json({ erro: 'Texto é obrigatório' });
    }

    const [result] = await db.query(
      'INSERT INTO denuncias (usuario_id, texto, midia) VALUES (?, ?, ?)',
      [req.usuario.id, texto, midia]
    );

    res.json({
      sucesso: true,
      denuncia: {
        id: result.insertId,
        usuario_id: req.usuario.id,
        texto,
        midia
      }
    });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar denúncia' });
  }
});
