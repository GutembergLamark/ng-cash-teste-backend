import { Request, Response } from "express";
import { ICashOutRequest } from "../../interfaces/users";
import createCashOutService from "../../services/users/createCashOut.service";

const createCashOutController = async (req: Request, res: Response) => {
  const { username, value } = req.validatedBody as ICashOutRequest;

  const { id, accountId } = req.user;

  const transaction = await createCashOutService(
    { username, value },
    accountId,
    id
  );

  delete transaction.debitedAccount?.debitedTransactions;
  delete transaction.debitedAccount?.creditedTransactions;

  delete transaction.creditedAccount?.debitedTransactions;
  delete transaction.creditedAccount?.creditedTransactions;

  return res.status(201).json({ transaction });
};

export default createCashOutController;
