import express from "express";
import {
  listarUsuarios,
  buscarUsuario,
  criarUsuario,
  atualizarUsuario,
  excluirUsuario,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", listarUsuarios);
router.get("/:id", buscarUsuario);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", excluirUsuario);

export default router;