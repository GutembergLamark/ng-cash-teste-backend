import * as yup from "yup";

import { SchemaOf } from "yup";

import { ICashOutRequest, IUserRequest } from "../interfaces/users";

export const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "Username must contain at least 3 digits"),
  password: yup
    .string()
    .required()
    .matches(/[A-Z]/, "Password must contain at least 1 capital letter")
    .matches(/([a-z])/, "Password must contain at least 1 lowercase letter")
    .matches(/(\d)/, "Password must contain at least 1 number")
    .matches(/(\W)|_/, "Password must contain at least 1 special character")
    .matches(/.{8,}/, "Password must contain at least 8 digits"),
});

export const createCashOutSchema: SchemaOf<ICashOutRequest> = yup
  .object()
  .shape({
    username: yup.string().required(),
    value: yup.number().required(),
  });
