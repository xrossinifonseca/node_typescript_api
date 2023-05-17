import { Router } from "express";
import { StoreController } from "./controllers/store-controller";
import { productController } from "./utils/dependencies";

const router = Router();
const storeRouteController = new StoreController();

router.post("/stores", storeRouteController.handle);

router.post("/product", productController.postProduct.bind(productController));

router.get("/product", productController.getAllProduct.bind(productController));

router.get(
  "/product/:name",
  productController.getProductSelected.bind(productController)
);

router.put(
  "/product/:id",
  productController.putProduct.bind(productController)
);

export { router };
