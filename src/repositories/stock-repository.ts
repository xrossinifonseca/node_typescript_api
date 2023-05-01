import { prismaClient } from "../infra/database/prismaClient";
import { Prisma } from "@prisma/client";

interface Product {
  name: string;
  serieNumber: string;
  qty: number;
  price: Prisma.Decimal;
  validity?: Date | null;
}

export class StockRepository {
  public async registerProduct(product: Product): Promise<Product> {
    if (!product) throw new Error("product not created");

    const checkProduct = await this.checkSerieNumber(product.serieNumber);

    if (checkProduct)
      throw new Error(
        `Product with serial number ${product.serieNumber} already exists`
      );

    const register = await prismaClient.stock.create({
      data: {
        ...product,
      },
    });

    return register;
  }

  private async checkSerieNumber(serieNumber: string): Promise<Product | null> {
    const product = await prismaClient.stock.findFirst({
      where: {
        serieNumber,
      },
    });

    return product;
  }
}
