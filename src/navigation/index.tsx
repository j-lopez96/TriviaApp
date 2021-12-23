import * as React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'
import MyQuestionSets from '../screens/QuestionSets'
import { LightTheme, DarkTheme } from '../theme/theme'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
  const scheme = useColorScheme()
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="MyQuestionSets"
          component={MyQuestionSets}
          options={{ headerBackVisible: false, title: 'My Question Sets' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
