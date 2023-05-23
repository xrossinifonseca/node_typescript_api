import express, { Application } from "express";

export class Server {
  app: Application;
  private readonly port = process.env.PORT || 3005;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  public start(): void {
    this.app
      .listen(this.port, () => {
        console.log(`server started on port ${this.port}`);
      })
      .on("error", (err) => {
        console.error(`Error starting server:${err.message}`);
      });
  }
}
