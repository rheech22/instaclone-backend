import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client })=> {
        const targetUser = await client.user.findUnique({ where: { username }});
        
        if(!targetUser){
          return {
            ok: false,
            error: "That User not exist."
          }
        }

        await client.user.update({
          where: {
            id: loggedInUser!.id
          },
          data: {
            following: {
              disconnect: {
                username
              }
            }
          }
        })
        
        return {
          ok: true
        };
      }
    )
  }
}
