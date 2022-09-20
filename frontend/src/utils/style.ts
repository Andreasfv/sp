import { DefaultTheme } from 'styled-components'
import { theme } from 'theme'

/**
 * This function returns props.theme.colors[props.color] if it exists, otherwise
 * props.color.
 *
 * @param {Object} props The props passed to a component.
 */
export function overloadColorProp<
  T extends { color?: string; theme: DefaultTheme }
>(props: T) {
  if (!props.color) return props.color

  return (
    (props.theme.colors[
      props.color as keyof typeof props.theme.colors
    ] as unknown as string) ?? props.color
  )
}
export function overloadColor(color: string) {
  return overloadColorProp({ theme, color })
}
