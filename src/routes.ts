import { Router } from "express";
import { StoreController } from "./controllers/store-controller";

const router = Router();

router.post("/stores", (req, res) => {
  new StoreController().handle(req, res);
});

export { router };
