import request from "supertest";

import { DataSource } from "typeorm";

import AppDataSource from "../../../data-source";

import app from "../../../app";

import { mockedSession, mockedUser } from "../../mocks";

describe("/session", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /session - Deve ser capaz de fazer login com usuário e senha", async () => {
    const response = await request(app).post("/session").send(mockedSession);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });
});
