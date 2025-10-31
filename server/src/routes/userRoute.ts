import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authentication } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", authentication, UserController.getUsers)
router.get("/:id", authentication, UserController.getUserById)

export default router