import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  Modal,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import FaIcon from 'react-native-vector-icons/FontAwesome'

export const CreateQuestionSetForm = ({ mutation }) => {
  const styles = styleSheet()
  const [name, setName] = useState('')
  const [isPrivate, setPrivate] = useState(false)
  const [explicit, setExplicit] = useState(false)
  const createSet = async () => {
    await mutation({
      variables: { name, private: isPrivate, explicit },
    })
    setName('')
    setPrivate(false)
    setExplicit(false)
    setModalVisible(!modalVisible)
  }
  const openModal = () => {
    setName('')
    setPrivate(false)
    setExplicit(false)
    setModalVisible(!modalVisible)
  }

  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.createForm}>
          <Pressable style={styles.closeButtonContainer} onPress={openModal}>
            <FaIcon name="close" size={40} />
          </Pressable>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={text => setName(text)}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              Privacy: {isPrivate ? 'Private' : 'Public '}
            </Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor="white"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setPrivate(!isPrivate)}
              value={isPrivate}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>
              Type: {explicit ? 'NSFW' : 'Safe'}
            </Text>
            <Switch
              style={styles.switchButton}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor="white"
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setExplicit(!explicit)}
              value={explicit}
            />
          </View>
          <Pressable
            onPress={createSet}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1.0,
              },
              styles.createSetButton,
            ]}
          >
            <Text style={styles.createSetButtonText}>Create Set</Text>
          </Pressable>
        </View>
      </Modal>

      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1.0,
          },
          styles.createButton,
        ]}
        onPress={openModal}
      >
        <Icon name="plus" size={60} backgroundColor="#3b5998" />
      </Pressable>
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    mainContainer: {
      width: '40%',
      height: '40%',
      position: 'absolute',
    },
    createButton: {
      display: 'flex',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      height: 60,
      width: 60,
      position: 'absolute',
      bottom: 0,
      right: 0,
      marginRight: 15,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      zIndex: 5,
      backgroundColor: '#f1faee',
      borderRadius: 50,
    },
    createForm: {
      width: '90%',
      height: '50%',
      position: 'absolute',
      marginHorizontal: '5%',
      backgroundColor: '#4895EF',
      zIndex: 4,
      borderRadius: 10,
      marginTop: '30%',
    },
    switchContainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: '5%',
    },
    switchText: {
      fontSize: 30,
      margin: 5,
    },
    switchButton: {
      margin: 10,
    },
    inputTitle: {
      fontSize: 25,
      marginLeft: '5%',
      marginBottom: 10,
    },
    inputField: {
      width: '90%',
      height: 60,
      borderWidth: 0.5,
      borderRadius: 5,
      marginHorizontal: '5%',
      fontSize: 30,
    },
    createSetButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      marginTop: '10%',
      marginLeft: '25%',
      backgroundColor: '#3F37C9',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2.5,
      borderRadius: 5,
    },
    createSetButtonText: {
      fontSize: 30,
      color: 'white',
    },
    closeButtonContainer: {
      display: 'flex',
      width: '95%',
      alignItems: 'flex-end',
      marginTop: 10,
    },
  })
}
