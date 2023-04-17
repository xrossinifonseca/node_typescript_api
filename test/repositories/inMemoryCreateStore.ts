interface CreateStoreRequest {
  name: string;
  region: string;
}

export class InMemoryStoreReposity {
  public item: CreateStoreRequest[] = [];

  createStore(data: CreateStoreRequest) {
    const findStore = this.item.some((item) => item.name === data.name);

    if (findStore) throw new Error(`${data.name} already exists}`);

    this.item.push({
      name: data.name,
      region: data.region,
    });

    return data;
  }
}
