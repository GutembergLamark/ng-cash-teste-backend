import * as yup from "yup";

import { SchemaOf } from "yup";

import { IUserRequest } from "../interfaces/users";

export const createSessionSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
