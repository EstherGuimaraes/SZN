import express from "express";
import { criarTabela } from "./src/config/db.js";
import denunciaRoutes from "./src/routes/denuncia1.js";

const app = express();
app.use(express.json());

app.use("/denuncia", denunciaRoutes);

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002");
});

criarTabela();
