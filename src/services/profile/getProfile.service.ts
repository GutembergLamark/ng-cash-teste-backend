import AppDataSource from "../../data-source";

import { User } from "../../entities/user.entity";

const getProfileService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      account: true,
    },
  });

  return user;
};

export default getProfileService;
