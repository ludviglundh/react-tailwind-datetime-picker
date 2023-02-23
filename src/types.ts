import { Dayjs } from 'dayjs'

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

export interface DatetimePickerTheme {
  base: string
  disabled: ThemeBool
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
      }
      current: {
        base: string
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
