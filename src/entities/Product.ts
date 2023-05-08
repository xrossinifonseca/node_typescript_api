import { Prisma } from "@prisma/client";
export interface ProductEntity {
  name: string;
  serieNumber: string;
  qty: number;
  price: Prisma.Decimal;
  validity?: Date | null;
}
