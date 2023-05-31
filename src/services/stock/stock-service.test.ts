import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { StockService } from "./stock-service";
import { StockRepository } from "../../repositories/stock/stock-repository";
import { StockEntity } from "../../entities/StockEntity";
import { prismaTest } from "../../infra/database/prismaTestClient";
import { ProductRepository } from "../../repositories/product/product-repository";
import { ProductEntity } from "../../entities/Product";

describe("StockService", () => {
  const productRepository = new ProductRepository(prismaTest);
  const stockRepository = new StockRepository(prismaTest);
  const stockService = new StockService(stockRepository);

  const product: ProductEntity = {
    name: "test",
    price: 30,
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

  describe("entrySafely", () => {
    it("should throw an error if input is invalid", async () => {
      const entry: StockEntity = {
        productId: "",
        quantity: 10,
      };

      expect(async () => await stockService.entrySafely(entry)).rejects.toThrow(
        "Missing or invalid input"
      );
    });

    it("should throw an error if product ID does not exist", async () => {
      // const newProduct = await productRepository.registerProduct(product)

      const entry: StockEntity = {
        productId: "wrong-product-id",
        quantity: 10,
      };

      expect(async () => await stockService.entrySafely(entry)).rejects.toThrow(
        "Product does not exist"
      );
    });

    it("should throw an error if the quantity is less than zero", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const newEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 10,
      };

      const newEntry2: StockEntity = {
        productId: newProduct.id,
        quantity: 0,
      };

      await stockService.entrySafely(newEntry);

      expect(
        async () => await stockService.entrySafely(newEntry2)
      ).rejects.toThrow("Product quantity must be greater than zero");
    });

    it("should update the product quantity if the product is already in stock", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const newEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 10,
      };

      const newEntry2: StockEntity = {
        productId: newProduct.id,
        quantity: 5,
      };

      await stockService.entrySafely(newEntry);
      const entry = await stockService.entrySafely(newEntry2);

      expect(entry.quantity).toBe(15);
      expect(entry.productId).toEqual(newProduct.id);
    });
  });

  describe("productsInStockSafely", () => {
    it("should throw an error if there is no product in stock", () => {
      expect(
        async () => await stockService.productsInStockSafely()
      ).rejects.toThrow("There is no registered products in stock");
    });
  });

  describe("findByProductIdSefaly", () => {
    it("should throw an error if input is invalid", async () => {
      const id = "";

      expect(
        async () => await stockService.findByProductIdSefaly(id)
      ).rejects.toThrow("Missing or invalid input");
    });

    it("should throw an error if Product ID is not valid", async () => {
      const id = "invalid-id";
      expect(
        async () => await stockService.findByProductIdSefaly(id)
      ).rejects.toThrow("Product does not exist");
    });

    it("should throw an error if the product is not found in stock", async () => {
      const newProduct = await productRepository.registerProduct(product);

      expect(
        async () => await stockService.findByProductIdSefaly(newProduct.id)
      ).rejects.toThrow("Product not yet registered in stock");
    });
  });

  describe("updateProductInStockSafely", () => {
    it("should throw an error if the product is not  registered in the stock", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const entry: StockEntity = {
        productId: newProduct.id,
        quantity: 10,
      };

      expect(
        async () => await stockService.updateProductInStockSafely(entry)
      ).rejects.toThrow("Product not yet registered in stock");
    });

    it("should throw an error if the quantity is less than zero", async () => {
      const newProduct = await productRepository.registerProduct(product);

      const newEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 10,
      };

      const UpdateEntry: StockEntity = {
        productId: newProduct.id,
        quantity: 0,
      };

      await stockService.entrySafely(newEntry);

      expect(
        async () => await stockService.updateProductInStockSafely(UpdateEntry)
      ).rejects.toThrow("Product quantity must be greater than zero");
    });
  });
});
