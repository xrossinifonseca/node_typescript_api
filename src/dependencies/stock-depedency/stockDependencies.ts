import { StockRepository } from "../../repositories/stock/stock-repository";
import { StockService } from "../../services/stock/stock-service";
import { StockController } from "../../controllers/stock/stock-controller";
import { prismaClient } from "../../infra/database/prismaClient";

const stockRepository = new StockRepository(prismaClient);
const stockService = new StockService(stockRepository);
export const stockDepedenncy = new StockController(stockService);
