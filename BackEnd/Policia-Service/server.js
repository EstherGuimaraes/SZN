import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import policiaRoutes from "./src/routes/policia.routes.js";
import validateToken from "./src/middlewares/validateToken.js"; 
import { db } from "./src/config/db.js";

const app = express();
const PORT = process.env.POLICIA_PORT || 3005;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 [POLÍCIA] API funcionando!");
});

// Rotas
app.use("/api/policia", validateToken, policiaRoutes);

// Iniciar servidor
async function startServer() {
  try {
    // Testar conexão com banco
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    
    console.log("✅ [POLÍCIA] Conectado ao MySQL!");
    
    app.listen(PORT, () => {
      console.log(`🚀 [POLÍCIA] Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ [POLÍCIA] Erro ao iniciar:", error.message);
    process.exit(1);
  }
}

startServer();
