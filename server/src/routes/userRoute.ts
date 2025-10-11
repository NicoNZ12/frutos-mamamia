import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()

router.get("/search", UserController.searchUsers)
router.get("/", UserController.getUsers)

//TODO: ruta para getUserById

export default router