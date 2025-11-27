import { Router } from "express";
import criarDenuncia from "../controllers/criarDenuncia.js";
import listarDenuncia from "../controllers/listarDenuncia.js";

const router = Router();

router.post("/", criarDenuncia);
router.get("/", listarDenuncia);

export default router;
