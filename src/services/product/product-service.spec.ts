import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../infra/database/prismaTestClient";
import { ProductRepository } from "../../repositories/product/product-repository";
import { ProductService } from "./product-service";
import { ProductEntity } from "../../entities/Product";
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

  describe("registerSafely", () => {
    it("should throw an error if input is invalid", async () => {
      const product: ProductEntity = {
        name: "",
        price: 30,
      };

      expect(() => productService.registerSafely(product)).rejects.toThrow(
        "Missing or invalid input"
      );
    });

    it("sould create a new product", async () => {
      const product1: ProductEntity = {
        name: "product",
        price: 30,
      };
      const result = await productService.registerSafely(product1);

      expect(result).toHaveProperty("id");
      expect(result.name).toEqual(product1.name);
      expect(result.price).toEqual(product1.price);
    });
  });

  describe("getAllProductsSafely", () => {
    it("should return an error if no products exists", async () => {
      expect(
        async () => await productService.getAllProductsSafely()
      ).rejects.toThrow("There are no registered products");
    });
  });

  describe("getProductByName", () => {
    it("should return an error if name is invalid", async () => {
      const product: ProductEntity = {
        name: "product",
        price: 30,
      };

      await productService.registerSafely(product);

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

  describe("updateProductSafely", () => {
    it("should throw an error if the id is not valid", async () => {
      const id = "123123123";
      const itemUpdate: ProductEntity = {
        name: "snicker-chocolate",
        price: 30,
      };

      expect(
        async () => await productService.updateProductSafely(id, itemUpdate)
      ).rejects.toThrow("Invalid ID");
    });
  });

  describe("deleteProductSafely", () => {
    it("should throw an error if product does not exist ", async () => {
      const id = "fake-id";

      expect(
        async () => await productService.deleteProductSafely(id)
      ).rejects.toThrow(`Product with id ${id} does not exist`);
    });
  });
});
