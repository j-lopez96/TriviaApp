import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { GET_MY_QUESTION_SETS, QuestionSetsType } from '../../gql/queries'
import { useQuery } from '@apollo/client'
import { QuestionSetCards } from './QuestionSetCard'

const MyQuestionSets = ({ navigation }) => {
  const styles = styleSheet()
  const {
    loading,
    error,
    data,
  }: { loading: any; error?: any; data?: QuestionSetsType } =
    useQuery(GET_MY_QUESTION_SETS)
  if (loading) {
    return <ActivityIndicator style={styles.loadingSpinner} size="large" />
  }
  return (
    <QuestionSetCards navigation={navigation}>
      {data?.getMe?.questionSets}
    </QuestionSetCards>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    loadingSpinner: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  })
}

export default MyQuestionSets
