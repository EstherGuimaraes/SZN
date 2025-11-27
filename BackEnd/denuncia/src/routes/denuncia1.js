import { Router } from "express";
import multer from "multer";
import { verificarToken } from "../middlewares/verificarToken.js";
import { listarDenuncias, detalheDenuncia, criarNovaDenuncia } from "../controllers/denuncia.controller.js";

const router = Router();

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Rotas
router.get("/", listarDenuncias);
router.get("/:id", detalheDenuncia);
router.post("/", verificarToken, upload.single("midia"), criarNovaDenuncia);

export default router;
