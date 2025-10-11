import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()

router.get("/search", UserController.searchUsers)
router.get("/", UserController.getUsers)
router.get("/:id", UserController.getUserById)

export default router