import Router from 'express';
import { OrderController } from '../controllers/orderController';

const router = Router()

router.get("/", OrderController.getOrders)
router.get("/:orderId", OrderController.getOrder)
router.post("/", OrderController.createOrder)
// router.put("/:id")

export default router