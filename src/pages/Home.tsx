import {
  Box,
  FormControl,
  HStack,
  Image,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { Button, FormLabel, Radio } from '@opengovsg/design-system-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import sgidLogo from '../assets/logo.png'
import singpassLogo from '../assets/singpass.svg'
import { COLOURS } from '../theme/colours'
import { useErrorBoundary } from 'react-error-boundary'

enum IceCreamOptions {
  Vanilla = 'Vanilla',
  Chocolate = 'Chocolate',
  Strawberry = 'Strawberry',
}

export const HomePage = (): JSX.Element => {
  // Radio button state
  const [iceCream, setIceCream] = useState(IceCreamOptions.Vanilla)
  const iceCreamFieldId = useMemo(() => 'icecream', [])
  const handleIceCreamSelection = useCallback((value: IceCreamOptions) => {
    setIceCream(value)
  }, [])

  // Button loading state
  const [isLoading, setIsLoading] = useState(false)

  // Button click handler
  const navigate = useNavigate()
  const { showBoundary } = useErrorBoundary()
  const handleLoginBtnClick = useCallback(() => {
    setIsLoading(true)
    fetch(`/api/auth-url?icecream=${iceCream}`)
      .then(async (r) => await r.json())
      .then(({ url }) => {
        navigate(url)
      })
      .catch((e: unknown) => {
        setIsLoading(false)
        if (e instanceof Error) {
          showBoundary(e)
        }
        showBoundary(
          new Error(
            'Something went wrong while fetching the authorisation URL.'
          )
        )
      })
  }, [iceCream, navigate, showBoundary])

  return (
    <VStack spacing="48px">
      <HStack spacing="48px" justifyContent={'center'}>
        <Box w="30%">
          <Image src={sgidLogo} w="100%" />
        </Box>
        <Box w="40%">
          <Image src={singpassLogo} w="100%" />
        </Box>
      </HStack>
      <FormControl id={iceCreamFieldId} mb={6}>
        <FormLabel.Label>
          Favourite ice cream flavour
          <FormLabel.Description fontWeight={'400'}>
            This shows how you can keep state before and after login.
          </FormLabel.Description>
        </FormLabel.Label>
        <Radio.RadioGroup
          name={iceCreamFieldId}
          onChange={handleIceCreamSelection}
          value={iceCream}
        >
          <Stack spacing="0.5rem">
            {Object.values(IceCreamOptions).map((o, idx) => (
              <Radio key={idx} value={o}>
                {o}
              </Radio>
            ))}
          </Stack>
        </Radio.RadioGroup>
      </FormControl>
      <Button
        onClick={handleLoginBtnClick}
        bgColor={COLOURS.PRIMARY}
        color="white"
        isLoading={isLoading}
      >
        Login with Singpass app
      </Button>
    </VStack>
  )
}
