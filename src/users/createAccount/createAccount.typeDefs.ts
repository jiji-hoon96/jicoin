import { gql } from "apollo-server";

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      nickname: String!
      username: String!
      email: String!
      password: String!
    ): CreateAccountResult!
  }
`;
