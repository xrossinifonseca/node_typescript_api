import { assert, describe, expect, it, vi } from "vitest";
import { InMemoryStoreReposity } from "./repositories/inMemoryCreateStore";

describe("createStore", () => {
  const memoryCreateStore = new InMemoryStoreReposity();
  const newStore = {
    name: "test-name",
    region: "test-region",
  };
  it("should create a new store", async () => {
    const result = memoryCreateStore.createStore(newStore);

    expect(result.name).toEqual(newStore.name);
  });

  it("should not create a new store", () => {
    expect(() => {
      memoryCreateStore.createStore(newStore);
    }).toThrowError(Error);
  });
});
