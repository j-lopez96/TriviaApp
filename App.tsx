import React from 'react'
import { AppProvider } from './src/providers/AppProvider'
import { AppRegistry } from 'react-native'

const App = () => {
  return <AppProvider />
}

AppRegistry.registerComponent('MyApplication', () => App)
export default App
