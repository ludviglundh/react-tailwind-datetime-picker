import { createContext, useContext } from 'react'
import defaultTheme from 'theme/default'
import { DatetimePickerTheme } from 'types'

export interface ThemeContextProps {
  theme: DatetimePickerTheme
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
})

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  return context
}

ThemeContext.displayName = 'DatetimePickerThemeContext'
