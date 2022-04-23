import { createWriteStream } from "fs";
import { hash } from "bcrypt";
import { GraphQLUpload } from "graphql-upload";

import { Resolvers, Scalars } from "../../types";
import { protectedResolver } from "../users.utils";


// curried func: protectedResolver(resolver)(root, args, context, info)

const resolvers: Resolvers | Scalars = {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectedResolver( 
      async (_, 
      {
        firstName,
        lastName,
        username,
        email,
        password: newPassword,
        bio,
        avatar
      },
      {
        loggedInUser,
        client
      }
    ) => {
      let avatarUrl = null;

      if(avatar){
        const { filename, createReadStream } = await avatar;
        const newFilename = `${loggedInUser?.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();      
        const writeStream = createWriteStream(process.cwd() + "/src/uploads/" + newFilename);
  
        readStream.pipe(writeStream);

        avatarUrl = `http://localhost:4000/static/${newFilename}`
      }
      
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
          bio,
          ...(uglyPassword && { password: uglyPassword }),
          ...(avatarUrl && { avatar: avatarUrl }),
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