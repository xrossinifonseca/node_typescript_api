import { ProductRepository } from "../../repositories/product/product-repository";
import { ProductService } from "../../services/product/product-service";
import { ProductController } from "../../controllers/product/product-controller";
import { prismaTest } from "../../infra/database/prismaTestClient";

const productRepository = new ProductRepository(prismaTest);
const productService = new ProductService(productRepository);
export const productTestDependency = new ProductController(productService);
