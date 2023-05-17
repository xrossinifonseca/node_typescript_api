import { PrismaClient, Product } from "@prisma/client";
import { DeleteProductResponse, ProductEntity } from "../entities/Product";

export class ProductRepository {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  public async registerProduct(product: ProductEntity): Promise<Product> {
    const newProduct = await this.prismaClient.product.create({
      data: {
        ...product,
      },
    });

    return newProduct;
  }

  public async FindBySerialNumber(
    lotNumber: string
  ): Promise<ProductEntity | null> {
    const product = await this.prismaClient.product.findFirst({
      where: {
        lotNumber,
      },
    });

    return product;
  }

  public async GetAllProducts(): Promise<Product[]> {
    const allProducts: Product[] = await this.prismaClient.product.findMany();

    return allProducts;
  }

  public async findProductByName(productName: string): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany({
      where: {
        name: productName,
      },
    });

    return products;
  }

  public async updatedProductById(
    id: string,
    productId: ProductEntity
  ): Promise<Product> {
    const product = await this.prismaClient.product.update({
      where: {
        id: id,
      },
      data: {
        name: productId.name,
        price: productId.price,
      },
    });

    return product;
  }

  public async deleteProduct(
    productId: string
  ): Promise<DeleteProductResponse> {
    const product = await this.prismaClient.product.delete({
      where: {
        id: productId,
      },
    });

    const message = `product ${product.name} deleted sucessfully`;

    return { message, deletedProduct: product };
  }
}
