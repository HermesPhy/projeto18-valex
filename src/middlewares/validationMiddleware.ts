import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

import { cardTypeSchema } from "../utils/schemas.js";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function companyApiValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apikey = req.headers["x-api-key"];
  console.log(apikey);
  const company = await findByApiKey(apikey);
  console.log(company);
  if (!company)
    throw {
      type: "not_found_error",
      message: "Empresa não encontrada",
      statusCode: 404,
    };
  next();
}

export function newCardValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { employeeId, type }: { employeeId: number; type: string } = req.body;
  console.log(req.body);
  const { error } = cardTypeSchema.validate({ employeeId, type });
  if (error) {
    return res.status(422).send(error.details);
  }
  res.locals = { employeeId, type };
  next();
}
