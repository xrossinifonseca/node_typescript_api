import { describe, expect, it, vi } from "vitest";
import { InMemoryStoreReposity } from "./repositories/inMemoryCreateStore";
describe("createStore", () => {
  it("should create a new store", async () => {
    const memoryCreateStore = new InMemoryStoreReposity();
    const newStore = {
      name: "test-name",
      region: "test-region",
    };
    const result = memoryCreateStore.createStore(newStore);

    expect(result.name).toEqual(newStore.name);
  });
});
