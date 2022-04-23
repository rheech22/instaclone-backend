import { Resolvers } from "../../types";

// findFirst vs findUnique
// findUnique는 유니크한 field만 찾음

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
        include: {
          following: true,
          followers: true
        }
      })
  },
};

export default resolvers