import { db } from "../config/db.js";

export async function getAll() {
  try {
    const [rows] = await db.execute(
      "SELECT id, titulo, descricao, status, created_at FROM denuncias ORDER BY created_at DESC LIMIT 100"
    );
    return rows || [];
  } catch (err) {
    console.error("[POLÍCIA] Erro ao buscar denúncias:", err);
    throw err;
  }
}

export async function getById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT id, titulo, descricao, usuario_id, status, midia, created_at FROM denuncias WHERE id = ?", 
      [id]
    );
    return rows[0] || null;
  } catch (err) {
    console.error("[POLÍCIA] Erro ao buscar denúncia:", err);
    throw err;
  }
}

export async function atualizarStatus(denunciaId, novoStatus) {
  try {
    const [result] = await db.execute(
      "UPDATE denuncias SET status = ?, updated_at = NOW() WHERE id = ?",
      [novoStatus, denunciaId]
    );
    return result.affectedRows > 0;
  } catch (err) {
    console.error("[POLÍCIA] Erro ao atualizar status:", err);
    throw err;
  }
}
