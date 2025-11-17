import express from 'express';
import policiaRoutes from "./src/routes/policia.routes.js";


const app = express();
app.use(express.json());

app.use("/policia", policiaRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor da policia rodando!');
})