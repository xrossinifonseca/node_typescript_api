import { StockRepository } from "../repositories/stock-repository";
import { Request, Response } from "express";

interface MyError {
  message: string;
}

export class StockController {
  public async handle(req: Request, res: Response) {
    try {
      const newProduct = new StockRepository();
      const { name, serieNumber, qty, price, validity } = req.body;
      if (!name || !serieNumber || !qty || !price)
        res.status(400).send({
          message: "Missing or invalid input",
          details: { name, serieNumber, qty, price, validity },
        });

      const result = await newProduct.registerProduct(req.body);

      return res.send({
        message: "Successfully registered product",
        result,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).send({ error: err.message });
      }

      console.error(err);
    }
  }
}
