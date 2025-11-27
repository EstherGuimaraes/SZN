import express from "express";
import cors from "cors";
import denunciaRoutes from "./routes/denuncia1.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 API de Denúncias funcionando!");
});

app.use("/api/denuncias", denunciaRoutes);

export default app;
