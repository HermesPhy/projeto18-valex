import { Router } from "express";

import {
  companyApiValidation,
  newCardValidation,
  cardValidationByParamsId,
  activateCardValidation,
} from "../middlewares/validationMiddleware.js";
import newCard from "../controllers/newCardController.js";
import activateCard from "../controllers/activateCardController.js";

const cardRouter = Router();

cardRouter.post("/card/new", companyApiValidation, newCardValidation, newCard);
cardRouter.post(
  "/card/:id/activate",
  cardValidationByParamsId,
  activateCardValidation,
  activateCard
);

export default cardRouter;
