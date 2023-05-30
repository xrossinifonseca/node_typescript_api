import { ProductRepository } from "../../repositories/product/product-repository";
import { ProductController } from "../../controllers/product/product-controller";
import { ProductService } from "../../services/product/product-service";
import { prismaClient } from "../../infra/database/prismaClient";

const productRepository = new ProductRepository(prismaClient);
const productService = new ProductService(productRepository);
export const productDependecy = new ProductController(productService);
