import { Router } from "express";
import { ProductController } from "../controllers/productController"
import { upload } from "../middlewares/fileMiddleware";

const router = Router()

router.get("/search", ProductController.searchProducts)
router.get("/", ProductController.getProducts)
router.get("/:id", ProductController.getProduct)
router.post("/", upload.single("image"), ProductController.addProduct)
router.put("/:id", ProductController.editProduct)
router.delete("/:id", ProductController.deleteProduct)

export default router