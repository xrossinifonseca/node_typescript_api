import { Request, Response } from "express";

export const handleError = (err: unknown, res: Response): any => {
  if (err instanceof Error) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  } else {
    console.error("Unexpected error occurred:", err);
    res.status(500).send({ error: "Internal server error" });
  }
};
