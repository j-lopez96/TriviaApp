import { gql } from '@apollo/client'

/**
 * Every Query is followed by the specific type for how the data should be given by the API. They are colocated so that they are easy to import
 */

export const GET_MY_QUESTION_SETS = gql`
  query GetMe {
    getMe {
      questionSets {
        name
        id
        private
        explicit
        questionCount
      }
    }
  }
`

export type QuestionSetType = {
  id: string
  name: string
  private: boolean
  explicit: boolean
  questionCount: number
}

export type QuestionSetsType = {
  getMe: {
    questionSets: [QuestionSetType]
  }
}
