import { hash } from 'bcrypt';

import { Resolvers } from '../../types';
import { protectedResolver } from '../users.utils';


const resolvers: Resolvers = {
  Mutation: {
    createAccount: 
      async (
        _, 
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }, 
        { client }
      ) => {
     try {
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
      const uglyPassword = await hash(password, 10);
      
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

export default resolvers;
