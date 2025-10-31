import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";
import { authentication } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", CategoryController.getCategories)
router.get("/:id", authentication, CategoryController.getCategory)
router.post("/", authentication, CategoryController.addCategory)
router.put("/:id", authentication, CategoryController.editCategory)
router.delete("/:id", authentication, CategoryController.deleteCategory)

export default router