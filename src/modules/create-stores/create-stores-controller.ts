import { Request, Response } from "express";
import { CreateStoreUseCase } from "./create-stores-usecase";

export class CreateStoreController {
  constructor() {}

  async handle(req: Request, res: Response) {
    const useCase = new CreateStoreUseCase();

    try {
      const result = await useCase.create(req.body);

      return res.json(result);
    } catch (err) {
      return res.status(404).json(err);
    }
  }
}
