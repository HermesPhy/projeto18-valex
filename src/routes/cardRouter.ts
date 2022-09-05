import { Router } from "express";

import {
  companyApiValidation,
  newCardValidation,
} from "../middlewares/validationMiddleware.js";
import newCard from "../controllers/newCardController.js";

const cardRouter = Router();

cardRouter.post("/card/new", companyApiValidation, newCardValidation, newCard);

export default cardRouter;
