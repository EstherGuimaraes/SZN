import { db } from "../config/db.js";

export async function getAll() {
    const [rows] = await db.query("SELECT * FROM denuncias");
    return rows;
}

export async function getById(id) {
    const [rows] = await db.query(
        "SELECT * FROM denuncias WHERE id = ?",
        [id]
    );

    return rows[0];
}
