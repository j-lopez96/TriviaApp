import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import EncryptedStorage from 'react-native-encrypted-storage'
import { validateToken } from './AuthProvider'

const urlLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext(async (_: any) => {
  const headers: any = {}
  const token = (await EncryptedStorage.getItem('access_token')) || ''
  const validatedToken = validateToken(token)
  if (validatedToken !== '') {
    headers.authorization = `Bearer ${validatedToken}`
  }

  return {
    headers,
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(urlLink),
})

export const GQLProvider = ({ children }: { children: any }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
