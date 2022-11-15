import { Request, Response } from "express";
import getProfileService from "../../services/profile/getProfile.service";

const getProfileController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const user = await getProfileService(id);

  delete user?.password;

  return res.status(200).json({ user });
};

export default getProfileController;
