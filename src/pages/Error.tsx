import {
  Box,
  HStack,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@opengovsg/design-system-react'
import { useMemo } from 'react'
import { COLOURS } from '../theme/colours'

export const ErrorPage = ({ error }: { error?: unknown }): JSX.Element => {
  const errorMessage = useMemo(() => {
    if (error instanceof Error) {
      return error.message
    }
    return null
  }, [error])
  return (
    <VStack alignItems={'start'} spacing="1rem">
      <Heading>Something went wrong.</Heading>
      {errorMessage !== null && <Text>{errorMessage}</Text>}
      <Text>Make sure that:</Text>
      <Box ml="1rem">
        <UnorderedList spacing={'0.5rem'}>
          <ListItem>
            You are running the relying party server which must accompany this
            frontend.
          </ListItem>
          <ListItem>
            You have specified valid client credentials for sgID in the
            environment variables for the relying party server.
          </ListItem>
        </UnorderedList>
      </Box>
      <HStack justifyContent={'center'} w="100%">
        <Link href="/" color={COLOURS.PRIMARY}>
          Back to home
        </Link>
      </HStack>
    </VStack>
  )
}
