import dayjs, { Dayjs } from 'dayjs'
import { createContext, useContext } from 'react'

interface DatetimePickerContext {
  inputValue: string
  placeholder: string
  i18n: string
  disabled: boolean
  readOnly: boolean
  useRange: boolean
  leftDate: Dayjs
  rightDate: Dayjs
  rightMonthSelectorOpen: boolean
  leftMonthSelectorOpen: boolean
  rightYearSelectorOpen: boolean
  leftYearSelectorOpen: boolean
}

export const DatetimePickerContext = createContext<DatetimePickerContext>({
  inputValue: '',
  placeholder: '',
  i18n: '',
  disabled: false,
  readOnly: false,
  useRange: false,
  leftDate: dayjs(),
  rightDate: dayjs(),
  rightMonthSelectorOpen: false,
  leftMonthSelectorOpen: false,
  rightYearSelectorOpen: false,
  leftYearSelectorOpen: false,
})

export const useDatetimePickerContext = (): DatetimePickerContext => {
  const context = useContext(DatetimePickerContext)
  return context
}
