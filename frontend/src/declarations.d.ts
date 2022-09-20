import { theme } from './theme'
import 'styled-components'
import en from './locale/translations/en'
import '@ur/react-hooks'
import { UrTheme } from '@ur/react-components'

declare module 'react' {
  export type CFC<Props = {}> = React.FC<React.PropsWithChildren<Props>>
}

declare module 'styled-components' {
  type Theme = typeof theme & UrTheme
  export interface DefaultTheme extends Theme {}
}

declare module '@ur/react-hooks/build/useTranslate/useTranslate' {
  type English = typeof en
  export interface DefaultMessages extends English {}
}

declare module '@ur/react-hooks/build/useGlobal/types' {
  export interface GlobalStore {}
}
