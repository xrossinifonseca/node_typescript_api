import { Prisma } from "@prisma/client";
export interface Product {
  name: string;
  serieNumber: string;
  qty: number;
  price: Prisma.Decimal;
  validity?: Date | null;
}
