import 'inter-ui/inter.css'

import { ThemeProvider } from '@opengovsg/design-system-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { PageLayout } from './pages/PageLayout'
import { theme } from './theme'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
