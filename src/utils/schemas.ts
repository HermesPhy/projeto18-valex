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
