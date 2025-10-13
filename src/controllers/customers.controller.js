import * as service from "../services/customers.service.js";

export async function getAllCustomers(req, res) {
  try {
    const customers = await service.listCustomers();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCustomerById(req, res) {
  const id = parseInt(req.params.id);
  const customer = await service.getCustomerById(id);
  customer
    ? res.json(customer)
    : res.status(404).json({ error: "Cliente no encontrado" });
}

export async function createCustomer(req, res) {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: "Faltan campos requeridos" });
  try {
    const id = await service.createCustomer({ name, email });
    const customer = await service.getCustomerById(id);
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteCustomer(req, res) {
  const id = parseInt(req.params.id);
  const ok = await service.deleteCustomer(id);
  ok ? res.status(204).send() : res.status(404).json({ error: "No encontrado" });
}
