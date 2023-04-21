import { Request, Response } from "express";
import { StoreRepository } from "../repositories/store-repository";
export class StoreController {
  public async handle(req: Request, res: Response) {
    const newStore = new StoreRepository();
    const { name, region } = req.body;

    try {
      if (!name || !region) res.status(404).send("Input request required");

      const result = await newStore.createStore(req.body);

      return res.send(result);
    } catch (err) {
      res.status(404).send({ err: `Store already exists` });
    }
  }
}
