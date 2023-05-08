import { Router } from "express";
import { StoreController } from "./controllers/store-controller";
import { productController } from "./utils/dependencies";

const router = Router();
const storeRouteController = new StoreController();

router.post("/stores", (req, res) => storeRouteController.handle(req, res));

router.post("/product", productController.handle.bind(productController));

router.get("/product", productController.getAllProduct.bind(productController));

router.get(
  "/product/:name",
  productController.getProductSelected.bind(productController)
);

export { router };
