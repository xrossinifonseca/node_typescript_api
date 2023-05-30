import { Stock } from "@prisma/client";
import { StockEntity } from "../../entities/StockEntity";
import { StockRepository } from "../../repositories/stock/stock-repository";

export class StockService {
  private stockRepository: StockRepository;

  constructor(stockRepository: StockRepository) {
    this.stockRepository = stockRepository;
  }

  public async entrySafely(product: StockEntity): Promise<Stock> {
    const { quantity, productId } = product;
    const checkId = await this.validProductId(productId);
    const checkProductInStock = await this.stockRepository.findByProductId(
      product.productId
    );

    if (!quantity || !productId) throw new Error("Missing or invalid input");

    if (!checkId) throw new Error("Product does not exist");

    if (checkProductInStock) {
      const updateEntry = await this.updateQuantity(
        checkProductInStock,
        product.quantity
      );

      return updateEntry;
    }

    const newEntry = this.stockRepository.productEntry(product);

    return newEntry;
  }

  public async productsInStockSafely(): Promise<Stock[]> {
    const products: Stock[] = await this.stockRepository.productsInStock();

    if (!products.some(Boolean))
      throw new Error("There is no registered products in stock");

    return products;
  }

  public async findByProductIdSefaly(id: string): Promise<Stock> {
    if (!id) throw new Error("Missing or invalid input");

    const checkId = await this.validProductId(id);

    if (!checkId) throw new Error("Product does not exist");

    const product = await this.stockRepository.findByProductId(id);

    if (!product) throw new Error("Product not yet registered in stock");

    return product;
  }

  private async updateQuantity(
    product: Stock,
    quantity: number
  ): Promise<Stock> {
    const newQuantity = quantity + product.quantity;

    const updatedEntry = await this.stockRepository.updateProductInStock(
      product,
      newQuantity
    );

    return updatedEntry;
  }

  private async validProductId(id: string): Promise<boolean> {
    const product = await this.stockRepository.productRepository.validId(id);

    return product;
  }
}
