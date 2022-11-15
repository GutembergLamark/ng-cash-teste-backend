import { Request, Response } from "express";

import createSessionService from "../../services/sessions/createSession.service";

import { IUserRequest } from "../../interfaces/users";

const createSessionController = async (req: Request, res: Response) => {
  const { username, password } = req.validatedBody as IUserRequest;

  const token = await createSessionService({ username, password });

  return res.status(200).json({ token });
};

export default createSessionController;
