require('dotenv').config();

import express from "express";
import logger from "morgan";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress} from "graphql-upload";

import { typeDefs, resolvers } from "./schema";

import { getUser } from "./users/users.utils";
import client from "./client";

const PORT = process.env.PORT;

// 대충 순서
// 스키마를 작성하고 migrate하는 작업
// 스카마에 따라 typeDefs를 정의해주는 작업
// typeDe1fs에 따라 resolver를 정의해주는 작업

async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token as string),
        client,
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await apollo.start();

  const app = express();

  app.use(logger("tiny"));

  app.use("/static", express.static("src/uploads"));

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  apollo.applyMiddleware({ app });

  await new Promise<void>(r => app.listen({ port: PORT }, r));

  console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
}

startServer();