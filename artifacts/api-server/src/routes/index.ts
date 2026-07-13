import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import geminiRouter from "./gemini";
import internshipRouter from "./internship";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(geminiRouter);
router.use(internshipRouter);

export default router;
