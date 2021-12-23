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
  accessToken: '',
  refreshToken: '',
  isLoggedIn: false,
  validateAccessToken: (token: any) => {},
  validateRefreshToken: (token: any) => {},
  setLoggedIn: flag => {},
})

const AuthProvider = ({ children }: { children: any }) => {
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [isLoggedIn, setLoggedIn] = useState(false)
  const validateAccessToken = (token: string) =>
    setAccessToken(validateToken(token))
  const validateRefreshToken = (token: string) =>
    setRefreshToken(validateToken(token))

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn,
        refreshToken,
        setLoggedIn,
        validateAccessToken,
        validateRefreshToken,
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
