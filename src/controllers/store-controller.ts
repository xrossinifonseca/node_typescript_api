import { Request, Response } from "express";
import { StoreRepository } from "../repositories/store-repository";
export class StoreController {
  public async handle(req: Request, res: Response) {
    const newStore = new StoreRepository();
    const { name, region } = req.body;

    try {
      if (!name || !region)
        res.status(400).send({
          message: "Missing or invalid input",
          details: { name, region },
        });

      const result = await newStore.createStore(req.body);

      return res.send(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).send({ error: err.message });
      }

      console.error(err);
    }
  }
}
