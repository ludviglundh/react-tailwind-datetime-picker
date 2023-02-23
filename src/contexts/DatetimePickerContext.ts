import dayjs, { Dayjs } from 'dayjs'
import { createContext, useContext } from 'react'
import { DateRange } from 'types'

interface DatetimePickerContext {
  inputValue: string
  placeholder: string
  i18n: string
  disabled: boolean
  readOnly: boolean
  useRange: boolean
  leftDate: Dayjs
  rightDate: Dayjs
  leftSelectorOpen: boolean
  rightSelectorOpen: boolean
  range: DateRange
  updateRange: (range: DateRange) => void
  hoveredDate: Dayjs | null
  updateHoveredDate: (date: Dayjs) => void
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
  leftSelectorOpen: false,
  rightSelectorOpen: false,
  range: {
    start: null,
    end: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateRange: (range: DateRange) => {},
  hoveredDate: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  updateHoveredDate: (date: Dayjs) => {},
})

export const useDatetimePickerContext = (): DatetimePickerContext => {
  const context = useContext(DatetimePickerContext)
  return context
}

DatetimePickerContext.displayName = 'DatetimePickerContext'
