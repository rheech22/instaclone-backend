import { gql } from "apollo-server";


// password는 쿼리에 직접적으로 사용되지 않으므로 생략

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult
  }
`;
