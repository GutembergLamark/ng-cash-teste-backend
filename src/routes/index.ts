import { Express } from "express";

import { profileRoutes } from "./profile.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/users", userRoutes());
  app.use("/session", sessionRoutes());
  app.use("/profile", profileRoutes());
};

export default appRoutes;
