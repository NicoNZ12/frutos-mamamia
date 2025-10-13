import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

const router = Router()

router.get("/user/:userId", OrderController.getOrdersByUser)  
router.get("/", OrderController.getOrders)
router.get("/:orderId", OrderController.getOrder)                           
router.post("/", OrderController.createOrder)
router.put("/:orderId", OrderController.updateOrderStatus)

export default router