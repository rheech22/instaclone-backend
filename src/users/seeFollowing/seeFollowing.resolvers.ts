import { Resolvers } from "../../types"

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (_, { username, lastId }, { client }) => {
      const isUser = await client.user
        .findUnique({
          where: {username},
          select: {
            id: true
          }
        });
      if(!isUser) {
        return {
          ok: false,
          error: 'User Not Found',
        }
      };
      const following = await client.user
        .findUnique({where: {username}})
        .following({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId }})
        });
  
      return {
        ok: true,
        following
      }      
    }
  }
}

export default resolvers;