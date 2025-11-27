import mysql from "mysql2/promise";
import "dotenv/config";

export const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "szn_database",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0
});

export async function criarTabela() {
  try {
    const connection = await db.getConnection();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS denuncias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT NOT NULL,
        usuario_id INT NOT NULL,
        midia VARCHAR(500),
        status ENUM('pendente', 'investigando', 'concluida') DEFAULT 'pendente',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✅ [DENUNCIA] Tabela criada ou verificada!");
    connection.release();
  } catch (error) {
    console.error("❌ [DENUNCIA] Erro ao criar tabela:", error.message);
  }
}
