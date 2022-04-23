import { JwtPayload, verify } from 'jsonwebtoken';

import client from '../client';
import { Resolver } from '../types';

export const getUser = async( token: string ) => {
  try {
    if(!token) {
      return null
    };

    const { id } = await verify(token, process.env.SECRET_KEY!) as JwtPayload;

    const user = await client.user.findUnique({
      where: {
        id
      }
    });

    if(!user){
      return null;
    }

    return user;    
  }catch(e){
    return null;
  }
}

export const protectedResolver = (resolver: Resolver) => (root: any, args: any, context: any, info: any) => {
  if(!context.loggedInUser) {
    return {
      ok: false,
      error: 'you need to be logged in.'
    }
  }
  return resolver(root, args, context, info);
}
