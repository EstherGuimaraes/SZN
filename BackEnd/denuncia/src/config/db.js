import pkg from "pg";
const { Pool } = pkg;

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Ebg0312@",
  database: "meubanco",
  port: 5432
});
