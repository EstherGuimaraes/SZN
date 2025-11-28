import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Carregar .env da própria pasta denuncia se existir, caso contrário buscar no BackEnd
const envPathLocal = path.resolve(process.cwd(), '.env');
const envPathParent = path.resolve(process.cwd(), '..', '.env');
let envToLoad = envPathLocal;
if (!fs.existsSync(envPathLocal) && fs.existsSync(envPathParent)) {
  envToLoad = envPathParent;
}

dotenv.config({ path: envToLoad });

const HOST = process.env.DB_HOST || 'localhost';
const USER = process.env.DB_USER || 'root';
const PASSWORD = process.env.DB_PASSWORD || process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'szn_database';
const PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

async function createDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      multipleStatements: true,
    });

    console.log(`Conectado ao MySQL em ${HOST}:${PORT} como ${USER}`);

    const createSql = `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`;
    await connection.query(createSql);
    console.log(`Banco '${DB_NAME}' criado ou já existente.`);

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('Erro ao criar database:', err.message);
    process.exit(1);
  }
}

createDatabase();
