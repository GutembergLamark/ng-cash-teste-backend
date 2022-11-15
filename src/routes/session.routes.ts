import { Router } from "express";
import createSessionController from "../controllers/sessions/createSession.controller";

import validateRequestMiddleware from "../middlewares/validateRequest.middleware";
import { createSessionSchema } from "../serializers";

const routes = Router();

export const sessionRoutes = () => {
  routes.post(
    "",
    validateRequestMiddleware(createSessionSchema),
    createSessionController
  );
  return routes;
};
