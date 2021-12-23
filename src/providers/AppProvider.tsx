import React from 'react'
import { AuthProvider } from './AuthProvider'
import AppNavigation from '../navigation'
import { GQLProvider } from './GQLProvider'

export const AppProvider = () => {
  return (
    <AuthProvider>
      <GQLProvider>
        <AppNavigation />
      </GQLProvider>
    </AuthProvider>
  )
}
