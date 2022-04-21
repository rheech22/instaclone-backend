import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

import schema from "./schema";

// 대충 순서
// 스키마를 작성하고 migrate하는 작업
// 스카마에 따라 typeDefs를 정의해주는 작업
// typeDe1fs에 따라 resolver를 정의해주는 작업

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

server
  .listen()
  .then(()=> console.log('Server is running - http://localhost:4000'))
