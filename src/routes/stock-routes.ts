import { Router } from "express";
import { StockController } from "../controllers/stock/stock-controller";

export class StockRouter {
  private stockController: StockController;
  private router: Router;

  constructor(stockController: StockController) {
    this.stockController = stockController;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.stockController.postEntry.bind(this.stockController)
    );
    this.router.get(
      "/",
      this.stockController.getProductsInStock.bind(this.stockController)
    );
    this.router.get(
      "/:id",
      this.stockController.getByProductId.bind(this.stockController)
    );
    this.router.put(
      "/",
      this.stockController.putProductInStock.bind(this.stockController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
