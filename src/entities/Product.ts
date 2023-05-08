import { Prisma } from "@prisma/client";
export interface ProductEntity {
  name: string;
  lotNumber: string;
  qty: number;
  price: Prisma.Decimal;
  validity?: Date | null;
}
