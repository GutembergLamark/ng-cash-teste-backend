import { Request, Response } from "express";

import createUserService from "../../services/users/createUser.service";

import { IUserRequest } from "../../interfaces/users";

const createUserController = async (req: Request, res: Response) => {
  const { username, password } = req.validatedBody as IUserRequest;

  const user = await createUserService({ username, password });

  delete user.password;

  return res.status(201).json({ user });
};

export default createUserController;
