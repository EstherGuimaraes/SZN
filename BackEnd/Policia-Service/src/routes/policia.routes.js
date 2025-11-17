import { Router } from "express";
import { listarDenuncias, detalheDenuncia } from "../controllers/policia.controller.js";
import validateToken from "../middlewares/validateToken.js";
import authPolice from "../middlewares/authPolice.js";

const router = Router();

router.get("/denuncias", validateToken, authPolice, listarDenuncias);
router.get("/denuncias/:id", validateToken, authPolice, detalheDenuncia);

export default router;
