import { Router } from "express";
import * as ctrl from "../controllers/directions.controller.js";

const router = Router({ mergeParams: true });

// Listar todas las direcciones de un cliente
router.get("/", ctrl.getAllDirections);

// Obtener una dirección específica
router.get("/:addressId", ctrl.getDirectionById);

// Crear una nueva dirección para un cliente
router.post("/", ctrl.createDirection);

// Actualizar una dirección
router.put("/:addressId", ctrl.updateDirection);

// Eliminar una dirección
router.delete("/:addressId", ctrl.deleteDirection);

export default router;
