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
      }
      current: {
        button: string
      }
      next: {
        button: string
      }
    }
  }
}
