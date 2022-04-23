require('dotenv').config();

import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./client";

import schema from "./schema";

import { getUser } from "./users/users.utils";

// 대충 순서
// 스키마를 작성하고 migrate하는 작업
// 스카마에 따라 typeDefs를 정의해주는 작업
// typeDe1fs에 따라 resolver를 정의해주는 작업

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    }
  },
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

const PORT = process.env.PORT;

server
  .listen()
  .then(()=> console.log(`Server is running - http://localhost:${PORT}`))
