import * as service from "../services/directions.service.js";

// GET /api/customers/:customerId/directions
export async function getAllDirections(req, res) {
  const { customerId } = req.params;
  try {
    const data = await service.listDirectionsByCustomer(customerId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/customers/:customerId/directions/:addressId
export async function getDirectionById(req, res) {
  const { customerId, addressId } = req.params;
  try {
    const data = await service.getDirectionById(customerId, addressId);
    if (!data) return res.status(404).json({ error: "Dirección no encontrada" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/customers/:customerId/directions
export async function createDirection(req, res) {
  const { customerId } = req.params;
  const { street, city, province, postal_code, country } = req.body;

  if (!street || !city)
    return res.status(400).json({ error: "Faltan campos requeridos: street y city" });

  try {
    const id = await service.createDirection(customerId, {
      street,
      city,
      province,
      postal_code,
      country,
    });
    const newDirection = await service.getDirectionById(customerId, id);
    res.status(201).json(newDirection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// PUT /api/customers/:customerId/directions/:addressId
export async function updateDirection(req, res) {
  const { customerId, addressId } = req.params;
  try {
    const ok = await service.updateDirection(customerId, addressId, req.body);
    if (!ok) return res.status(404).json({ error: "Dirección no encontrada" });
    res.json({ message: "Dirección actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/customers/:customerId/directions/:addressId
export async function deleteDirection(req, res) {
  const { customerId, addressId } = req.params;
  try {
    const ok = await service.deleteDirection(customerId, addressId);
    if (!ok) return res.status(404).json({ error: "Dirección no encontrada" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
