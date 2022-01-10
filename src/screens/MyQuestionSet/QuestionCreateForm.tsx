import React, { useState, useReducer } from 'react'
import { Pressable, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Form } from '../../components'

type QuestionState = {
  questionSetId: string
  questionMessage: string
  answerA: string
  answerB: string
  answerC: string
  answerD: string
  correctAnswer: CorrectAnswerEnum
  writeInAnswer: string
  multipleChoice: boolean
}

// eslint-disable-next-line no-shadow
enum CorrectAnswerEnum {
  answerA = 'answerA',
  answerB = 'answerB',
  answerC = 'answerC',
  answerD = 'answerD',
}
const initialState: QuestionState = {
  questionSetId: '',
  questionMessage: '',
  answerA: '',
  answerB: '',
  answerC: '',
  answerD: '',
  correctAnswer: CorrectAnswerEnum.answerA,
  writeInAnswer: '',
  multipleChoice: true,
}

type Action =
  | { type: 'updateField'; data: QuestionState; key: string; value: any }
  | { type: 'resetFields'; data: QuestionState }

function reducer(state: QuestionState, action: Action): QuestionState {
  switch (action.type) {
    case 'updateField':
      state[action.key] = action.value
      return { ...state }
    case 'resetFields':
      return { ...initialState }
  }
}

export const QuestionCreateForm = ({ id, mutation }) => {
  const styles = styleSheet()
  const [state, dispatch] = useReducer(reducer, initialState)
  state.questionSetId = id
  const [isVisible, setVisible] = useState(false)
  const openForm = () => {
    dispatch({
      type: 'resetFields',
      data: state,
    })
    setVisible(!isVisible)
  }
  const createQuestion = () => {
    mutation({ variables: { ...state } })
  }
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1.0,
          },
          styles.createButton,
        ]}
        onPress={openForm}
      >
        <Icon name="plus" size={60} backgroundColor="#3b5998" />
      </Pressable>
      <Form
        isVisible={isVisible}
        visibilityControl={openForm}
        mutation={createQuestion}
      >
        <Form.Title>Create Question</Form.Title>
        <Form.Body>
          <Form.TextInput
            title="Question Message"
            value={state.questionMessage}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'questionMessage',
                value: e,
                data: state,
              })
            }
          />
          <Form.TextInput
            title="Answer A"
            value={state.answerA}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'answerA',
                value: e,
                data: state,
              })
            }
          />
          <Form.TextInput
            title="Answer B"
            value={state.answerB}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'answerB',
                value: e,
                data: state,
              })
            }
          />
          <Form.TextInput
            title="Answer C"
            value={state.answerC}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'answerC',
                value: e,
                data: state,
              })
            }
          />
          <Form.TextInput
            title="Answer D"
            value={state.answerD}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'answerD',
                value: e,
                data: state,
              })
            }
          />
          <Form.TextInput
            title="Write In"
            value={state.writeInAnswer}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'writeInAnswer',
                value: e,
                data: state,
              })
            }
          />
          <Form.SelectionForm
            title="Correct Answer"
            value={state.correctAnswer}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'correctAnswer',
                value: e,
                data: state,
              })
            }
          >
            <Form.SelectionFormInput title="Answer A" value="answerA" />
            <Form.SelectionFormInput title="Answer B" value="answerB" />
            <Form.SelectionFormInput title="Answer C" value="answerC" />
            <Form.SelectionFormInput title="Answer D" value="answerD" />
          </Form.SelectionForm>
          <Form.BooleanInput
            title="Multiple Choice"
            value={state.multipleChoice}
            onChange={e =>
              dispatch({
                type: 'updateField',
                key: 'multipleChoice',
                value: e,
                data: state,
              })
            }
          />
        </Form.Body>
      </Form>
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      width: 60,
      height: 60,
      backgroundColor: 'red',
      bottom: 0,
      right: 0,
      position: 'absolute',
      marginRight: '10%',
      marginBottom: '10%',
    },
    createButton: {
      position: 'absolute',
      display: 'flex',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      height: 30,
      width: 30,
      bottom: 0,
      right: 0,
      marginRight: '10%',
      marginBottom: '10%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      zIndex: 5,
      backgroundColor: '#f1faee',
      borderRadius: 50,
    },
  })
}
