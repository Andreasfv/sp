import { UrTheme } from '@ur/react-components'

interface SPTheme {
  media: {
    mobile: string
    desktop: string
  }
  colors: {
    houseRed: string
  }
}
const baseTheme = {} as UrTheme

export const theme = {
  media: {
    mobile: '@media screen and (max-width: 768px)',
    desktop: '@media screen and (min-width: 769px)',
  },
  sizes: {},
  layout: {},
  colors: {
    ...baseTheme.colors,
    houseRed: '#cc3140',
  },
} as SPTheme
