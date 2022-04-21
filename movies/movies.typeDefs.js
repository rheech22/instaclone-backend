// 클라이언트는 스키마에 의해 자동으로 생성되지만,
// Type Definition은 스키마와 일치하도록 직접 수정해줘야 함
// Type Definition은 모델, 쿼리, 뮤테이션이 어떤 타입인지 명시
// 타입스크립트와 유사함
// ! => required

import { gql } from "apollo-server";

export default gql`
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
