import { pool } from "../db.js";

export async function listProducts() {
  const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
  return rows;
}

export async function getProductById(id) {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
}

export async function createProduct({ name, price, stock, sku }) {
  const [result] = await pool.execute(
    "INSERT INTO products (name, price, stock, sku) VALUES (?, ?, ?, ?)",
    [name, price, stock, sku]
  );
  return result.insertId;
}

export async function updateProduct(id, { name, price, stock, sku }) {
  const [result] = await pool.execute(
    "UPDATE products SET name=?, price=?, stock=?, sku=? WHERE id=?",
    [name, price, stock, sku, id]
  );
  return result.affectedRows > 0;
}

export async function updatePartialProduct(id, data) {
  const fields = [];
  const values = [];
  for (const [k, v] of Object.entries(data)) {
    fields.push(`${k} = ?`);
    values.push(v);
  }
  values.push(id);
  const [result] = await pool.execute(
    `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
}

export async function deleteProduct(id) {
  const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
