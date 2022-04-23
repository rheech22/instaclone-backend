import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

// findFirst vs findUnique
// findUnique는 유니크한 field만 찾음

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }))
  },
};

export default resolvers