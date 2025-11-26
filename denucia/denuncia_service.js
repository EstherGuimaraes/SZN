// Código simples do serviço de denúncias (estilo iniciante)

const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Pool } = require('pg');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Configuração do banco (preencher com seus dados)
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'Ebg0312@',
  database: 'meubanco',
  port: 5432
});

// Criar tabela se não existir
async function criarTabela() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS denuncias (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL,
        texto TEXT NOT NULL,
        midia TEXT,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tabela criada ou já existe');
  } catch (err) {
    console.log('Erro ao criar tabela:', err);
  }
}
criarTabela();

// Middleware simples para verificar token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ erro: 'Token não enviado' });
  }

  try {
    const tokenLimpo = token.replace('Bearer ', '');
    const usuario = jwt.verify(tokenLimpo, 'segredo123');
    req.usuario = usuario;
    next();
  } catch (e) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

// Rota para criar denúncia
app.post('/denuncia/nova', verificarToken, upload.single('midia'), async (req, res) => {
  try {
    const texto = req.body.texto;
    const midia = req.file ? req.file.path : null;

    if (!texto) {
      return res.status(400).json({ erro: 'Texto é obrigatório' });
    }

    const result = await pool.query(
      'INSERT INTO denuncias (usuario_id, texto, midia) VALUES ($1, $2, $3) RETURNING *',
      [req.usuario.id, texto, midia]
    );

    res.json({ sucesso: true, denuncia: result.rows[0] });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar denúncia' });
  }
});

// Rota para listar denúncias
app.get('/denuncia/listar', verificarToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM denuncias ORDER BY criado_em DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao listar denúncias' });
  }
});

// Iniciar servidor
app.listen(3002, () => {
  console.log('Servidor de denúncias rodando na porta 3002');
});
