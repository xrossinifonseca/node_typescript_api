import { Router } from "express";
import { StoreController } from "./controllers/store-controller";
import { StockController } from "./controllers/stock-controller";

const router = Router();

router.post("/stores", (req, res) => {
  new StoreController().handle(req, res);
});

router.post("/stock", (req, res) => {
  new StockController().handle(req, res);
});

export { router };
