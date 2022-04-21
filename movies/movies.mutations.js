import client from "../client";

// 리졸버는 쿼리, 뮤테이션이 어떻게 작동하는지 정의
// CRUD 중에서 Query => R, Mutation => CUD
export default {
  Mutation: {
    createMovie: (_, { title, year, genre }) => client.movie.create({
      data: {
        title,
        year,
        genre,
      }
    }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id }}),
    updateMovie: (_, { id, year }) => client.movie.update({ where: { id }, data: { year }})
  } 
};
