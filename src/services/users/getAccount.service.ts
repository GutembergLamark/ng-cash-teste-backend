import AppDataSource from "../../data-source";

import { Account } from "../../entities/account.entity";

const getTransactionsService = async (accountId: string) => {
  const accountRepository = AppDataSource.getRepository(Account);

  const account = await accountRepository.findOne({
    where: {
      id: accountId,
    },
  });

  return account;
};

export default getTransactionsService;
