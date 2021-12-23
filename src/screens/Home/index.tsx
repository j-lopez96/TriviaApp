import React, { useEffect, useState } from 'react'
import { Button, View, TextInput, Text, StyleSheet } from 'react-native'
import { useMutation } from '@apollo/client'
import { LOGIN_EMAIL } from '../../gql/mutations'
import EncryptedStorage from 'react-native-encrypted-storage'
import { useAuth, validateToken } from '../../providers/AuthProvider'

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { setLoggedIn, isLoggedIn } = useAuth()
  const [email, setEmail] = useState('jesus@google.com')
  const [password, setPassword] = useState('Password1')
  const styles = styleSheet()
  const [login, { data, loading, error }] = useMutation(LOGIN_EMAIL)

  useEffect(() => {
    if (isLoggedIn) {
      navigation.push('MyQuestionSets')
    }
    const checkToken = async () => {
      const token = (await EncryptedStorage.getItem('access_token')) || ''
      const validatedToken = validateToken(token)
      if (validatedToken !== '') {
        setLoggedIn(true)
      }
    }
    checkToken()
  }, [isLoggedIn, navigation, setLoggedIn])

  const updateEmail = (text: string) => setEmail(text)
  const updatePassword = (text: string): any => setPassword(text)
  const loginUser = async () => {
    await login({ variables: { email, password } })
    if (data) {
      await EncryptedStorage.setItem(
        'access_token',
        data.loginEmail.accessToken
      )
      setLoggedIn(true)
    }
  }
  return (
    <View>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Trivia App</Text>
        <Text style={styles.subTitleText}>By: Jesus Lopez</Text>
      </View>
      {isLoggedIn ? null : (
        <View style={styles.textInputView}>
          <TextInput
            placeholder="Email"
            value={email}
            style={styles.textInput}
            onChangeText={updateEmail}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            style={styles.textInput}
            onChangeText={updatePassword}
            secureTextEntry={true}
          />
          <Button title="Login" onPress={loginUser} disabled={loading} />
        </View>
      )}
    </View>
  )
}

const styleSheet = () => {
  return StyleSheet.create({
    textInput: {
      width: '100%',
      height: 30,
      borderBottomWidth: 1,
      borderRadius: 5,
      textAlignVertical: 'bottom',
      textAlign: 'left',
      marginBottom: '10%',
      fontSize: 30,
    },
    titleText: {
      fontSize: 60,
    },
    subTitleText: {
      fontSize: 15,
    },
    titleView: {
      alignItems: 'center',
      backgroundColor: 'gray',
      height: '40%',
      justifyContent: 'center',
      margin: '5%',
      textAlign: 'center',
      width: '90%',
      borderRadius: 5,
    },
    textInputView: {
      display: 'flex',
      flex: 1,
      margin: '5%',
      width: '90%',
    },
  })
}

export default HomeScreen
