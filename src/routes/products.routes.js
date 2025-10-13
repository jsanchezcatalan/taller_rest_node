import { Router } from "express";
import * as ctrl from "../controllers/products.controller.js";
const router = Router();

router.get("/", ctrl.getAllProducts);
router.get("/:id", ctrl.getProductById);
router.post("/", ctrl.createProduct);
router.put("/:id", ctrl.updateProduct);
router.patch("/:id", ctrl.updatePartialProduct);
router.delete("/:id", ctrl.deleteProduct);

export default router;
