import { ProductService } from "../services/product-service";
import { Request, Response } from "express";
import { ProductEntity } from "../entities/Product";

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: ProductEntity = req.body;
      const newProduct = await this.productService.register(data);

      res.status(201).send({
        message: "Successfully registered product",
        newProduct,
      });
    } catch (err: unknown) {
      this.handleError(err, res);
    } finally {
      res.end();
    }
  }

  public async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const allProducts = await this.productService.validGetAllProducts();

      res.status(200).send({
        message: "Products successfully found",
        products: allProducts,
      });
    } catch (err: unknown) {
      this.handleError(err, res);
    } finally {
      res.end();
    }
  }

  public async getProductSelected(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params;

      const products = await this.productService.getProductsByName(name);

      res.status(200).send({ message: "Product found", products });
    } catch (err: unknown) {
      this.handleError(err, res);
    } finally {
      res.end();
    }
  }

  private handleError(err: unknown, res: Response): any {
    if (err instanceof Error) {
      console.error(err.message);
      res.status(500).send({ error: err.message });
    } else {
      console.error("Unexpected error occurred:", err);
      res.status(500).send({ error: "Internal server error" });
    }
  }
}