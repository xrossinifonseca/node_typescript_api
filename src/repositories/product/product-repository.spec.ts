import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../infra/database/prismaTestClient";
import { ProductRepository } from "./product-repository";
import { ProductEntity } from "../../entities/Product";
import { Decimal } from "@prisma/client/runtime";
import { Product } from "@prisma/client";

describe("ProductRepository", () => {
  const productRepository = new ProductRepository(prismaTest);

  beforeEach(async () => {
    await prismaTest.product.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.product.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("RegisterProduct", () => {
    it("should create a new product", async () => {
      const product: ProductEntity = {
        name: "snicker",
        price: 30,
      };

      const registerProduct = await productRepository.registerProduct(product);

      expect(registerProduct).toHaveProperty("id");
      expect(registerProduct.name).toEqual(product.name);
      expect(registerProduct.price).toEqual(product.price);
    });
  });

  describe("findProductByName", () => {
    it("should return an array of products with the same name", async () => {
      const product1: ProductEntity = {
        name: "snicker",
        price: 30,
      };
      const product2: ProductEntity = {
        name: "snicker",
        price: 30,
      };

      await productRepository.registerProduct(product1);
      await productRepository.registerProduct(product2);

      const productsFound = await productRepository.findProductByName(
        "snicker"
      );

      expect(productsFound).toHaveLength(2);
      expect(productsFound[1].name).toEqual(product1.name);
      expect(productsFound[0].price).toEqual(product1.price);
    });
  });

  describe("getAllProduct", () => {
    it("should return all products", async () => {
      const product: ProductEntity = {
        name: "snicker",
        price: 30,
      };

      const product2: ProductEntity = {
        name: "snicker",
        price: 30,
      };

      await productRepository.registerProduct(product);
      await productRepository.registerProduct(product2);

      const allProducts: Product[] = await productRepository.GetAllProducts();

      expect(allProducts.length).toEqual(2);
      expect(allProducts[1].price).toEqual(product2.price);
      expect(allProducts[0].name).toEqual(product.name);
    });
  });

  describe("updateProduct", () => {
    it("should update the product", async () => {
      const item: ProductEntity = {
        name: "snicker",
        price: 30,
      };
      const itemUpdate: ProductEntity = {
        name: "snicker-chocolate",
        price: 20,
      };

      const product = await productRepository.registerProduct(item);

      const productUpdated = await productRepository.updatedProductById(
        product.id,
        itemUpdate
      );

      expect(productUpdated?.name).toEqual(itemUpdate.name);
      expect(productUpdated.price).toBe(20);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product", async () => {
      const item: ProductEntity = {
        name: "snicker",
        price: 30,
      };

      const product = await productRepository.registerProduct(item);

      const productDeleted = await productRepository.deleteProduct(product.id);
      const getAllProducts = await productRepository.GetAllProducts();

      expect(productDeleted.message).toEqual(
        `product ${product.name} deleted successfully`
      );
      expect(getAllProducts.length).toEqual(0);
    });
  });
});
