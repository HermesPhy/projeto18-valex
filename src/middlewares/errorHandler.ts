import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type) {
    return res.status(error.statusCode).send(error.message);
  }

  res.status(500).send("Ocorreu um erro, tente novamente.");
}
