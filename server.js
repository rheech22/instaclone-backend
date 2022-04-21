import { PrismaClient } from "@prisma/client";

import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// 프리즈마 클라이언트는 작성된 스키마에 따라 생성됨
const client = new PrismaClient()

// 클라이언트는 스키마에 의해 자동으로 생성되지만,
// Type Definition은 스키마와 일치하도록 직접 수정해줘야 함
// Type Definition은 모델, 쿼리, 뮤테이션이 어떤 타입인지 명시
// 타입스크립트와 유사함
// ! => required
const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int! year: Int!): Movie
  }
`;

// 리졸버는 쿼리, 뮤테이션이 어떻게 작동하는지 정의
// CRUD 중에서 Query => R, Mutation => CUD
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => client.movie.findUnique({ where: { id }})
  },
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

// 대충 순서
// 스키마를 작성하고 migrate하는 작업
// 스카마에 따라 typeDefs를 정의해주는 작업
// typeDefs에 따라 resolver를 정의해주는 작업

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
});

server
  .listen()
  .then(()=> console.log('Server is running - http://localhost:4000'))
