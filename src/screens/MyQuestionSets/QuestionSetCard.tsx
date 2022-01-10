import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Card } from '../../components'
import { QuestionSetType } from 'gql/queries'

export const QuestionSetCards = ({
  children,
  navigation,
  deleteAction,
}: {
  children: [QuestionSetType]
  navigation: any
  deleteAction?: any
}) => {
  const styles = styleSheet()
  const renderItem = ({
    item: { id, name, private: isPrivate, explicit, questionCount },
    index,
  }) => {
    return (
      <Card key={index}>
        <Card.Header deleteAction={() => deleteAction({ variables: { id } })}>
          {name}
        </Card.Header>
        <Card.Body
          action={{
            title: 'Go To Questions',
            onPress: () => navigation.navigate('MyQuestionSet', { id, name }),
          }}
        >
          {{
            Privacy: isPrivate ? 'Private' : 'Public',
            Type: explicit ? 'NSFW' : 'For all ages',
            '# of Questions': questionCount,
          }}
        </Card.Body>
      </Card>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList data={children} renderItem={renderItem} />
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
