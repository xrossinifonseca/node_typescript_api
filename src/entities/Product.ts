import { Prisma } from "@prisma/client";
export interface ProductEntity {
  name: string;
  price: number;
}

export interface DeleteProductResponse {
  message: string;
  deletedProduct: ProductEntity;
}
