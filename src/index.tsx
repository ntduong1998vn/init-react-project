import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//     brand: {
//         900: '#1a365d',
//         800: '#153e75',
//         700: '#2a69ac',
//     },
// }
// const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
