import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()

router.get("/search", UserController.searchUsers)
router.get("/", UserController.getUsers)
router.post("/", UserController.addUser)

export default router