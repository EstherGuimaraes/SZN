import express from "express";
import denunciaRoutes from "./routes/denuncia.routes.js";
import { criarTabela } from "./config/init.js";

const app = express();
app.use(express.json());

app.use("/denuncia", denunciaRoutes);

app.listen(3002, () => {
  console.log("Servidor rodando na porta 3002");
});

criarTabela();
