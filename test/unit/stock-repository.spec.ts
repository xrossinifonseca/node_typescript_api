import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { StockRepository } from "../../src/repositories/stock-repository";
import { Product } from "../../src/entities/Product";
import { Decimal } from "@prisma/client/runtime";

describe("StockRepository", () => {
  const stockRepository = new StockRepository(prismaTest);

  beforeEach(async () => {
    await prismaTest.stock.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.stock.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("stockRepository.RegisterProduct", () => {
    it("should create a new product", async () => {
      const product: Product = {
        name: "snicker",
        serieNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const registerProduct = await stockRepository.registerProduct(product);

      expect(registerProduct).toHaveProperty("id");
      expect(registerProduct.name).toEqual(product.name);
      expect(registerProduct.serieNumber).toEqual(product.serieNumber);
    });
  });

  describe("stockRepository.findProductByName", () => {
    it("should return an array of products with the same name", async () => {
      const product1: Product = {
        name: "snicker",
        serieNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      const product2: Product = {
        name: "snicker",
        serieNumber: "12345",
        qty: 32,
        price: new Decimal(10),
        validity: new Date(),
      };

      await stockRepository.registerProduct(product1);
      await stockRepository.registerProduct(product2);

      const productsFound = await stockRepository.findProductByName("snicker");

      expect(productsFound).toHaveLength(2);
      expect(productsFound[1].name).toEqual(product1.name);
      expect(productsFound[0].qty).toEqual(product1.qty);
    });
  });

  describe("stockRepository.findBySerialNumber", () => {
    it("should return a product with the serial number selected", async () => {
      const product: Product = {
        name: "snicker",
        serieNumber: "12345",
        qty: 32,
        price: new Decimal(10),
        validity: new Date(),
      };

      await stockRepository.registerProduct(product);

      const productSelected = await stockRepository.FindBySerialNumber(
        product.serieNumber
      );

      expect(productSelected?.serieNumber).toEqual(product.serieNumber);
    });
  });
});
