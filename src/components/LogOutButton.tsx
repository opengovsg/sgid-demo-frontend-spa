import { Button } from '@opengovsg/design-system-react'
import { useCallback, useState } from 'react'
import { COLOURS } from '../theme/colours'

export const LogOutButton = ({
  buttonText = 'Log out and try again',
}: {
  buttonText?: string
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const handleLogout = useCallback(() => {
    setIsLoading(true)
    void fetch('/api/logout')
  }, [])
  return (
    <Button
      onClick={handleLogout}
      bgColor={COLOURS.PRIMARY}
      color="white"
      isLoading={isLoading}
    >
      {buttonText}
    </Button>
  )
}
