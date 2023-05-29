import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../infra/database/prismaTestClient";
import { ProductRepository } from "../product-repository";
import { StockRepository } from "./stock-repository";
import { ProductEntity } from "../../entities/Product";
import { Decimal } from "@prisma/client/runtime";
import { StockEntity } from "../../entities/StockEntity";

describe("StockRepository", () => {
  const productRepository = new ProductRepository(prismaTest);
  const stockRepository = new StockRepository(prismaTest);

  const product: ProductEntity = {
    name: "test",
    price: new Decimal(10),
    lotNumber: "123",
    qty: 10,
    validity: new Date(),
  };

  beforeEach(async () => {
    await prismaTest.stock.deleteMany();
    await prismaTest.product.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.stock.deleteMany();
    await prismaTest.product.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("productEntry", () => {
    it("must register the entry of product into the stock", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const newEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 5,
      };
      const entry = await stockRepository.productEntry(newEntry);

      expect(entry.productId).toEqual(newProduct.id);
      expect(entry.quantity).toBe(5);
      expect(entry).toHaveProperty("id");
    });
  });

  describe("productInStock", () => {
    it("must return a list of products in stock", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const stockEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 10,
      };

      await stockRepository.productEntry(stockEntry);

      const products = await stockRepository.productsInStock();

      expect(products.length).toEqual(1);
      expect(products[0].quantity).toEqual(10);
      expect(products[0].productId).toEqual(newProduct.id);
    });
  });
});
