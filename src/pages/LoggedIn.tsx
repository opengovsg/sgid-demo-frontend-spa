import {
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from '@chakra-ui/react'
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
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Td>sgID</Td>
              <Td>{user.sub}</Td>
            </Tr>
            <Tr>
              <Td>Name</Td>
              <Td>{user.data['myinfo.name']}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}
