import AppDataSource from "../../data-source";

import { Account } from "../../entities/account.entity";
import { Transaction } from "../../entities/transaction.entity";
import { User } from "../../entities/user.entity";

import { AppError } from "../../errors/appError";

import { ICashOutRequest } from "../../interfaces/users";

const createCashOutService = async (
  { username, value }: ICashOutRequest,
  accountId: string,
  id: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const transactionRepository = AppDataSource.getRepository(Transaction);
  const accountRepository = AppDataSource.getRepository(Account);

  const userCashIn = await userRepository.findOne({
    where: {
      username,
    },
    relations: {
      account: true,
    },
  });

  if (!userCashIn) {
    throw new AppError("User not exists", 400);
  }

  if (userCashIn.id === id) {
    throw new AppError(
      "It is only possible to make transactions for other users",
      403
    );
  }

  const debitedAccount = await accountRepository.findOneBy({ id: accountId });
  const creditedAccount = await accountRepository.findOneBy({
    id: userCashIn.account.id,
  });

  if (debitedAccount!.balance < Number(value)) {
    throw new AppError("Not enough balance for this transaction", 403);
  }

  await accountRepository.update(debitedAccount!.id, {
    balance: debitedAccount!.balance - value,
  });

  await accountRepository.update(creditedAccount!.id, {
    balance: creditedAccount!.balance + value,
  });

  const updatedDebitedAccount = await accountRepository.findOneBy({
    id: accountId,
  });

  const updatedCreditedAccount = await accountRepository.findOneBy({
    id: userCashIn.account.id,
  });

  const transaction = transactionRepository.create({
    debitedAccount: updatedDebitedAccount!,
    creditedAccount: updatedCreditedAccount!,
    value,
  });

  await transactionRepository.save(transaction);

  return transaction;
};

export default createCashOutService;
