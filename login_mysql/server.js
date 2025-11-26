require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao MySQL!");

    await sequelize.sync();
    console.log("✅ Tabelas sincronizadas!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ou iniciar o servidor:", error.message);
    process.exit(1);
  }
};

startServer();