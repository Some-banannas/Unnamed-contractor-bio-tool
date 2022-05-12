
import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
mutation Mutation($jobTitle: String!, $aboutMe: String!) {
  changeProfile(jobTitle: $jobTitle, aboutMe: $aboutMe) {
    errors {
      field
      message
    }
    profile {
      id
      aboutMe
      jobTitle
    }
  }
}
`;

export const PROFILE = gql`
query Query {
  profile {
    aboutMe
    id
    jobTitle
  }
}
`;


