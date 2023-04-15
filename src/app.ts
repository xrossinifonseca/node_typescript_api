import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(): void {
    this.app.listen(3005, () => {
      console.log("server started on port 3005");
    });
  }
}
