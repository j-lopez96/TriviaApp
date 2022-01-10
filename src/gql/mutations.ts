import { gql } from '@apollo/client'

export const LOGIN_EMAIL = gql`
  mutation loginEmail($email: String!, $password: String!) {
    loginEmail(email: $email, password: $password) {
      accessToken
    }
  }
`

export const CREATE_QUESTION_SET = gql`
  mutation CreateQuestionSet(
    $name: String!
    $private: Boolean
    $explicit: Boolean
  ) {
    createQuestionSet(name: $name, private: $private, explicit: $explicit) {
      id
    }
  }
`

export const DELETE_QUESTION_SET = gql`
  mutation DeleteQuestionSet($id: String!) {
    deleteQuestionSet(id: $id) {
      name
      id
      private
      explicit
      questionCount
    }
  }
`

export const CREATE_QUESTION = gql`
  mutation CreateQuestion(
    $questionSetId: String
    $questionMessage: String!
    $answerA: String!
    $answerB: String!
    $answerC: String
    $answerD: String
    $correctAnswer: CorrectAnswer!
    $writeInAnswer: String
    $multipleChoice: Boolean
  ) {
    createQuestion(
      questionSetId: $questionSetId
      questionMessage: $questionMessage
      answerA: $answerA
      answerB: $answerB
      answerC: $answerC
      answerD: $answerD
      correctAnswer: $correctAnswer
      writeInAnswer: $writeInAnswer
      multipleChoice: $multipleChoice
    ) {
      id
    }
  }
`

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: String!) {
    deleteQuestion(id: $id)
  }
`

export const UPDATE_QUESTION = gql`
  mutation UpdateQuestion(
    $id: ID!
    $questionMessage: String!
    $answerA: String!
    $answerB: String!
    $answerC: String
    $answerD: String
    $correctAnswer: CorrectAnswer!
    $writeInAnswer: String
    $multipleChoice: Boolean
  ) {
    updateQuestion(
      id: $id
      questionMessage: $questionMessage
      answerA: $answerA
      answerB: $answerB
      answerC: $answerC
      answerD: $answerD
      correctAnswer: $correctAnswer
      writeInAnswer: $writeInAnswer
      multipleChoice: $multipleChoice
    ) {
      id
    }
  }
`
