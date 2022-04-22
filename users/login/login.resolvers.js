import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import client from '../../client';


export default {
  Mutation: {
    login: async(_, {
      username,
      password
    }) => {
      // find user with args.username
      const user = await client.user.findFirst({
        where: {
          username
        }
      })

      if(!user){
        return {
          ok: false,
          error: "User not found."
        };
      }
      
      // check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);

      if(!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password"
        }
      }

      // issue a token and send it to the user
      // token 발행의 첫 번째 인자로 토큰에 넣게 될 데이터를 객체 형태로 전달
      // 아무거나 넣어도 되고, 발행된 토큰으로 누구나 조회 가능
      // 즉 오픈된 데이터이므로 시크릿한 데이터를 포함시키면 안 됨
      const token = await jwt
        .sign({ 
          id: user.id,
          // something: "anything",
        }, 
        process.env.SECRET_KEY
      );

      return {
        ok: true,
        token,
      }
    }
  },
};
