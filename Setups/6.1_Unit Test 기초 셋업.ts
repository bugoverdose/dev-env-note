/*
Unit Test : Service의 개별 메서드에 대한 테스트. 최대한 구분하여 테스트.
: User Service만 테스트. GraphQL Resolver와 구분하여 테스트 등.
: 함수의 실행결과만이 아니라 특정 함수의 모든 과정을 세부적으로 테스트 목적.

1) 테스트할 서비스(UsersService)로 테스트 모듈을 따로 생성하여 테스트 실행.  
   : beforeEach로 각 테스트 전에 테스트 모듈 생성하여 컴파일하도록.
   : 비교) beforeAll 사용시, toHaveBeenCalledTimes 테스트 어려워짐. 누적 카운트됨.
2) 생성되는 테스트 모듈의 서비스 사용할 수 있도록 let 변수에 대입.
*/
import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";

const mockRepository = () => ({
  findOne: jest.fn(), // 테스트하는 서비스에서 사용되는 모든 Repo 메서드들 설정.
  findOneOrFail: jest.fn(),
  save: jest.fn(), // 실제로 DB에 SQL문 보내지 않음.
  create: jest.fn(),
  delete: jest.fn(),
}); // 중요: mockRepository가 객체인 경우 verificationRepository.create & usersRepository.create 메서드는 서로 동일한 것으로 간주됨.
// 객체를 반환하는 함수로 설정하여 실행해줘야 verificationRepository.create & usersRepository.create 메서드가 서로 다른 것으로 간주됨.

const mockJwtService = () => ({
  sign: jest.fn(() => "signed-token"), // mock function으로서 세부 기능 지정. (signed-token라는 문자열을 반환)
  verify: jest.fn(), // JwtService에서 사용되는 모든 메서드들 설정.
}); // 객체를 반환하는 함수로 설정하여 실행해줘야 테스트 누적 카운트 문제 해결.

describe("UserService", () => {
  let service: UsersService; // 2) 테스트 모듈의 서비스 접근 목적
  let usersRepository: MockRepository<UserEntity>; // 4) MockRepo 사용 목적. TS 기능
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService, // 모듈에서 사용할 서비스 설정.
        // 3) Mocking UserEntity. TypeORM 속이기. (provide & useValue)
        { provide: getRepositoryToken(UserEntity), useValue: mockRepository() },
        { provide: JwtService, useValue: mockJwtService() }, // constructor의 외부 Entity, 서비스들 faking
      ],
    }).compile(); // 1) 각 테스트 전에 테스트 모듈 생성하여 컴파일하도록.
    service = module.get<UsersService>(UsersService); // 2) 테스트 모듈의 서비스 사용할 수 있도록 let 변수에 대입.
    usersRepository = module.get(getRepositoryToken(UserEntity));
    jwtService = module.get<JwtService>(JwtService);
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
