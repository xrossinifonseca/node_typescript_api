import { Router } from "express";
import { StoreController } from "./controllers/store-controller";
import { StockController } from "./controllers/stock-controller";
import { stockDependecy } from "./utils/dependencies";

const router = Router();
const storeRouteController = new StoreController();

router.post("/stores", (req, res) => storeRouteController.handle(req, res));

router.post("/stock", stockDependecy.handle.bind(stockDependecy));

router.get("/stock", stockDependecy.getAllProduct.bind(stockDependecy));

router.get(
  "/stock/:name",
  stockDependecy.getProductSelected.bind(stockDependecy)
);

export { router };
