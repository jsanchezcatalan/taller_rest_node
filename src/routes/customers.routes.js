import { Router } from "express";
import * as ctrl from "../controllers/customers.controller.js";
import directionsRouter from "./directions.routes.js";

const router = Router();

router.get("/", ctrl.getAllCustomers);
router.post("/", ctrl.createCustomer);
router.get("/:id", ctrl.getCustomerById);
router.delete("/:id", ctrl.deleteCustomer);

// 🔗 Subrutas: /api/customers/:customerId/directions
router.use("/:customerId/directions", directionsRouter);

export default router;
