import { Router } from "express";
import { ProductController } from "../controllers/productController"
import { upload } from "../middlewares/fileMiddleware";
import { authentication } from "../middlewares/authMiddleware";

const router = Router()

router.get("/", ProductController.getProducts)
router.get("/:id", ProductController.getProduct)
router.post("/", authentication, upload.single("image"), ProductController.addProduct)
router.put("/:id", authentication, upload.single("image"), ProductController.editProduct)
router.delete("/:id", authentication, ProductController.deleteProduct)

export default router