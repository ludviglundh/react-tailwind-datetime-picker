import dayjs, { Dayjs } from 'dayjs'
import { createContext, useContext } from 'react'
import { DateRange, DisabledDate } from '../types'

interface DatetimePickerContext {
  maxDate?: Dayjs | null
  minDate?: Dayjs | null
  disabledDates?: DisabledDate[] | null
  inputValue: DateRange
  i18n: string
  disabled: boolean
  useDouble: boolean
  useTimepicker: boolean
  useSingleValue: boolean
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
  disabledDates: null,
  inputValue: { start: null, end: null },
  i18n: '',
  disabled: false,
  useDouble: false,
  useTimepicker: false,
  useSingleValue: false,
  leftDate: dayjs(),
  rightDate: dayjs(),
  leftSelectorOpen: false,
  rightSelectorOpen: false,
  range: {
    start: null,
    end: null,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updateRange: (_range: DateRange) => {},
  hoveredDate: null,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  updateHoveredDate: (_date: Dayjs | null) => {},
})

export const useDatetimePickerContext = (): DatetimePickerContext => {
  const context = useContext(DatetimePickerContext)
  return context
}

DatetimePickerContext.displayName = 'DatetimePickerContext'
