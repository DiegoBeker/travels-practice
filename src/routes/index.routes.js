import { Router } from "express";
import travelsRouter from "./travels.routes.js";

const router = Router();

router.use(travelsRouter);

export default router;