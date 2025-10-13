import { pool } from "../db.js";

export async function listCustomers() {
  const [rows] = await pool.query("SELECT * FROM customers ORDER BY id DESC");
  return rows;
}

export async function getCustomerById(id) {
  const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [id]);
  return rows[0];
}

export async function createCustomer({ name, email }) {
  const [result] = await pool.execute(
    "INSERT INTO customers (name, email) VALUES (?, ?)",
    [name, email]
  );
  return result.insertId;
}

export async function deleteCustomer(id) {
  const [result] = await pool.execute("DELETE FROM customers WHERE id = ?", [id]);
  return result.affectedRows > 0;
}
