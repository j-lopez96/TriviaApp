import React, { useState } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { FlippingCard } from '../../components'
import { QuestionType } from 'gql/queries'
import { QuestionEditForm } from './QuestionEditForm'

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
  const [isVisible, setVisible] = useState(false)
  const openForm = () => {
    setVisible(!isVisible)
  }
  const RenderItem = ({
    item,
    index,
  }: {
    item: QuestionType
    index: number
  }) => {
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
      <View>
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
  return (
    <View style={styles.mainContainer}>
      <FlatList data={children} renderItem={RenderItem} />
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
