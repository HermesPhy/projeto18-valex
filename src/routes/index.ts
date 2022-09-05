import { Response, Request, Router } from "express";

import cardRouter from "./cardRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargeRouter from "./rechargeRouter.js";

const router = Router();

router.use(cardRouter);
router.use(paymentRouter);
router.use(rechargeRouter);
router.get("/", (req: Request, res: Response) => {
  return res.send("Olá");
});

export default router;
