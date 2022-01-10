import React, { createContext, useState, useContext } from 'react'
import jwt from 'jwt-decode'
import moment from 'moment'

const validateToken = (token: string): string => {
  try {
    const now = moment().unix()
    const { exp }: { exp: number } = jwt(token)
    return now > exp ? '' : token
  } catch (e) {
    return ''
  }
}

const AuthContext = createContext({
  isLoggedIn: false,
  setLoggedIn: (_flag: boolean) => {},
})

const AuthProvider = ({ children }: { children: any }) => {
  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useHeader must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, AuthContext, useAuth, validateToken }
