import AppDataSource from "../../data-source";

import { Account } from "../../entities/account.entity";
import { User } from "../../entities/user.entity";

import { AppError } from "../../errors/appError";

import { hash } from "bcrypt";

import { IUserRequest } from "../../interfaces/users";

const createUserService = async ({
  username,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const accountRepository = AppDataSource.getRepository(Account);

  const usernameAlreadyExists = await userRepository.findOneBy({ username });

  if (usernameAlreadyExists) {
    throw new AppError("Username already exists", 409);
  }

  const account = accountRepository.create({
    balance: 100,
  });

  await accountRepository.save(account);

  const user = userRepository.create({
    username,
    password: await hash(password, 10),
    account,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
