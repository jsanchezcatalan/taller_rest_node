import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),
  queueLimit: 0,
});

export async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT 1");
    if (rows) console.log("✅ Conectado a MySQL correctamente.");
  } catch (err) {
    console.error("❌ Error al conectar con MySQL:", err.message);
    process.exit(1);
  }
}
