interface CreateStoreRequest {
  name: string;
  region: string;
}

export class InMemoryStoreReposity {
  public app: CreateStoreRequest[] = [];

  constructor() {
    this.createStore;
    this.app;
  }

  createStore(data: CreateStoreRequest) {
    const findStore = this.app.some((item) => item.name === data.name);

    if (findStore) throw new Error(`Store ${data.name} already exists`);

    this.app.push({
      name: data.name,
      region: data.region,
    });

    return data;
  }
}
