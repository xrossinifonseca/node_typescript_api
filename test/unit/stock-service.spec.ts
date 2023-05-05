import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { StockRepository } from "../../src/repositories/stock-repository";
import { StockService } from "../../src/services/stock-service";
import { Product } from "../../src/entities/Product";
import { Decimal } from "@prisma/client/runtime";

describe("StockService", () => {
  const stockRepository = new StockRepository(prismaTest);
  const stockService = new StockService(stockRepository);

  beforeEach(async () => {
    await prismaTest.stock.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.stock.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("stockService.register", () => {
    it("should throw an error if input is invalid", async () => {
      const product: Product = {
        name: "",
        serieNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      expect(() => stockService.register(product)).rejects.toThrow(
        "Missing or invalid input"
      );
    });

    it("should thow an erro if serial number already exists", async () => {
      const product1: Product = {
        name: "product",
        serieNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const product2: Product = {
        name: "product",
        serieNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      await stockService.register(product1);

      expect(async () => await stockService.register(product2)).rejects.toThrow(
        `Product with the serial number ${product2.serieNumber} already exists`
      );
    });

    it("sould create a new product", async () => {
      const product1: Product = {
        name: "product",
        serieNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      const result = await stockService.register(product1);

      expect(result.name).toEqual(product1.name);
      expect(result.serieNumber).toEqual(product1.serieNumber);
    });
  });

  describe("stockService.validGetAllProducts", () => {
    it("should return an error if no products exists", async () => {
      expect(
        async () => await stockService.validGetAllProducts()
      ).rejects.toThrow("There are no registered products");
    });
  });

  describe("stockService.getProductByName", () => {
    it("should return an error if name is invalid", async () => {
      const product: Product = {
        name: "product",
        serieNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      await stockService.register(product);

      expect(
        async () => await stockService.getProductsByName("")
      ).rejects.toThrow("Name invalid");
    });

    it("sould return an error if the product does not exist", () => {
      expect(
        async () => await stockService.getProductsByName("snickers")
      ).rejects.toThrow("Product not found");
    });
  });
});
