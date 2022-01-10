import * as React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home'
import MyQuestionSets from '../screens/MyQuestionSets'
import MyQuestionSet from '../screens/MyQuestionSet'
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
        <Stack.Screen
          name="MyQuestionSet"
          component={MyQuestionSet}
          options={({ route }: { route: any }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation
