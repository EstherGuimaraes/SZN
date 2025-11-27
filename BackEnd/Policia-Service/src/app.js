import express from "express";
import denunciaRoutes from "./routes/denuncia.routes.js";

const app = express();
app.use(express.json());

app.use("/denuncias", denunciaRoutes);

export default app;
