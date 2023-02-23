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
  inner: string
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
      }
      calendar: string
      previous: {
        button: string
        current: ThemeBool
        start: {
          selected: ThemeBool
        }
        end: {
          selected: ThemeBool
        }
        range: ThemeBool
        hover: ThemeBool
      }
      current: {
        button: string
        current: ThemeBool
        start: {
          selected: ThemeBool
        }
        end: {
          selected: ThemeBool
        }
        range: ThemeBool
        hover: ThemeBool
      }
      next: {
        button: string
        current: ThemeBool
        start: {
          selected: ThemeBool
        }
        end: {
          selected: ThemeBool
        }
        range: ThemeBool
        hover: ThemeBool
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
