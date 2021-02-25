/*
  AppModule로 테스트 앱모듈 생성하여 실행하고 멈춰줘야 함.
  - beforeAll - app.init();
  - afterAll - app.close();

  테스트 앱모듈 생성 후 Entity로 Repository 사용 가능.
  - let usersRepo: Repository<UserEntity>;
  - usersRepo = module.get(getRepositoryToken(UserEntity)

  테스트 시작시 DB migration 진행. 사용자 생성 등 작업 실제로 발생.
  => 테스트 종료시 test DB 지우기. drop database. - 별도 셋업 필요.
*/
/*
  개별 resolver 테스트 방법
  - return request(app.getHttpServer()).post('/graphql').send({데이터}).expect(~).expect(~)
    - request 결과 반환 형식. ( == supertest) // import * as request from 'supertest';
    - app.getHttpServer로 요청 보내기.
    - .post: GrapqhQL Endpoint(localhost:3000/)로 post 요청 보내기.
           : 참고) GraphQL의 본질은 post request  
    - .send: post 요청으로 데이터 보내기. playground에서의 query/mutation 형식.
           : 데이터는 `` 템플릿 리터럴 활용.
           : 참고) ""도 가능은 함. but it's ugly. {query: "{loggedInUser{id}}"}
    - .expect(~): 해당 요청 결과에 따른 결과 예상.       
                : statuscode 예상 가능.
                : 요청결과 콜백함수의 매개변수로 받아 활용 가능.

  => resolver & TypeORM & Service 메서드 모두 제대로 동작하는지 동시에 확인 가능.
*/
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { getConnection } from "typeorm";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";

describe("UsersModule (e2e)", () => {
  let app: INestApplication;
  let usersRepo: Repository<UserEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    usersRepo = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
  });

  afterAll(async () => {
    await getConnection().dropDatabase(); // typeOrm. 테스트 종료시 drop database
    app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createAccount(input: {
                email:"bugod96@gmail.com", 
                password:"testtest",  
                role: Delivery
              }){
                ok,
                error 
              }
          }
          `,
        })
        .expect(200) // 요청결과 status code 200 예상.
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
          console.log(res.body);
        }); // 콜백함수로 요청결과 담김. 요청결과로 반환된 값 확인 가능.
    });

  it.todo("login");
  it.todo("loggedInUser");
  it.todo("userProfile");
  it.todo("editProfile");
  it.todo("verifyEmail");
});
