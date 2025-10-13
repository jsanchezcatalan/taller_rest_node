import { pool } from "../db.js";

export async function listDirectionsByCustomer(customerId) {
  const [rows] = await pool.query(
    "SELECT * FROM addresses WHERE customer_id = ? ORDER BY id DESC",
    [customerId]
  );
  return rows;
}

export async function getDirectionById(customerId, addressId) {
  const [rows] = await pool.query(
    "SELECT * FROM addresses WHERE id = ? AND customer_id = ?",
    [addressId, customerId]
  );
  return rows[0];
}

export async function createDirection(customerId, data) {
  const { street, city, province, postal_code, country } = data;
  const [result] = await pool.execute(
    `INSERT INTO addresses (customer_id, street, city, province, postal_code, country)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [customerId, street, city, province, postal_code, country]
  );
  return result.insertId;
}

export async function updateDirection(customerId, addressId, data) {
  const fields = [];
  const values = [];
  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }
  values.push(addressId, customerId);
  const [result] = await pool.execute(
    `UPDATE addresses SET ${fields.join(", ")} WHERE id = ? AND customer_id = ?`,
    values
  );
  return result.affectedRows > 0;
}

export async function deleteDirection(customerId, addressId) {
  const [result] = await pool.execute(
    "DELETE FROM addresses WHERE id = ? AND customer_id = ?",
    [addressId, customerId]
  );
  return result.affectedRows > 0;
}
