import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native'
import { TextInput, Switch, RadioButton } from 'react-native-paper'

export const Form = ({
  children,
  isVisible,
  visibilityControl,
  mutation,
  mutationType = 'create',
}: {
  children?: any
  isVisible: boolean
  visibilityControl?: any
  mutation: any
  mutationType?: 'edit' | 'create'
}) => {
  const styles = styleSheet()
  const mutationPressed = () => {
    visibilityControl()
    mutation()
  }
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.mainContainer}>
        {children}
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            styles.closeButtonContainer,
          ]}
          onPress={visibilityControl}
        >
          <Text style={styles.closeButton}>CANCEL</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            styles.createButtonContainer,
          ]}
          onPress={mutationPressed}
        >
          <Text style={styles.closeButton}>
            {mutationType === 'edit' ? 'UPDATE' : 'CREATE'}
          </Text>
        </Pressable>
      </View>
    </Modal>
  )
}

const FormTitle = ({ children }) => {
  const styles = styleSheet()
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {children.length > 15 ? `${children.substring(0, 15)}...` : children}
      </Text>
    </View>
  )
}
const FormBody = ({ children }) => {
  const styles = styleSheet()
  return (
    <View style={styles.scrollView}>
      <ScrollView>{children}</ScrollView>
    </View>
  )
}

const FormBodyTextInput = ({
  title,
  value,
  onChange,
}: {
  title: string
  value: any
  onChange: React.Dispatch<any>
}) => {
  const styles = styleSheet()
  return (
    <View style={styles.inputFieldContainer}>
      <TextInput
        style={styles.inputField}
        mode="outlined"
        onChangeText={onChange}
        value={value}
        label={title}
        selectionColor="black"
        outlineColor="black"
        activeOutlineColor="black"
      />
    </View>
  )
}

const FormBodyBooleanInput = ({
  title,
  value,
  onChange,
}: {
  title: string
  value: any
  onChange: React.Dispatch<any>
}) => {
  const styles = styleSheet()
  return (
    <View style={styles.booleanFieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Switch
        trackColor={{ false: 'black', true: '#81b0ff' }}
        thumbColor="white"
        ios_backgroundColor="#3e3e3e"
        onValueChange={onChange}
        value={value}
      />
    </View>
  )
}

const FormBodySelectionForm = ({
  children,
  value,
  onChange,
  title,
}: {
  children: any
  value: any
  onChange: React.Dispatch<any>
  title: string
}) => {
  const styles = styleSheet()
  return (
    <View style={styles.selectionContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <RadioButton.Group
        onValueChange={(val: any) => onChange(val)}
        value={value}
      >
        {children}
      </RadioButton.Group>
    </View>
  )
}

const FormBodySelectionFormInput = ({
  title,
  value,
}: {
  title: string
  value: any
}) => {
  return <RadioButton.Item label={title} value={value} />
}

Form.Title = FormTitle
Form.Body = FormBody
Form.TextInput = FormBodyTextInput
Form.BooleanInput = FormBodyBooleanInput
Form.SelectionForm = FormBodySelectionForm
Form.SelectionFormInput = FormBodySelectionFormInput

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      width: '90%',
      height: '80%',
      marginTop: '10%',
      marginHorizontal: '5%',
      backgroundColor: '#4895EF',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    closeButtonContainer: {
      width: 90,
      height: 40,
      bottom: 0,
      left: 0,
      marginLeft: '5%',
      marginBottom: '5%',
      backgroundColor: '#D3D3D3',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    createButtonContainer: {
      width: 90,
      height: 40,
      bottom: 0,
      right: 0,
      marginRight: '5%',
      marginBottom: '5%',
      backgroundColor: 'white',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    closeButton: {
      fontWeight: 'bold',
      fontSize: 20,
    },
    titleContainer: {
      width: '90%',
      backgroundColor: 'white',
      marginTop: '5%',
      marginHorizontal: '5%',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      marginLeft: '5%',
    },
    scrollView: {
      height: '70%',
      marginHorizontal: '5%',
      marginTop: '5%',
    },
    text: {
      fontSize: 42,
    },
    inputFieldContainer: {
      display: 'flex',
      flex: 1,
      marginBottom: '5%',
    },
    inputField: {
      backgroundColor: '#4895EF',
    },
    inputFieldTitle: {
      position: 'absolute',
      marginTop: 10,
      zIndex: 6,
      marginLeft: 5,
      height: 20,
      fontSize: 15,
      color: 'gray',
    },
    booleanFieldContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    fieldTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    selectionContainer: {
      marginBottom: 10,
    },
    bodyButton: {
      width: 90,
      height: 40,
      bottom: 0,
      left: 0,
      marginLeft: '5%',
      marginBottom: '5%',
      backgroundColor: 'black',
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      zIndex: 6,
    },
  })
}
