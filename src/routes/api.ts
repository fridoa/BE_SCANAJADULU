import express from "express";
import ProductController from "../controllers/product.controller";
import productMiddleware from "../middlewares/product.middleware";
import mediaMiddleware from "../middlewares/media.middleware";
import mediaController from "../controllers/media.controller";
import transactionMiddleware from "../middlewares/transaction.middleware";
import TransactionController from "../controllers/transaction.controller";

const router = express.Router();
router.post("/product", productMiddleware.validateCreateProduct, ProductController.create);
router.get("/products", ProductController.findAll);
router.get("/product/:id", ProductController.findOne);
router.put("/product/:id", productMiddleware.validateProductUpdate, ProductController.update);
router.delete("/product/:id", ProductController.remove);

router.post("/media/upload-single", mediaMiddleware.single("file"), mediaController.single);
router.post("/media/upload-multiple", mediaMiddleware.multiple("files", 5), mediaController.multiple);
router.delete("/media/remove", mediaController.remove);

router.post("/transaction", transactionMiddleware.validateTransaction, TransactionController.create);
router.get("/transactions", TransactionController.findAll);
router.get("/transaction/:id", TransactionController.findOne);
export default router;
