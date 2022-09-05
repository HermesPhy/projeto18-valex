import Joi, { Schema } from "joi";

export const cardTypeSchema: Schema = Joi.object({
  employeeId: Joi.number().required(),
  type: Joi.valid(
    "groceries",
    "restaurant",
    "transport",
    "education",
    "health"
  ),
});

export const activateCardSchema: Schema = Joi.object({
  cvc: Joi.string().length(3).required(),
  password: Joi.string().length(4).required(),
});

export const paymentSchema: Schema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.number().required(),
  businessId: Joi.number().required(),
  value: Joi.number().min(1).required(),
});
