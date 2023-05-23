import { ProductController } from "../controllers/product-controller";
import { Router } from "express";

export class ProductRouter {
  private productController: ProductController;
  private router: Router;

  constructor(productController: ProductController) {
    this.productController = productController;
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.productController.postProduct.bind(this.productController)
    );

    this.router.get(
      "/",
      this.productController.getAllProduct.bind(this.productController)
    );

    this.router.get(
      "/:name",
      this.productController.getProductSelected.bind(this.productController)
    );

    this.router.put(
      "/:id",
      this.productController.putProduct.bind(this.productController)
    );

    this.router.delete(
      "/:id",
      this.productController.deleteProduct.bind(this.productController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
