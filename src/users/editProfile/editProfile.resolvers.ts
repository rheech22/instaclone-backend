import { hash } from "bcrypt";

import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";


// curried func: protectedResolver(resolver)(root, args, context, info)

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver( 
      async (_, 
      {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
      },
      {
        loggedInUser,
        client
      }
    ) => {
      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser?.id
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        }
      })

      if(updatedUser.id){
        return {
          ok: true,
        }
      } else {
        return {
          ok: false,
          error: "Couldnt do it"
        }
      }
    })
  }
}

export default resolvers;