import { Router } from "express";
import travelsController from "../controllers/travels.controllers.js";

const travelsRouter = Router();

travelsRouter.get('/passengers/travels', travelsController.getPassengersTravels);

export default travelsRouter;