import { gql } from '@apollo/client'

export const LOGIN_EMAIL = gql`
  mutation loginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      accessToken
    }
  }
`
