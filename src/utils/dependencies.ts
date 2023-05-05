import { StockRepository } from "../repositories/stock-repository";
import { StockController } from "../controllers/stock-controller";
import { StockService } from "../services/stock-service";
import { prismaClient } from "../infra/database/prismaClient";

const stockRepository = new StockRepository(prismaClient);
const stockService = new StockService(stockRepository);
export const stockDependecy = new StockController(stockService);
