import { Server } from "./app";
import { ProductRouter } from "./routes/product-routes";
import { productDependecy } from "./dependencies/productDependencies";

const server = new Server();
const productRoute = new ProductRouter(productDependecy);

server.app.use("/products", productRoute.getRouter());

server.start();
