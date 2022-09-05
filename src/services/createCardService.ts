import Cryptr from "cryptr";
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import {
  TransactionTypes,
  findByTypeAndEmployeeId,
} from "../repositories/cardRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import { findById, Employee } from "../repositories/employeeRepository.js";
import numbersGenerator from "../utils/numberGenerator.js";

export default async function createCard(
  employeeId: number,
  type: TransactionTypes
) {
  const employee = await findById(employeeId);
  if (!employee)
    throw {
      type: "not_find_error",
      message: "Colaborador não encontrado.",
      statusCode: 404,
    };

  const card = await findByTypeAndEmployeeId(type, employeeId);
  if (card)
    throw {
      type: "double_card_error",
      message: "Colaborador já possui o cartão.",
      statusCode: 403,
    };

  const number = numbersGenerator(16);
  const cardholderName = formattedName(employee);
  const expirationDate = dayjs().add(2, "year").format("MM/YY");
  const CVC = numbersGenerator(3);
  const cryptr = new Cryptr(process.env.SC);
  const securityCode = cryptr.encrypt(CVC);

  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  };
  cardRepository.insert(cardData);
}

const formattedName = (employee: Employee) => {
  let cardholderName: string = "";

  const fullNameArray = employee.fullName.split(" ");

  for (let i = 0; i < fullNameArray.length; i++) {
    if (i === 0 || i === fullNameArray.length - 1) {
      cardholderName += fullNameArray[i].toUpperCase() + " ";
    } else if (fullNameArray[i].length >= 3) {
      cardholderName += fullNameArray[i].toUpperCase()[0] + " ";
    }
  }
  return cardholderName.trim();
};
