import { Stock } from "@prisma/client";
import { StockEntity } from "../../entities/StockEntity";
import { StockRepository } from "../../repositories/stock/stock-repository";

export class StockService {
  private stockRepository: StockRepository;

  constructor(stockRepository: StockRepository) {
    this.stockRepository = stockRepository;
  }

  public async entrySafely(product: StockEntity): Promise<Stock> {
    const { productId, quantity } = product;
    const checkProductInStock = await this.validProductId(productId);

    if (quantity <= 0)
      throw new Error("Product quantity must be greater than zero");

    if (checkProductInStock) {
      const updateEntry = await this.sumQuantity(
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
    const product = await this.validProductId(id);

    if (!product) throw new Error("Product not yet registered in stock");

    return product;
  }

  public async updateProductInStockSafely(
    product: StockEntity
  ): Promise<Stock> {
    const validPoduct = await this.validProductId(product.productId);

    if (!validPoduct) throw new Error("Product not yet registered in stock");

    if (product.quantity <= 0)
      throw new Error("Product quantity must be greater than zero");

    const productUpdate = await this.stockRepository.updateProductInStock(
      validPoduct,
      product.quantity
    );

    return productUpdate;
  }

  private async sumQuantity(product: Stock, quantity: number): Promise<Stock> {
    const newQuantity = quantity + product.quantity;

    const updatedEntry = await this.stockRepository.updateProductInStock(
      product,
      newQuantity
    );

    return updatedEntry;
  }

  private async validProductId(id: string): Promise<Stock | null> {
    if (!id) throw new Error("Missing or invalid input");

    const productId = await this.stockRepository.productRepository.validId(id);

    if (!productId) throw new Error("Product does not exist");

    const product = await this.stockRepository.findByProductId(id);

    return product;
  }
}
