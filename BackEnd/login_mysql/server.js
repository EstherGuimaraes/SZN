import "dotenv/config";
import app from "./src/app.js";
import { sequelize } from "./src/config/db.js";

const PORT = process.env.LOGIN_PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ [LOGIN] Conectado ao MySQL!");

    await sequelize.sync({ alter: false });
    console.log("✅ [LOGIN] Tabelas sincronizadas!");

    app.listen(PORT, () => {
      console.log(`🚀 [LOGIN] Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ [LOGIN] Erro ao conectar ou iniciar o servidor:", error.message);
    process.exit(1);
  }
};

startServer();