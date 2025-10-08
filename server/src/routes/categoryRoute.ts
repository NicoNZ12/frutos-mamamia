import { Router } from "express";
import { Category } from "../controllers/categoryController";

const router = Router()

router.get("/", Category.getCategories)
router.get("/:id", Category.getCategory)
router.post("/", Category.addCategory)
router.put("/:id", Category.editCategory)
router.delete("/:id", Category.deleteCategory)

export default router