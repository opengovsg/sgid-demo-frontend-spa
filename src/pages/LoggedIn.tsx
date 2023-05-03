import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const LoggedInPage = (): JSX.Element => {
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return <Spinner />
  }
  if (user === null) {
    return <Navigate to="/" />
  }
  return (
    <VStack>
      <Heading>Logged in successfully!</Heading>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </VStack>
  )
}
