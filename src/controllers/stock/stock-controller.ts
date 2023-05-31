import { Request, Response } from "express";
import { StockService } from "../../services/stock/stock-service";
import { StockEntity } from "../../entities/StockEntity";
import { handleError } from "../../utils/handleError";

export class StockController {
  private stockService: StockService;

  constructor(stockService: StockService) {
    this.stockService = stockService;
  }

  async postEntry(req: Request, res: Response): Promise<void> {
    try {
      const data: StockEntity = req.body;

      const newEntry = await this.stockService.entrySafely(data);

      res.status(201).send({
        message: "Product entry saved successfully",
        newEntry,
      });
    } catch (err: unknown) {
      handleError(err, res);
    } finally {
      res.end();
    }
  }

  async getProductsInStock(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.stockService.productsInStockSafely();

      res.status(200).send({
        products,
      });
    } catch (err: unknown) {
      handleError(err, res);
    } finally {
      res.end();
    }
  }

  async getByProductId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await this.stockService.findByProductIdSefaly(id);

      res.status(200).send({ product });
    } catch (err: unknown) {
      handleError(err, res);
    } finally {
      res.end();
    }
  }

  async putProductInStock(req: Request, res: Response): Promise<void> {
    try {
      const productUpdated = await this.stockService.updateProductInStockSafely(
        req.body
      );

      res.status(200).send({
        productUpdated,
      });
    } catch (err: unknown) {
      handleError(err, res);
    } finally {
      res.end();
    }
  }
}
