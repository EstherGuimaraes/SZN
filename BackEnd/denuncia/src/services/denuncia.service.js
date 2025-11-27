import { db } from "../config/db.js";

export async function getAll() {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM denuncias ORDER BY created_at DESC LIMIT 100"
    );
    return rows || [];
  } catch (error) {
    console.error("Erro ao buscar denúncias:", error);
    throw error;
  }
}

export async function getById(id) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM denuncias WHERE id = ?", 
      [id]
    );
    return rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar denúncia por ID:", error);
    throw error;
  }
}

export async function criarDenuncia(usuarioId, titulo, descricao, midia = null) {
  try {
    const [result] = await db.execute(
      `INSERT INTO denuncias (usuario_id, titulo, descricao, midia, status, created_at) 
       VALUES (?, ?, ?, ?, 'pendente', NOW())`,
      [usuarioId, titulo, descricao, midia]
    );
    
    return {
      id: result.insertId,
      usuario_id: usuarioId,
      titulo,
      descricao,
      midia,
      status: 'pendente'
    };
  } catch (error) {
    console.error("Erro ao criar denúncia:", error);
    throw error;
  }
}

export async function atualizarStatus(denunciaId, novoStatus) {
  try {
    const [result] = await db.execute(
      `UPDATE denuncias SET status = ?, updated_at = NOW() WHERE id = ?`,
      [novoStatus, denunciaId]
    );
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    throw error;
  }
}
