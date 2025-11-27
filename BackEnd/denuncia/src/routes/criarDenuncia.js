// src/routes/denuncia.routes.js
import { Router } from "express";
import multer from "multer";
import { verificarToken } from "../middlewares/validateToken.js";
import { criarDenuncia, listarDenuncias } from "../controllers/denuncia.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/nova", verificarToken, upload.single("midia"), criarDenuncia);

router.get("/listar", verificarToken, listarDenuncias);

export default router;
