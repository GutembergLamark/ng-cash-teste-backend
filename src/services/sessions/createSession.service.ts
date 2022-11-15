import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";

import { AppError } from "../../errors/appError";

import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { IUserRequest } from "../../interfaces/users";

import "dotenv/config";

const createSessionService = async ({
  username,
  password,
}: IUserRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      username,
    },
    relations: {
      account: true,
    },
  });

  if (!user) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordMatch = await compare(password, user.password!);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign(
    {
      accountId: user.account.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionService;
