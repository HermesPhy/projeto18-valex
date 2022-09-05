import { Router } from "express";

import { paymentValidation } from "../middlewares/validationMiddleware.js";
import payment from "../controllers/paymentController.js";

const paymentRouter = Router();

paymentRouter.post("/payment", paymentValidation, payment);

export default paymentRouter;
