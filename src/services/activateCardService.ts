import Cryptr from "cryptr";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import * as cardRepository from "../repositories/cardRepository.js";
import { cardValidationByDate } from "../middlewares/validationMiddleware.js";

export default async function activateCardService(
  card: cardRepository.Card,
  cvc: string,
  password: string
) {
  cardValidationByDate(card);
  if (card.password)
    throw {
      type: "card_already_active",
      message: "Cartão já ativado",
      statusCode: 409,
    };

  const cryptr = new Cryptr(process.env.SC);
  const securityCode = cryptr.decrypt(card.securityCode);
  if (securityCode !== cvc)
    throw {
      type: "cvc_not_right",
      message: "Código do cartão incorreto",
      statusCode: 401,
    };

  password = bcrypt.hashSync(password, 10);
  cardRepository.update(card.id, { password: password });
}
