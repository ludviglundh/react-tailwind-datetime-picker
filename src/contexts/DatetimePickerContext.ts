import type { DateRange, DatetimePickerContext as ContextType } from '../types'
import dayjs, { Dayjs } from 'dayjs'
import { createContext, useContext } from 'react'

export const DatetimePickerContext = createContext<ContextType>({
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

export const useDatetimePickerContext = (): ContextType => {
  const context = useContext(DatetimePickerContext)
  return context
}

DatetimePickerContext.displayName = 'DatetimePickerContext'
