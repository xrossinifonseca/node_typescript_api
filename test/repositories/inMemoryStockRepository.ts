interface Product {
  name: string;
  serieNumber: string;
  qty: number;
  price: number;
  validity: Date;
}

export class InMemoryStock {
  private app: Product[] = [];

  register(product: Product): Product {
    if (!product) throw new Error("product not created");

    if (this.getProductBySerieNumber(product.serieNumber))
      throw new Error("Product with the same serial number already exists");

    this.app.push(product);
    return product;
  }

  getProductBySerieNumber(serieNumber: string): Product | undefined {
    return this.app.find((product) => product.serieNumber === serieNumber);
  }
}
