import { prismaClient } from "../infra/database/prismaClient";
import { PrismaClient, Stock } from "@prisma/client";
import { Product } from "../entities/Product";

export class StockRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async registerProduct(product: Product): Promise<Product> {
    const newProduct = await this.prismaClient.stock.create({
      data: {
        ...product,
      },
    });

    return newProduct;
  }

  public async findProductByName(productName: string): Promise<Stock[]> {
    const products = await prismaClient.stock.findMany({
      where: {
        name: productName,
      },
    });

    return products;
  }
}
