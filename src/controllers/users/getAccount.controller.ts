import { Request, Response } from "express";
import getAccountService from "../../services/users/getAccount.service";

const getAccountController = async (req: Request, res: Response) => {
  const { accountId } = req.user;

  const account = await getAccountService(accountId);

  return res.status(200).json({ account });
};

export default getAccountController;
