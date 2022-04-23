import client from "../../client";


// findFirst vs findUnique
// findUnique는 유니크한 field만 찾음

export default {
  Query: {
    seeProfile: (_: any, {username}: any) => client.user.findUnique({
      where: {
        username,
      }
    })
  },
};