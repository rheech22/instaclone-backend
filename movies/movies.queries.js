import client from "../client";

// 리졸버는 쿼리, 뮤테이션이 어떻게 작동하는지 정의
// CRUD 중에서 Query => R, Mutation => CUD
export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id }})
  },
};
