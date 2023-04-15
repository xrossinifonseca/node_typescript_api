import { Router } from "express";
import { CreateStoreController } from "./modules/create-stores/create-stores-controller";

const router = Router();

router.post("/stores", (req, res) => {
  new CreateStoreController().handle(req, res);
});

export { router };
