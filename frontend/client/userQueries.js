
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation Mutation($password: String!, $email: String!) {
        loginUser(password: $password, email: $email) {
            errors {
                field
                message
            }
            user {
                id
                createdAt
                updatedAt
                email
            }
        }
    }
`;
export const ME = gql`
   query Query {
        me {
            id
            createdAt
            updatedAt
            email
            firstName
            lastName
        }
    }
`;

export const CREATE_USER = gql`
mutation CreateUser($lastName: String!, $firstName: String!, $password: String!, $email: String!) {
  createUser(lastName: $lastName, firstName: $firstName, password: $password, email: $email) {
    errors {
      field
      message
    }
    user {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
    }
  }
}
`


export const LOGOUT = gql`
mutation Mutation {
  logoutUser
}
`

