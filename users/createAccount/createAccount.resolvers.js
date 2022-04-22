import bcrypt from 'bcrypt';

import client from "../../client";


export default {
  Mutation: {
    createAccount: async (_, {
      firstName,
      lastName,
      username,
      email,
      password,
    }) => {
     try{
      // 1. check if username or email are already on DB
      const existingUser = await client.user.findFirst({
        where: {
          OR: [
            {
              username
            },
            {
              email
            },
          ]
        }
      });

      if (existingUser) {
        throw new Error('already existed username/email');
      };
      // 2. hash password
      const uglyPassword = await bcrypt.hash(password, 10);
      // 3. save and return the user
      return client.user.create({
        data: {
          username,
          email,
          firstName,
          lastName, 
          password: uglyPassword,
        }
      });
     } catch(e) {
      return e;
     }
    }
  },
};
