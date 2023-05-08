import { ProductEntity } from "../entities/Product";
import { StockRepository } from "../repositories/stock-repository";
import { Stock } from "@prisma/client";

export class StockService {
  private stockRepository: StockRepository;

  constructor(stockRepository: StockRepository) {
    this.stockRepository = stockRepository;
  }

  public async register(data: ProductEntity): Promise<ProductEntity> {
    const { name, serieNumber, qty, price } = data;
    if (!name || !serieNumber || !qty || !price)
      throw new Error("Missing or invalid input");

    const checkProduct = await this.stockRepository.FindBySerialNumber(
      data.serieNumber
    );

    if (checkProduct)
      throw new Error(
        `Product with the serial number ${data.serieNumber} already exists`
      );

    const product = await this.stockRepository.registerProduct(data);

    return product;
  }

  public async validGetAllProducts(): Promise<ProductEntity[]> {
    const allProducts: ProductEntity[] =
      await this.stockRepository.GetAllProducts();

    if (!allProducts.some(Boolean))
      throw new Error(`There are no registered products`);

    return allProducts;
  }

  public async getProductsByName(name: string): Promise<Stock[]> {
    if (!name || typeof name !== "string") throw new Error("Name invalid");

    const products: Stock[] = await this.stockRepository.findProductByName(
      name
    );

    if (!products.some(Boolean)) throw new Error("Product not found");

    return products;
  }
}
