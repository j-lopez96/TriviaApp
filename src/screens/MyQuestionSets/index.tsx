import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import {
  GET_MY_QUESTION_SETS,
  QuestionSetsType,
  QuestionSetType,
} from '../../gql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { QuestionSetCards } from './QuestionSetCard'
import { CreateQuestionSetForm } from './QuestionSetForm'
import { CREATE_QUESTION_SET, DELETE_QUESTION_SET } from '../../gql/mutations'
import Snackbar from 'react-native-snackbar'

const MyQuestionSets = ({ navigation }) => {
  const styles = styleSheet()
  const {
    loading,
    data,
  }: { loading: any; error?: any; data?: QuestionSetsType } =
    useQuery(GET_MY_QUESTION_SETS)
  const [createQuestionSet] = useMutation(CREATE_QUESTION_SET, {
    refetchQueries: [GET_MY_QUESTION_SETS],
  })
  const [deleteQuestionSet] = useMutation(DELETE_QUESTION_SET, {
    refetchQueries: [GET_MY_QUESTION_SETS],
    onCompleted: ({
      deleteQuestionSet: deletedSet,
    }: {
      deleteQuestionSet: QuestionSetType
    }) => {
      Snackbar.show({
        text: `${deletedSet.name} was deleted`,
        duration: Snackbar.LENGTH_SHORT,
      })
    },
  })
  if (loading) {
    return <ActivityIndicator style={styles.loadingSpinner} size="large" />
  }
  return (
    <View style={styles.mainContainer}>
      <QuestionSetCards
        navigation={navigation}
        deleteAction={deleteQuestionSet}
      >
        {data?.getMe?.questionSets}
      </QuestionSetCards>
      <CreateQuestionSetForm mutation={createQuestionSet} />
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    loadingSpinner: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    mainContainer: {
      flex: 0.95,
    },
  })
}

export default MyQuestionSets
