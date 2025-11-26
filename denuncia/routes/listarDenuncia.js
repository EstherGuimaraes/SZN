app.get('/denuncia/listar', verificarToken, async (req, res) => {
  try {
    const [result] = await db.query(
      'SELECT * FROM denuncias ORDER BY criado_em DESC'
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar denúncias' });
  }
});
