import { PrismaClient, Stock } from "@prisma/client";
import { StockEntity } from "../../entities/StockEntity";

export class StockRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async productEntry(product: StockEntity): Promise<Stock> {
    const newProduct = await this.prismaClient.stock.create({
      data: {
        product: { connect: { id: product.productId } },
        quantity: product.quantity,
      },
    });

    return newProduct;
  }
}
