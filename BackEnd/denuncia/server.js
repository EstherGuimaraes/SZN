import "dotenv/config";
import express from "express";
import cors from "cors";
import { criarTabela } from "./src/config/db.js";
import denunciaRoutes from "./src/routes/denuncia1.js";

const app = express();
const PORT = process.env.DENUNCIA_PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 API de Denúncias funcionando!");
});

// Rotas
app.use("/api/denuncias", denunciaRoutes);

// Inicializar servidor
async function startServer() {
  try {
    await criarTabela();
    app.listen(PORT, () => {
      console.log(`🚀 [DENUNCIA] Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ [DENUNCIA] Erro ao iniciar servidor:", error.message);
    process.exit(1);
  }
}

startServer();
