import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GET_QUESTION_SET, QuestionType } from '../../gql/queries'
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  UPDATE_QUESTION,
} from '../../gql/mutations'
import { useQuery, useMutation } from '@apollo/client'
import { QuestionCards } from './QuestionCard'
import { QuestionCreateForm } from './QuestionCreateForm'

const MyQuestionSet = ({ route }) => {
  const styles = styleSheet()
  const { id } = route.params
  const {
    loading,
    data,
  }: {
    loading: any
    error?: any
    data?: { QuestionSet: { questions: [QuestionType] } }
  } = useQuery(GET_QUESTION_SET, { variables: { id } })
  const [createQuestion] = useMutation(CREATE_QUESTION, {
    refetchQueries: [GET_QUESTION_SET],
  })
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    refetchQueries: [GET_QUESTION_SET],
  })
  const [updateQuestion] = useMutation(UPDATE_QUESTION, {
    refetchQueries: [GET_QUESTION_SET],
  })
  if (loading) {
    return <ActivityIndicator style={styles.loadingSpinner} size="large" />
  }
  return (
    <View style={styles.mainContainer}>
      {data?.QuestionSet?.questions.length < 1 ? (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>There no questions</Text>
        </View>
      ) : (
        <QuestionCards
          deleteAction={deleteQuestion}
          updateAction={updateQuestion}
        >
          {data?.QuestionSet.questions}
        </QuestionCards>
      )}
      <QuestionCreateForm id={id} mutation={createQuestion} />
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      flex: 0.95,
    },
    loadingSpinner: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    emptyListContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyListText: {
      fontSize: 30,
    },
  })
}

export default MyQuestionSet
