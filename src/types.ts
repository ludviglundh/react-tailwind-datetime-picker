import type { Dayjs } from 'dayjs'
import type { ComponentProps } from 'react'

// Generics
export type ThemeBoolReturnType = 'true' | 'false'
export interface ThemeBool {
  true: string
  false: string
}
export interface DateRange {
  start: Dayjs | null
  end: Dayjs | null
}
export type Time = {
  hour: string
  minute: string
  second: string
}
export type CalendarData = {
  date: Dayjs
  days: {
    previous: number[]
    current: number[]
    next: number[]
  }
}
export type DisabledDate = Dayjs | null

// Theme
export interface DatetimePickerTheme {
  base: string
  disabled: ThemeBool
  useDouble: {
    true: string
    false: string
  }
  inner: {
    base: string
    disabled: string
  }
  monthSelector: {
    base: string
    selector: {
      base: string
      previous: string
      month: string
      year: string
      next: string
    }
  }
  calendar: {
    base: string
    inner: {
      base: string
      week: {
        base: string
        item: string
        current: ThemeBool
      }
      calendar: {
        base: string
      }
      previous: {
        base: string
        disabled: ThemeBool
      }
      current: {
        base: string
        disabled: ThemeBool
        current: ThemeBool
        start: {
          selected: ThemeBool
          hovered: ThemeBool
        }
        end: {
          selected: ThemeBool
          hovered: ThemeBool
        }
        hover: ThemeBool
      }
      next: {
        base: string
        disabled: ThemeBool
      }
      selector: {
        base: string
        separator: string
        current: ThemeBool
        items: {
          base: string
          item: string
        }
      }
    }
  }
}

export interface DatetimePickerConfig {
  maxDate?: Date | Dayjs | null
  minDate?: Date | Dayjs | null
  disabledDates?: Date[] | Dayjs[] | null
  useDouble?: boolean
  useTimepicker?: boolean
  useSingleValue?: boolean
  startFrom?: Date | Dayjs | null
  i18n?: string
}

// Components
export interface DatetimePickerProps {
  onChange: (range: DateRange) => void
  value: DateRange
  disabled?: boolean
  config?: DatetimePickerConfig
  maxDate?: Date | null
  minDate?: Date | null
}

export type ArrowProps = ComponentProps<'div'>

export interface IconProps {
  className?: string
}

export interface SelectorProps {
  onNextClick: () => void
  onPreviousClick: () => void
  onSelectorClick: () => void
  selectorOpen: boolean
  date: CalendarData['date']
}

export interface CalendarProps {
  onNextClick: () => void
  onPreviousClick: () => void
  onSelectorClick: () => void
  onSelectMonth: (month: number) => void
  onSelectYear: (year: number) => void
  data: CalendarData
  selectorOpen: boolean
}

// Contexts
export interface ThemeContextProps {
  theme: DatetimePickerTheme
}
