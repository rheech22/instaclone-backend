import { hash } from "bcrypt";

import client from '../../client';
import { protectedResolver } from "../users.utils";


// curried func: protectedResolver(resolver)(root, args, context, info)

export default {
  Mutation: {
    editProfile: protectedResolver( async (
      _: any, 
      {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
      }: any,
      {
        loggedInUser
      }: any
    ) => {
      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await hash(newPassword, 10);
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
