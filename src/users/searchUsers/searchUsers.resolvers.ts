import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) => {
      // TODO: handle exceptions, apply pagination
      return client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          }
        }
      })
    }
  }
};