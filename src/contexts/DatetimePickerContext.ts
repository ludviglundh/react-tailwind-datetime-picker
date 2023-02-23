import dayjs, { Dayjs } from 'dayjs'
import { createContext, useContext } from 'react'
import { DateRange } from 'types'

interface DatetimePickerContext {
  maxDate?: Date | null
  minDate?: Date | null
  inputValue: string
  i18n: string
  disabled: boolean
  useDouble: boolean
  useTimepicker: boolean
  leftDate: Dayjs
  rightDate: Dayjs
  leftSelectorOpen: boolean
  rightSelectorOpen: boolean
  range: DateRange
  updateRange: (range: DateRange) => void
  hoveredDate: Dayjs | null
  updateHoveredDate: (date: Dayjs | null) => void
}

export const DatetimePickerContext = createContext<DatetimePickerContext>({
  maxDate: null,
  minDate: null,
  inputValue: '',
  i18n: '',
  disabled: false,
  useDouble: false,
  useTimepicker: false,
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
  updateHoveredDate: (date: Dayjs | null) => {},
})

export const useDatetimePickerContext = (): DatetimePickerContext => {
  const context = useContext(DatetimePickerContext)
  return context
}

DatetimePickerContext.displayName = 'DatetimePickerContext'
