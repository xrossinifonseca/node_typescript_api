import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { ProductRepository } from "../../src/repositories/product-repository";
import { ProductEntity } from "../../src/entities/Product";
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

  describe("productRepository.RegisterProduct", () => {
    it("should create a new product", async () => {
      const product: ProductEntity = {
        name: "snicker",
        lotNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const registerProduct = await productRepository.registerProduct(product);

      expect(registerProduct).toHaveProperty("id");
      expect(registerProduct.name).toEqual(product.name);
      expect(registerProduct.lotNumber).toEqual(product.lotNumber);
    });
  });

  describe("productRepository.findProductByName", () => {
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

      await productRepository.registerProduct(product1);
      await productRepository.registerProduct(product2);

      const productsFound = await productRepository.findProductByName(
        "snicker"
      );

      expect(productsFound).toHaveLength(2);
      expect(productsFound[1].name).toEqual(product1.name);
      expect(productsFound[0].qty).toEqual(product1.qty);
    });
  });

  describe("productRepository.findBySerialNumber", () => {
    it("should return a product with the serial number selected", async () => {
      const product: ProductEntity = {
        name: "snicker",
        lotNumber: "12345",
        qty: 32,
        price: new Decimal(10),
        validity: new Date(),
      };

      await productRepository.registerProduct(product);

      const productSelected = await productRepository.FindBySerialNumber(
        product.lotNumber
      );

      expect(productSelected?.lotNumber).toEqual(product.lotNumber);
    });
  });

  describe("productRepostory.getAllProduct", () => {
    it("should return all products", async () => {
      const product: ProductEntity = {
        name: "snicker",
        lotNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const product2: ProductEntity = {
        name: "snicker",
        lotNumber: "1234",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      await productRepository.registerProduct(product);
      await productRepository.registerProduct(product2);

      const allProducts: Product[] = await productRepository.GetAllProducts();
      expect(allProducts.length).toEqual(2);
      expect(allProducts[1].lotNumber).toEqual(product2.lotNumber);
    });
  });
});
