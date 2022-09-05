import bcrypt from "bcrypt";

import { cardValidationByDate } from "../middlewares/validationMiddleware.js";
import * as cardRepository from "../repositories/cardRepository.js";

export default async function unlockCardService(
  card: cardRepository.Card,
  password: string
) {
  cardValidationByDate(card);
  if (!card.isBlocked)
    throw {
      type: "card_blocked",
      message: "Cartão já está desbloqueado",
      statusCode: 403,
    };

  const comparePasswords = bcrypt.compareSync(
    password.toString(),
    card.password
  );
  if (!comparePasswords)
    throw {
      type: "wrong_password",
      message: "Senha incorreta",
      statusCode: 401,
    };
  await cardRepository.update(card.id, { isBlocked: false });
}
