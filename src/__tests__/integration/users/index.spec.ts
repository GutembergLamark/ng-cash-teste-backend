import request from "supertest";

import { DataSource } from "typeorm";

import AppDataSource from "../../../data-source";

import app from "../../../app";

import {
  mockedCashOut,
  mockedCashOutUsernameInvalid,
  mockedCashOutValueExceeded,
  mockedSecondUser,
  mockedSession,
  mockedUser,
  mockedUserErrorPassword,
  mockedUserErrorUsername,
} from "../../mocks";

describe("/users", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - Deve ser capaz de criar um usuário", async () => {
    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("account");
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).not.toHaveProperty("password");
    expect(response.status).toBe(201);
  });

  test("POST /users - Não deve ser capaz de criar um usuário se o username informado tiver menos de 3 caracters", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserErrorUsername);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      "Username must contain at least 3 digits"
    );
    expect(response.status).toBe(400);
  });

  test("POST /users - Não deve ser capaz de criar um usuário se a senha informada não estiver com o padrão obrigatório", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserErrorPassword);

    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      "Password must contain at least 1 capital letter, Password must contain at least 1 number, Password must contain at least 1 special character, Password must contain at least 8 digits"
    );
    expect(response.status).toBe(400);
  });

  test("POST /users - Não deve ser capaz de criar um usuário se o usuário já existe", async () => {
    await request(app).post("/users").send(mockedUser);

    const response = await request(app).post("/users").send(mockedUser);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Username already exists");
    expect(response.status).toBe(409);
  });

  test("POST /users/cashout - Deve realizar cashout para conta de outro usuário informando username e value", async () => {
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedSecondUser);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedSession);

    const response = await request(app)
      .post("/users/cashout")
      .send(mockedCashOut)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.transaction).toHaveProperty("id");
    expect(response.body.transaction).toHaveProperty("value");
    expect(response.body.transaction).toHaveProperty("createdAt");
    expect(response.body.transaction).toHaveProperty("debitedAccount");
    expect(response.body.transaction).toHaveProperty("creditedAccount");
    expect(response.status).toBe(201);
  });

  test("POST /users/cashout - Não deve realizar cashout para conta de outro usuário se o username informando não existir", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedSession);

    const response = await request(app)
      .post("/users/cashout")
      .send(mockedCashOutUsernameInvalid)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("User not exists");
    expect(response.status).toBe(400);
  });

  test("POST /users/cashout - Não deve realizar cashout para conta de outro usuário se o valor informando for maior do que o usuário tem diponível", async () => {
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedSecondUser);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedSession);

    const response = await request(app)
      .post("/users/cashout")
      .send(mockedCashOutValueExceeded)
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("code");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      "Not enough balance for this transaction"
    );
    expect(response.status).toBe(403);
  });

  test("POST /users/cashout - Não deve realizar cashout para conta de outro usuário se o token não for passado", async () => {
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedSecondUser);

    const response = await request(app)
      .post("/users/cashout")
      .send(mockedCashOut);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing token");
    expect(response.status).toBe(401);
  });

  test("POST /users/cashout - Não deve realizar cashout para conta de outro usuário se o token passado for inválido", async () => {
    await request(app).post("/users").send(mockedUser);
    await request(app).post("/users").send(mockedSecondUser);

    const response = await request(app)
      .post("/users/cashout")
      .send(mockedCashOut)
      .set("Authorization", "Bearer invalidtoken");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid Token");
    expect(response.status).toBe(401);
  });

  test("GET /users/account - Deve retornar todos os dados da conta do usuário que estiver logado", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedSession);

    const response = await request(app)
      .get("/users/account")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.account).toHaveProperty("id");
    expect(response.body.account).toHaveProperty("balance");
    expect(response.body.account).toHaveProperty("creditedTransactions");
    expect(response.body.account).toHaveProperty("debitedTransactions");
    expect(response.status).toBe(200);
  });

  test("GET /users/account - Não deve retornar todos os dados da conta se o token não for passado", async () => {
    await request(app).post("/users").send(mockedUser);

    const response = await request(app).get("/users/account");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing token");
    expect(response.status).toBe(401);
  });

  test("GET /users/account - Não deve retornar todos os dados da conta se o token passado for inválido", async () => {
    await request(app).post("/users").send(mockedUser);

    const response = await request(app)
      .get("/users/account")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid Token");
    expect(response.status).toBe(401);
  });
});
