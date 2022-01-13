import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MyQuestionSets from '../../screens/MyQuestionSets'

const Drawer = createDrawerNavigator()

export function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="My Question Sets" component={MyQuestionSets} />
    </Drawer.Navigator>
  )
}
