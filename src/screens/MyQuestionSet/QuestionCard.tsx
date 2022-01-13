import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { FlippingCard } from '../../components'
import { QuestionType } from 'gql/queries'
import { QuestionEditForm } from './QuestionEditForm'

const RenderItem = ({
  item,
  index,
  updateAction,
  deleteAction,
}: {
  item: QuestionType
  index: number
  updateAction: any
  deleteAction: any
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const openForm = () => {
    setIsVisible(!isVisible)
  }
  const {
    id,
    answerA,
    answerB,
    answerC,
    answerD,
    correctAnswer,
    multipleChoice,
    writeInAnswer,
  } = item
  return (
    <View key={index}>
      <QuestionEditForm
        id={id}
        data={item}
        mutation={updateAction}
        isVisible={isVisible}
        visibilityControl={openForm}
      />
      <FlippingCard
        direction="vertical"
        key={index}
        deleteAction={deleteAction}
        updateAction={openForm}
        id={id}
      >
        <FlippingCard.Front>{item.questionMessage}</FlippingCard.Front>
        <FlippingCard.Back>
          <FlippingCard.BackBody
            key={index}
            data={{
              answerA,
              answerB,
              answerC,
              answerD,
              correctAnswer,
              multipleChoice,
              writeInAnswer,
            }}
          />
        </FlippingCard.Back>
      </FlippingCard>
    </View>
  )
}

export const QuestionCards = ({
  children,
  deleteAction,
  updateAction,
}: {
  children: [QuestionType]
  deleteAction?: any
  updateAction?: any
}) => {
  const styles = styleSheet()

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={children}
        renderItem={({ item, index }) => (
          <RenderItem
            item={item}
            index={index}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        )}
      />
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      width: '100%',
      height: '100%',
    },
  })
}
