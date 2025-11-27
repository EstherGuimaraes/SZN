import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Bruce@1803",
  database: "sla",
  port: 3306
});
