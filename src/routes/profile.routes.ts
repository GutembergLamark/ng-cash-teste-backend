import { Router } from "express";

import getProfileController from "../controllers/profile/getProfile.controller";

import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const routes = Router();

export const profileRoutes = () => {
  routes.get("", ensureAuthMiddleware, getProfileController);
  return routes;
};
