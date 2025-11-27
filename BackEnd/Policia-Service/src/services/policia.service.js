import { db } from "../config/db.js";

export async function getAll() {
  try {
    const [rows] = await db.execute("SELECT * FROM denuncias ORDER BY criado_em DESC");
    return rows;
  } catch (err) {
    console.error("Erro ao buscar denúncias:", err);
    throw err;
  }
}

export async function getById(id) {
  try {
    const [rows] = await db.execute("SELECT * FROM denuncias WHERE id = ?", [id]);
    return rows[0];
  } catch (err) {
    console.error("Erro ao buscar denúncia:", err);
    throw err;
  }
}
