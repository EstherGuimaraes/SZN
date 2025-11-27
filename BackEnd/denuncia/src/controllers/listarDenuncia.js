import { Router } from "express";
import { listarDenuncias, detalheDenuncia, criarDenuncia } from "./denuncia.controller.js";
import { verificarToken } from "../middlewares/validateToken.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/denuncia/listar", verificarToken, listarDenuncias);

router.post("/denuncia/nova", verificarToken, upload.single('midia'), criarDenuncia);

router.get("/denuncia/:id", verificarToken, detalheDenuncia);

export default router;
