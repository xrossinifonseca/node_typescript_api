import { ProductRepository } from "../repositories/product-repository";
import { ProductService } from "../services/product-service";
import { ProductController } from "../controllers/product-controller";
import { prismaTest } from "../infra/database/prismaTestClient";

const productRepository = new ProductRepository(prismaTest);
const productService = new ProductService(productRepository);
export const productTestDependency = new ProductController(productService);
