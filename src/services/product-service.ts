import { DeleteProductResponse, ProductEntity } from "../entities/Product";
import { prismaClient } from "../infra/database/prismaClient";
import { ProductRepository } from "../repositories/product-repository";
import { Product } from "@prisma/client";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async registerSafely(data: ProductEntity): Promise<Product> {
    const { name, lotNumber, qty, price } = data;
    if (!name || !lotNumber || !qty || !price)
      throw new Error("Missing or invalid input");

    const checkProduct = await this.productRepository.FindBySerialNumber(
      data.lotNumber
    );

    if (checkProduct)
      throw new Error(
        `Product with the lot number ${data.lotNumber} already exists`
      );

    const product = await this.productRepository.registerProduct(data);

    return product;
  }

  public async getAllProductsSafely(): Promise<Product[]> {
    const allProducts: Product[] =
      await this.productRepository.GetAllProducts();

    if (!allProducts.some(Boolean))
      throw new Error(`There are no registered products`);

    return allProducts;
  }

  public async getProductsByName(name: string): Promise<Product[]> {
    if (!name || typeof name !== "string") throw new Error("Name invalid");

    const products: Product[] = await this.productRepository.findProductByName(
      name
    );

    if (!products.some(Boolean)) throw new Error("Product not found");

    return products;
  }

  public async updateProductSafely(
    id: string,
    product: ProductEntity
  ): Promise<Product> {
    const validationId = await this.productRepository.validId(id);

    if (!validationId) throw new Error("Invalid ID");

    const item = await this.productRepository.updatedProductById(id, product);

    return item;
  }

  public async deleteProductSafely(id: string): Promise<DeleteProductResponse> {
    const validationId = await this.productRepository.validId(id);
    if (!validationId) throw new Error(`Product with id ${id} does not exist`);

    const deletedProduct = await this.productRepository.deleteProduct(id);

    return deletedProduct;
  }
}
