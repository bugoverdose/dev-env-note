/*
  AppModule로 테스트 모듈 생성하여 실행하고 멈춰줘야 함.
  - beforeAll - app.init();
  - afterAll - app.close();

  테스트 시작시 DB migration 진행. 사용자 생성 등 작업 실제로 발생.
  => 테스트 종료시 test DB 지우기. drop database. - 별도 셋업 필요.
*/
import { Test, TestingModule } from "@nestjs/testing";
import { getConnection } from "typeorm";
import { AppModule } from "../src/app.module";

describe("UsersModule (e2e)", () => {
  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    getConnection().dropDatabase(); // typeOrm. 테스트 종료시 drop database
    app.close();
  });

  it.todo("createAccount");
  it.todo("login");
  it.todo("loggedInUser");
  it.todo("userProfile");
  it.todo("editProfile");
  it.todo("verifyEmail");
});
