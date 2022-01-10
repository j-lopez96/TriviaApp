import React, { useReducer } from 'react'
import { View } from 'react-native'
import { Form } from '../../components'

type QuestionState = {
  id: string
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

type Action =
  | { type: 'updateField'; data: QuestionState; key: string; value: any }
  | { type: 'resetFields'; data: QuestionState }

function reducer(state: QuestionState, action: Action): QuestionState {
  switch (action.type) {
    case 'updateField':
      state[action.key] = action.value
      return { ...state }
  }
}

export const QuestionEditForm = ({
  id,
  mutation,
  data,
  isVisible,
  visibilityControl,
}) => {
  const [state, dispatch] = useReducer(reducer, data)
  state.id = id
  const updateQuestion = () => {
    mutation({ variables: { ...state } })
  }
  return (
    <View>
      <Form
        isVisible={isVisible}
        mutation={updateQuestion}
        mutationType="edit"
        visibilityControl={visibilityControl}
      >
        <Form.Title>Edit Question</Form.Title>
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
