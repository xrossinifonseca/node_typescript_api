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

  public async FindBySerialNumber(
    serieNumber: string
  ): Promise<Product | null> {
    const product = await this.prismaClient.stock.findFirst({
      where: {
        serieNumber,
      },
    });

    return product;
  }

  public async GetAllProducts(): Promise<Product[]> {
    const allProducts = await this.prismaClient.stock.findMany();

    return allProducts;
  }

  public async findProductByName(productName: string): Promise<Stock[]> {
    const products = await this.prismaClient.stock.findMany({
      where: {
        name: productName,
      },
    });

    return products;
  }
}
