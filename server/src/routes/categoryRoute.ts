import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router()

router.get("/", CategoryController.getCategories)
router.get("/:id", CategoryController.getCategory)
router.post("/", CategoryController.addCategory)
router.put("/:id", CategoryController.editCategory)
router.delete("/:id", CategoryController.deleteCategory)

export default router