import { ICashOutRequest, IUserRequest } from "../../interfaces/users";

export const mockedUser: IUserRequest = {
  username: "Daniel",
  password: "Daniel@1234",
};

export const mockedSecondUser: IUserRequest = {
  username: "João",
  password: "Joao@1234",
};

export const mockedUserErrorUsername: IUserRequest = {
  username: "Ju",
  password: "Ju@12345",
};

export const mockedUserErrorPassword: IUserRequest = {
  username: "Leticia",
  password: "senha",
};

export const mockedCashOut: ICashOutRequest = {
  username: "João",
  value: 20,
};

export const mockedCashOutValueExceeded: ICashOutRequest = {
  username: "João",
  value: 150,
};

export const mockedCashOutUsernameInvalid: ICashOutRequest = {
  username: "Felipe",
  value: 10,
};

export const mockedSession: IUserRequest = {
  username: "Daniel",
  password: "Daniel@1234",
};
