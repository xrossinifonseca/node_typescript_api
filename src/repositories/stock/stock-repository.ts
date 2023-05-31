import { PrismaClient, Stock } from "@prisma/client";
import { StockEntity } from "../../entities/StockEntity";
import { ProductRepository } from "../product/product-repository";
import { DeleteProductResponse } from "../../entities/Product";

export class StockRepository {
  private prismaClient: PrismaClient;
  productRepository: ProductRepository;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
    this.productRepository = new ProductRepository(this.prismaClient);
  }

  public async productEntry(product: StockEntity): Promise<Stock> {
    const newEntry = await this.prismaClient.stock.create({
      data: {
        product: { connect: { id: product.productId } },
        quantity: product.quantity,
      },
    });

    return newEntry;
  }

  public async productsInStock(): Promise<Stock[]> {
    const products = await this.prismaClient.stock.findMany({
      include: { product: true },
    });

    return products;
  }

  public async findByProductId(id: string): Promise<Stock | null> {
    const product = await this.prismaClient.stock.findFirst({
      where: {
        product: {
          id: id,
        },
      },
    });

    return product;
  }

  public async updateProductInStock(
    product: Stock,
    quantity: number
  ): Promise<Stock> {
    const updated = await this.prismaClient.stock.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: quantity,
      },
    });

    return updated;
  }

  public async deleteProductInStock(product: Stock): Promise<Stock> {
    const findProductAndDelete = await this.prismaClient.stock.delete({
      where: {
        id: product.id,
      },
    });

    return findProductAndDelete;
  }
}
