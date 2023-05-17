import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { ProductRepository } from "../../src/repositories/product-repository";
import { ProductService } from "../../src/services/product-service";
import { ProductEntity } from "../../src/entities/Product";
import { Decimal } from "@prisma/client/runtime";

describe("ProductService", () => {
  const productRepository = new ProductRepository(prismaTest);
  const productService = new ProductService(productRepository);

  beforeEach(async () => {
    await prismaTest.product.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.product.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("productService.register", () => {
    it("should throw an error if input is invalid", async () => {
      const product: ProductEntity = {
        name: "",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      expect(() => productService.register(product)).rejects.toThrow(
        "Missing or invalid input"
      );
    });

    it("should thow an erro if serial number already exists", async () => {
      const product1: ProductEntity = {
        name: "product",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const product2: ProductEntity = {
        name: "product",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      await productService.register(product1);

      expect(
        async () => await productService.register(product2)
      ).rejects.toThrow(
        `Product with the lot number ${product2.lotNumber} already exists`
      );
    });

    it("sould create a new product", async () => {
      const product1: ProductEntity = {
        name: "product",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };
      const result = await productService.register(product1);

      expect(result.name).toEqual(product1.name);
      expect(result.lotNumber).toEqual(product1.lotNumber);
    });
  });

  describe("productService.validGetAllProducts", () => {
    it("should return an error if no products exists", async () => {
      expect(
        async () => await productService.validGetAllProducts()
      ).rejects.toThrow("There are no registered products");
    });
  });

  describe("productService.getProductByName", () => {
    it("should return an error if name is invalid", async () => {
      const product: ProductEntity = {
        name: "product",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      await productService.register(product);

      expect(
        async () => await productService.getProductsByName("")
      ).rejects.toThrow("Name invalid");
    });

    it("sould return an error if the product does not exist", () => {
      expect(
        async () => await productService.getProductsByName("snickers")
      ).rejects.toThrow("Product not found");
    });
  });
});
