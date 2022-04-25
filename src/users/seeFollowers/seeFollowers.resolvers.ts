import { Resolvers } from "../../types"

const resolvers: Resolvers =  {
  Query: {
    seeFollowers: async (_, { username, page}, { client }) => {
      const isUser = await client.user
        .findUnique({ 
          where: { username },
          select: { id: true }
        })
      if (!isUser) {
        return {
          ok: false,
          error: "User Not Found"
        }
      }

      const followers = await client.user
        .findUnique({where: {username}})
        .followers({
          take: 5,
          skip: (page-1) * 5,
        });
      
      const totalFollowers = await client.user
        .count({
          where: {
            following: {
              some: { username }
            }
          }
        })

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers/5)
      }      
    }
  }
}

export default resolvers;