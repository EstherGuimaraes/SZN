import { db } from "../config/db.js";

export async function getAll() {
  const [rows] = await db.execute("SELECT * FROM denuncias ORDER BY criado_em DESC");
  return rows;
}

export async function getById(id) {
  const [rows] = await db.execute("SELECT * FROM denuncias WHERE id = ?", [id]);
  return rows[0];
}

export async function criarDenuncia(usuarioId, texto, midia) {
  const [result] = await db.execute(
    'INSERT INTO denuncias (usuario_id, texto, midia) VALUES (?, ?, ?)',
    [usuarioId, texto, midia]
  );
  return { id: result.insertId, usuario_id: usuarioId, texto, midia };
}
