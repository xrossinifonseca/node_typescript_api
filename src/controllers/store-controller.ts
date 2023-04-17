import { Request, Response } from "express";
import { StoreRepository } from "../repositories/store-repository";
export class StoreController {
  public async handle(req: Request, res: Response) {
    const newStore = new StoreRepository();

    try {
      const result = await newStore.createStore(req.body);

      return res.json(result);
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
}
