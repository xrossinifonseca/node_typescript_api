import { prismaClient } from "../../infra/database/prismaClient";

type CreateStoreRequest = {
  name: string;
  region: string;
};

export class CreateStoreUseCase {
  constructor() {}

  async create(data: CreateStoreRequest) {
    const findStore = await prismaClient.store.findFirst({
      where: {
        name: data.name,
      },
    });

    if (findStore) throw new Error("Store already exists");

    const storeCreated = await prismaClient.store.create({
      data: {
        ...data,
      },
    });

    return storeCreated;
  }
}
