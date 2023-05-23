import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { Server } from "../../src/app";
import { ProductRouter } from "../../src/routes/product-routes";
import { productTestDependency } from "../../src/dependencies/productDependenciesTest";
import { prismaTest } from "../../src/infra/database/prismaTestClient";
import { ProductEntity } from "../../src/entities/Product";
import { Decimal } from "@prisma/client/runtime";

describe("Product endpoints", () => {
  let server: Server;

  const productRouter = new ProductRouter(productTestDependency);

  beforeAll(async () => {
    server = new Server();
    server.app.use("/products", productRouter.getRouter());
    await prismaTest.product.deleteMany();
  });

  afterAll(async () => {
    await prismaTest.product.deleteMany();
    await prismaTest.$disconnect();
  });

  describe("POST /products", () => {
    it("should create a new Product", async () => {
      const product: ProductEntity = {
        name: "test",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const response = await request(server.app)
        .post("/products")
        .send(product);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("newProduct");
      expect(response.body?.newProduct).toHaveProperty("id");
    });

    it("should throw an error if product with the same lotNumber already exists ", async () => {
      const product: ProductEntity = {
        name: "test",
        lotNumber: "123224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const response = await request(server.app)
        .post("/products")
        .send(product);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe(
        `Product with the lot number ${product.lotNumber} already exists`
      );
    });

    it("should throw an error if any input is invalid ", async () => {
      const product: ProductEntity = {
        name: "",
        lotNumber: "1224",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const response = await request(server.app)
        .post("/products")
        .send(product);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Missing or invalid input");
    });
  });

  describe("GET /products", () => {
    it("should return all products", async () => {
      const response = await request(server.app).get("/products");

      expect(response.status).toEqual(200);
      expect(response.body.message).toBe("Products successfully found");
      expect(response.body.products).toHaveLength(1);
    });
  });

  describe("GET /products/:name", () => {
    it("should return a list of products with the same params name", async () => {
      const response = await request(server.app).get("/products/test");
      expect(response.status).toEqual(200);
      expect(response.body.message).toBe("Product found");
      expect(response.body.products).toHaveLength(1);
    });

    it("should return an error if the product name does not exist", async () => {
      const response = await request(server.app).get("/products/emptyName");

      expect(response.status).toEqual(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Product not found");
    });
  });

  describe("PUT /products/:id", () => {
    it("should update product with the specified id", async () => {
      const product: ProductEntity = {
        name: "test2",
        lotNumber: "123",
        qty: 32,
        price: new Decimal(30),
        validity: new Date(),
      };

      const productResponse = await request(server.app)
        .post("/products")
        .send(product);

      const { newProduct } = productResponse.body;

      const response = await request(server.app)
        .put(`/products/${newProduct.id}`)
        .send({
          name: "test2",
          price: new Decimal(10),
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("updatedProduct");
      expect(response.body.message).toEqual(
        `Product with ID ${newProduct.id} was updated`
      );
    });
    it("should throw an error when ID is invalid", async () => {
      const response = await request(server.app).put("/products/ivalid-id");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe("Invalid ID");
    });
  });

  describe("DELETE /product/:id", () => {
    it("should delete product with the specified id", async () => {
      const productResponse = await request(server.app).get("/products/test");

      const { products } = productResponse.body;

      const response = await request(server.app).delete(
        `/products/${products[0].id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("deletedProduct");
      expect(response.body.message).toEqual(
        `product ${products[0].name} deleted successfully`
      );
    });

    it("should throw an error when ID is invalid", async () => {
      const invalidId = "invalid-id";
      const response = await request(server.app).delete(
        `/products/${invalidId}`
      );

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(response.body.error).toBe(
        `Product with id ${invalidId} does not exist`
      );
    });
  });
});
