import { Router } from "express";
import createCashOutController from "../controllers/users/createCashOut.controller";
import createUserController from "../controllers/users/createUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import validateRequestMiddleware from "../middlewares/validateRequest.middleware";
import { createCashOutSchema, createUserSchema } from "../serializers";

const routes = Router();

export const userRoutes = () => {
  routes.post(
    "",
    validateRequestMiddleware(createUserSchema),
    createUserController
  );

  routes.post(
    "/cashout",
    validateRequestMiddleware(createCashOutSchema),
    ensureAuthMiddleware,
    createCashOutController
  );

  return routes;
};
