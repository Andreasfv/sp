import { UrThemeProvider } from '@ur/react-components'
import { UseTranslateProvider } from '@ur/react-hooks'
import en from 'locale/translations/en'
import { Root } from 'modules/main'
import React from 'react'
import { baseTheme } from 'theme'
import { Provider as UrqlProvider } from 'urql'
import { client } from 'urqlClient'

const App: React.FC = () => {
  return (
    <UrqlProvider value={client}>
      <UseTranslateProvider locale="en" messages={en}>
        <UrThemeProvider theme={baseTheme}>
          <Root />
        </UrThemeProvider>
      </UseTranslateProvider>
    </UrqlProvider>
  )
}

export default App
