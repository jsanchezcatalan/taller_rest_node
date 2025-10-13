import * as service from "../services/products.service.js";

export async function getAllProducts(req, res) {
  try {
    const data = await service.listProducts();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getProductById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  const product = await service.getProductById(id);
  product
    ? res.json(product)
    : res.status(404).json({ error: "Producto no encontrado" });
}

export async function createProduct(req, res) {
  const { name, price, stock = 0, sku = null } = req.body;
  if (!name || typeof price !== "number")
    return res.status(400).json({ error: "Campos inválidos" });
  try {
    const id = await service.createProduct({ name, price, stock, sku });
    const product = await service.getProductById(id);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateProduct(req, res) {
  const id = parseInt(req.params.id);
  const ok = await service.updateProduct(id, req.body);
  ok ? res.json({ message: "Producto actualizado" }) : res.status(404).json({ error: "No encontrado" });
}

export async function updatePartialProduct(req, res) {
  const id = parseInt(req.params.id);
  const ok = await service.updatePartialProduct(id, req.body);
  ok ? res.json({ message: "Producto modificado parcialmente" }) : res.status(404).json({ error: "No encontrado" });
}

export async function deleteProduct(req, res) {
  const id = parseInt(req.params.id);
  const ok = await service.deleteProduct(id);
  ok ? res.status(204).send() : res.status(404).json({ error: "No encontrado" });
}
