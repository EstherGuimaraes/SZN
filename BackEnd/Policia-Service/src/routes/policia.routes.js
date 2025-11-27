import { Router } from "express";
import { listarDenuncias, detalheDenuncia } from "../controllers/policia.controller.js";
import authPolice from "../middlewares/authPolice.js";

const router = Router();

// Listar todas as denúncias (apenas policiais)
router.get("/denuncias", authPolice, listarDenuncias);

// Buscar denúncia por ID (apenas policiais)
router.get("/denuncias/:id", authPolice, detalheDenuncia);

export default router;
