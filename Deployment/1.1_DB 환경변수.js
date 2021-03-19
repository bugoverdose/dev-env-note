/*
  DATABASE_URL : Heroku 배포한 경우 변하는 모든 DB 정보들이 담기는 환경변수.
  
  cf) DB_HOST, DB_PORT 등의 값은 영구적이지 않으므로 직접 복붙하면 언젠가는 에러 발생.
*/
// [app.module.ts]
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.test", // 환경변수들 가져올 파일 경로.
      ignoreEnvFile: process.env.NODE_ENV === "production", // 서버에 배포되어 prod로 실행할 때 환경변수 파일들 무시. 사용되지 않도록 설정.
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "production", "test").required(), // NODE_ENV의 값은 dev, prod, test만 가능하도록 지정. Jest 자체 디폴트 값은 NODE_ENV=test
        DB_HOST: Joi.string(), // Heroku 서버에 배포하게 되면 DATABASE_URL에 담기는 정보들. 불필요.
        DB_PORT: Joi.string(), // Config Object Validation
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        TOKEN_SECRET: Joi.string().required(), // 문자열이어야 하며 존재해야만 함.
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      ssl: { rejectUnauthorized: false }, // Heroku 배포시 SSL 관련 에러 해결 목적.
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL } // Heroku에서 제공되는 환경변수.
        : // production 단계에서 활용. DB 정보 변경시 실시간 반영되며 아래의 모든 정보가 포함.
          {
            host: process.env.DB_HOST, // 개발 및 테스트 단계 활용.
            port: +process.env.DB_PORT, // DB 변경시 값 변경되므로 배포했을 때는 활용 불가.
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      synchronize: true, // TypeORM이 DB에 연결될 때 Model들의 현재 상태에 맞추어 DB를 migrate하는 설정.
      logging: false, // DB에서 일어나는 일들을 콘솔에 표시해주는 설정.
      entities: [Podcast, Episode, User, Review],
    }),
    // ~~~
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
