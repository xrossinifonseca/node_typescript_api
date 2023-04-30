import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryStock } from "./repositories/inMemoryStockRepository";

describe("InMemoryStockRepository", () => {
  let stock: InMemoryStock;
  const product = {
    name: "bold",
    serieNumber: "12345",
    qty: 32,
    price: 15,
    validity: new Date(),
  };

  beforeEach(() => {
    stock = new InMemoryStock();
  });

  describe("register", () => {
    it("should create a new product to the stock", () => {
      stock.register(product);

      expect(stock.getProductBySerieNumber("12345")).toEqual(product);
    });
    it("should throw an error if a product with the same serie number is already registered", () => {
      stock.register(product);

      expect(() => stock.register(product)).toThrow(
        "Product with the same serial number already exists"
      );
    });
  });

  describe("getProductBySerieNumber", () => {
    it("should return the product by the given serie number", () => {
      stock.register(product);
      expect(stock.getProductBySerieNumber("12345")).toEqual(product);
    });
  });
});
