import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { ProductRepository } from "../../src/repositories/product-repository";
import { ProductEntity } from "../../src/entities/Product";
import { Decimal } from "@prisma/client/runtime";

describe("ProductRepository", () => {
  const stockRepository = new ProductRepository(prismaTest);

  beforeEach(async () => {
    await prismaTest.product.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.product.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("stockRepository.RegisterProduct", () => {
    it("should create a new product", async () => {
      const product: ProductEntity = {
        name: "snicker",
        lotNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const registerProduct = await stockRepository.registerProduct(product);

      expect(registerProduct).toHaveProperty("id");
      expect(registerProduct.name).toEqual(product.name);
      expect(registerProduct.lotNumber).toEqual(product.lotNumber);
    });
  });

  describe("stockRepository.findProductByName", () => {
    it("should return an array of products with the same name", async () => {
      const product1: ProductEntity = {
        name: "snicker",
        lotNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      const product2: ProductEntity = {
        name: "snicker",
        lotNumber: "12345",
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
      const product: ProductEntity = {
        name: "snicker",
        lotNumber: "12345",
        qty: 32,
        price: new Decimal(10),
        validity: new Date(),
      };

      await stockRepository.registerProduct(product);

      const productSelected = await stockRepository.FindBySerialNumber(
        product.lotNumber
      );

      expect(productSelected?.lotNumber).toEqual(product.lotNumber);
    });
  });
});
