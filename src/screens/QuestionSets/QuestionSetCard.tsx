import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card } from '../../components'
import { QuestionSetType } from 'gql/queries'

export const QuestionSetCards = ({
  children,
}: {
  children: [QuestionSetType]
  navigation
}) => {
  const styles = styleSheet()
  const cardBodyAction = () => {
    console.log(' I was pressed')
    //Define here to navigate to the Question Set view where you see every question
  }
  return (
    <View style={styles.mainContainer}>
      {children.map((questionSet, index) => (
        <Card key={index}>
          <Card.Header>{questionSet.name}</Card.Header>
          <Card.Body
            action={{ title: 'Go To Questions', onPress: cardBodyAction }}
          >
            {{
              Private: String(questionSet.private),
              Explicit: String(questionSet.explicit),
              'Number of Questions': questionSet.questionCount,
            }}
          </Card.Body>
        </Card>
      ))}
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
