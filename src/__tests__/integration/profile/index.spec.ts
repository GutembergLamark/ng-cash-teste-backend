import request from "supertest";

import { DataSource } from "typeorm";

import AppDataSource from "../../../data-source";

import app from "../../../app";
import { mockedSession, mockedUser } from "../../mocks";

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

  test("GET /profile - Deve retornar todos os dados do usuário logado", async () => {
    await request(app).post("/users").send(mockedUser);

    const userLoginResponse = await request(app)
      .post("/session")
      .send(mockedSession);

    const response = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${userLoginResponse.body.token}`);

    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user).toHaveProperty("username");
    expect(response.body.user).toHaveProperty("account");
    expect(response.status).toBe(200);
  });

  test("GET /profile - Não deve retornar todos os dados do usuário logado se o token não for passado", async () => {
    await request(app).post("/users").send(mockedUser);

    const response = await request(app).get("/profile");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Missing token");
    expect(response.status).toBe(401);
  });

  test("GET /profile - Não deve retornar todos os dados do usuário logado se o token passado for inválido", async () => {
    await request(app).post("/users").send(mockedUser);

    const response = await request(app)
      .get("/profile")
      .set("Authorization", "Bearer invalidtoken");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("Invalid Token");
    expect(response.status).toBe(401);
  });
});
