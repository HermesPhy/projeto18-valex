import { Request, Response, NextFunction } from "express";
import dayjs from "dayjs";

import {
  cardTypeSchema,
  activateCardSchema,
  paymentSchema,
} from "../utils/schemas.js";
import { findByApiKey } from "../repositories/companyRepository.js";
import { Card, findById } from "../repositories/cardRepository.js";

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
  const { error } = cardTypeSchema.validate({ employeeId, type });
  if (error) {
    return res.status(422).send(error.details);
  }
  res.locals = { employeeId, type };
  next();
}

export function activateCardValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cvc, password } = req.body;
  const { error } = activateCardSchema.validate({ cvc, password });
  if (error)
    throw { type: "body_error", message: error.details, statusCode: 422 };
  res.locals = { ...res.locals, cvc, password };
  next();
}

export async function cardValidationByParamsId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const card: Card = await findById(parseInt(id));
  if (!card)
    throw {
      type: "not_found_error",
      message: "cartão inválido ou não encontrado",
      statusCode: 404,
    };
  res.locals = { card };
  next();
}

export async function cardValidationById(id: number) {
  const card: Card = await findById(id);
  if (!card)
    throw {
      type: "not_found_error",
      message: "cartão inválido ou não encontrado",
      statusCode: 404,
    };
  return card;
}

export async function cardValidationByDate(card: Card) {
  const currentDate = dayjs().format("MM/YY");
  const [mouth, year] = currentDate.split("/");
  const [cardMouth, cardYear] = card.expirationDate.split("/");
  const parseCurrentDate = new Date(parseInt(year), parseInt(mouth), 0);
  const parseCardDate = new Date(parseInt(cardYear), parseInt(cardMouth), 0);
  if (parseCurrentDate > parseCardDate)
    throw { type: "invalid_date", message: "Cartão expirado", statusCode: 401 };
}

export function paymentValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = paymentSchema.validate(req.body);
  if (error) res.status(422).send(error.details);
  next();
}
