import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 API de Usuários funcionando!");
});

// Rotas
app.use("/api/usuarios", userRoutes);
app.use("/api/users", userRoutes); // Alias para compatibilidade

export default app;
