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
