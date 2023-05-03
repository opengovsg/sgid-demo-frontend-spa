import { Heading, Spinner, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type UserInfo = Record<string, string>

export const LoggedInPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<UserInfo | null>(null)

  useEffect(() => {
    fetch('/api/userinfo')
      .then(async (r) => await r.json())
      .then((res) => {
        setData(res)
        setIsLoading(false)
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e instanceof Error) {
            throw e
          }
          throw new Error('Something went wrong while fetching the user info.')
        }
      })
  }, [])

  if (isLoading || data == null) {
    return <Spinner />
  }

  return (
    <VStack>
      <Heading>Logged in successfully!</Heading>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </VStack>
  )
}
