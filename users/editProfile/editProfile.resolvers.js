import bcrypt from "bcrypt";

import client from '../../client';
import { protectedResolver } from "../users.utils";


// curried func: protectedResolver(resolver)(root, args, context, info)

export default {
  Mutation: {
    editProfile: protectedResolver( async (
      _, 
      {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
      },
      {
        loggedInUser
      }
    ) => {
      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: loggedInUser.id
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
