import { pool } from "../db.js";

export async function listProducts() {// Función para listar todos los productos
  const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return rows;// Devolver los productos ordenados por ID descendente
}

export async function getProductById(id) {// Función para obtener un producto por su ID
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];// Devolver el primer producto encontrado o undefined
}

export async function createProduct({ name, price, stock, sku }) {// Función para crear un nuevo producto
  const [result] = await pool.execute(// Ejecutar la inserción en la base de datos
    "INSERT INTO products (name, price, stock, sku) VALUES (?, ?, ?, ?)",
    [name, price, stock, sku]
  );
  return result.insertId;
}

export async function updateProduct(id, { name, price, stock, sku }) {// Función para actualizar un producto completamente
  const [result] = await pool.execute(
    "UPDATE products SET name=?, price=?, stock=?, sku=? WHERE id=?",
    [name, price, stock, sku, id]
  );
  return result.affectedRows > 0;
}

export async function updatePartialProduct(id, data) {// Función para actualizar un producto parcialmente
  const fields = [];// Array para almacenar los campos a actualizar
  const values = [];// Array para almacenar los valores correspondientes
  for (const [k, v] of Object.entries(data)) {// Iterar sobre las entradas del objeto de datos
    fields.push(`${k} = ?`);// Agregar el campo a la lista de campos
    values.push(v);// Agregar el valor a la lista de valores
  }
  values.push(id);// Agregar el ID al final de los valores
  const [result] = await pool.execute(// Ejecutar la actualización en la base de datos
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,// Construir la consulta SQL dinámicamente
    values// Valores para la consulta
  );
  return result.affectedRows > 0;
}

export async function deleteProduct(id) {// Función para eliminar un producto por su ID
  const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
