import { prismaClient } from "../infra/database/prismaClient";

interface Store {
  name: string;
  region: string;
}

export class StoreRepository {
  public async createStore(data: Store): Promise<Store> {
    const findStore = await prismaClient.store.findFirst({
      where: {
        name: data.name,
      },
    });

    if (findStore) {
      throw new Error(`Store ${data.name} already exists`);
    }

    const storeCreated = await prismaClient.store.create({
      data: {
        ...data,
      },
    });

    return storeCreated;
  }
}
