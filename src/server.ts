import { Server } from "./app";
import { ProductRouter } from "./routes/product-routes";
import { productDependecy } from "./dependencies/productDependencies";
import { StockRouter } from "./routes/stock-routes";
import { stockDepedenncy } from "./dependencies/stock-depedency/stockDependencies";

const server = new Server();
const productRoute = new ProductRouter(productDependecy);
const stockRoute = new StockRouter(stockDepedenncy);

server.app.use("/products", productRoute.getRouter());
server.app.use("/stock", stockRoute.getRouter());

server.start();
