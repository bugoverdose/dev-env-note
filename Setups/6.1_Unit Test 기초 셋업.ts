/*
Unit Test : Service의 개별 메서드에 대한 테스트. 최대한 구분하여 테스트.
: User Service만 테스트. GraphQL Resolver와 구분하여 테스트 등.
: 함수의 실행결과만이 아니라 특정 함수의 모든 과정을 세부적으로 테스트 목적.

1) 테스트할 서비스(UsersService)로 테스트 모듈을 따로 생성하여 테스트 실행.  
   : beforeEach로 각 테스트 전에 테스트 모듈 생성하여 컴파일하도록.
   : 비교) beforeAll 사용시, toHaveBeenCalledTimes(1); 테스트 어려워짐. 누적 카운트됨.
2) 생성되는 테스트 모듈의 서비스 사용할 수 있도록 let 변수에 대입.
*/
import { Test } from "@nestjs/testing";
import { UsersService } from "./4.1_users.service";

describe("UserService", () => {
  let service: UsersService; // 2) 테스트 모듈의 서비스 접근 목적

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersService], // 모듈에서 사용할 서비스 설정.
    }).compile(); // 1) 각 테스트 전에 테스트 모듈 생성하여 컴파일하도록.
    service = module.get<UsersService>(UsersService); // 2) 테스트 모듈의 서비스 사용할 수 있도록 let 변수에 대입.
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it.todo("createAccount"); // it.todo: 투두 리스트 생성.
  it.todo("login");
  it.todo("findById");
  it.todo("editProfile");
  it.todo("verifyEmail");
});
