import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async(_, { file, caption }, {loggedInUser, client})=> {
        if (caption){
          // TODO: parse caption, get or create Hashtags
          const hastags = caption.match(/#[\w]|/g);
          console.log(hastags);
        }
        // client.photo.create({
        //   data: {
        //     file,
        //     caption,
        //     hashtags: {
        //       connectOrCreate: [
        //         {
        //           where: {
        //             hashtag: '#food'
        //           },
        //           create: {
        //             hashtag: '#food'
        //           }
        //         }
        //       ]
        //     }
        //   }
        // })
        // save the photo with th parsed hashtags
        // add the photo to the hashtags
    })
  }
};

export default resolvers;
