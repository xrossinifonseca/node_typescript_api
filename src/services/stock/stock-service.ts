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
    const checkProductInStock = await this.stockRepository.getByProductId(
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

  public async getByProductIdSefaly(id: string): Promise<Stock> {
    // verificar id do produto

    if (!id) throw new Error("Invalid ID");

    const product = await this.stockRepository.getByProductId(id);

    if (!product) throw new Error("Product does not exist");

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
