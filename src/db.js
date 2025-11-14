import mysql from "mysql2/promise";// Importar el módulo mysql2 con soporte para promesas
import dotenv from "dotenv";// Importar el módulo dotenv para manejar variables de entorno

dotenv.config();// Cargar las variables de entorno desde el archivo .env

/**
 * Configuración del pool de conexiones MySQL
 *
 * Este bloque crea un "pool" (grupo) de conexiones reutilizables a la base de datos.
 * Usar un pool mejora el rendimiento y evita abrir y cerrar conexiones constantemente.
 *
 * Parámetros de configuración:
 * ---------------------------------------------
 * host              → Dirección del servidor MySQL (por ejemplo: "localhost" en XAMPP)
 * user              → Usuario con permisos para acceder a la base de datos
 * password          → Contraseña del usuario (puede quedar vacía en local)
 * database          → Nombre de la base de datos que usará la aplicación
 * waitForConnections → Si es TRUE, las peticiones esperan una conexión libre cuando se alcanza el límite
 * connectionLimit   → Número máximo de conexiones activas permitidas al mismo tiempo
 * queueLimit        → Número máximo de peticiones que pueden quedar en cola (0 = sin límite)
 *
 * Las variables se leen desde el archivo .env mediante process.env
 * Esto evita incluir credenciales o datos sensibles directamente en el código fuente.
 */
export const pool = mysql.createPool({// Configuración del pool de conexiones MySQL
  host: process.env.DB_HOST,// Dirección del servidor MySQL
  user: process.env.DB_USER,// Usuario con permisos para acceder a la base de datos
  password: process.env.DB_PASS,// Contraseña del usuario
  database: process.env.DB_NAME,// Nombre de la base de datos que usará la aplicación
  waitForConnections: true,// Esperar conexiones libres si se alcanza el límite
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 10),// Límite de conexiones activas
  queueLimit: 0,// Sin límite de peticiones en cola
});


export async function testConnection() {// Función para probar la conexión a la base de datos
  try {// Intentar ejecutar una consulta simple
    const [rows] = await pool.query("SELECT 1");// Consulta simple para verificar la conexión
    if (rows) console.log("✅ Conectado a MySQL correctamente.");// Mensaje de éxito si la consulta se ejecuta correctamente
  } catch (err) {// Capturar errores en la conexión
    console.error("❌ Error al conectar con MySQL:", err.message);// Mensaje de error si la conexión falla
    process.exit(1);// Salir del proceso con código de error
  }
}
