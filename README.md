# Node REST MySQL Workshop

API REST desarrollada con **Node.js**, **Express** y **MySQL**, lista para usar en entorno local con **XAMPP**.

## 🚀 Requisitos previos
- Node.js 18 o superior
- XAMPP (para MySQL)
- Postman, Insomnia o VS Code con REST Client

## 🛠 Instalación

### 1️⃣ Crear la carpeta del proyecto y entrar en ella
```bash
mkdir node-rest-mysql
cd node-rest-mysql
```

### 2️⃣ Inicializar el proyecto Node
```bash
npm init -y
```

### 3️⃣ Instalar las dependencias necesarias
```bash
npm install express mysql2 dotenv
npm install --save-dev nodemon
```

### 4️⃣ Crear la estructura de carpetas
```bash
mkdir src
mkdir src/routes
mkdir src/controllers
mkdir src/services
```

### 5️⃣ Crear los archivos principales
```bash
type nul > src/server.js
type nul > src/db.js
type nul > src/routes/products.routes.js
type nul > src/routes/customers.routes.js
type nul > src/controllers/products.controller.js
type nul > src/controllers/customers.controller.js
type nul > src/services/products.service.js
type nul > src/services/customers.service.js
type nul > .env
type nul > README.md
```

💡 En macOS o Linux usa:
```bash
touch src/server.js
```

### 6️⃣ Editar el archivo package.json
```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

### 7️⃣ Crear el archivo .env
```bash
echo PORT=3000> .env
echo DB_HOST=localhost>> .env
echo DB_USER=root>> .env
echo DB_PASS=>> .env
echo DB_NAME=workshop>> .env
echo DB_CONN_LIMIT=10>> .env
```

### 8️⃣ Crear la base de datos en MySQL (desde XAMPP)
```sql
CREATE DATABASE workshop CHARACTER SET utf8mb4;
USE workshop;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  sku VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9️⃣ Copiar el contenido de los archivos
Pega el contenido de cada archivo según lo indicado en el taller.

### 🔟 Probar el servidor
```bash
npm run dev
```

Luego abre en el navegador:
```
http://localhost:3000/health
```

Deberías ver:
```json
{ "ok": true, "db": "connected", "timestamp": "..." }
```
