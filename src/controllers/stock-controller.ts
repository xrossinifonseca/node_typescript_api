import { StockRepository } from "../repositories/stock-repository";
import { StockService } from "../services/stock-service";
import { Request, Response } from "express";
import { Stock } from "@prisma/client";
import { prismaClient } from "../infra/database/prismaClient";
import { ProductEntity } from "../entities/Product";

// const stockService = new StockService();

export class StockController {
  private stockService: StockService;

  constructor(stockService: StockService) {
    this.stockService = stockService;
  }

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const data: ProductEntity = req.body;
      const newProduct = await this.stockService.register(data);

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
      const allProducts = await this.stockService.validGetAllProducts();

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

      const products = await this.stockService.getProductsByName(name);

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
