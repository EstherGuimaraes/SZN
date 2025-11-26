import 'dotenv/config';
import express from 'express';
import policiaRoutes from "./src/routes/policia.routes.js";
import { verificarTokenPolicia } from "./src/middlewares/auth.js";
import { db } from "./src/config/db.js";

const app = express();
app.use(express.json());

app.use("/policia", verificarTokenPolicia, policiaRoutes);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Polícia Service rodando na porta ${PORT}`);
});
