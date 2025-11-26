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


  // Rota para criar denúncia


  // Rota para listar denúncias


  // Iniciar servidor
  app.listen(3002, () => {
    console.log('Servidor de denúncias rodando na porta 3002');
  });
