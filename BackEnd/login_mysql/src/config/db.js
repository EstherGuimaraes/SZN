import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  process.env.DB_NAME || "szn_database",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
    define: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
);

export { sequelize };
