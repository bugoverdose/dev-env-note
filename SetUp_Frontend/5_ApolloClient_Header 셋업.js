// [apollo.ts] 기본 형식
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
  cache: new InMemoryCache({
    /*~*/
  }),
});

// ==============================================================================
// ApolloClient에 http header 설정 방법. (https://www.apollographql.com/docs/react/networking/authentication/)
// setContext로 header 값 수정한 링크롤 ApolloClient의 link 값에 추가하여 configure
//  - 모든 요청에 대해 http header에 값이 담긴 상태로 query, mutation이 보내짐.

import { setContext } from "@apollo/client/link/context";

// token 값 localstorage에서 얻기

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql", // 백엔드의 playground 주소. (프론트엔드와 포트 번호는 달라야 함)
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers, // 기존에 존재하는 다른 http headers도 그대로 사용하도록.
      "x-jwt": token || "", // x-jwt key로 header 설정.
      // 주의. token이 없는 경우에 대비 필요.
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // concat을 통해 복수의 link들을 설정.
  cache: new InMemoryCache({
    /*~*/
  }),
});
