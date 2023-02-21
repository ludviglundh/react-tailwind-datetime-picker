import { FC, useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useMemo } from 'react'
import { DatetimePickerContext } from 'contexts/DatetimePickerContext'
import { useThemeContext } from 'contexts/ThemeContext'

import dayjs, { Dayjs } from 'dayjs'
import {
  getDaysInMonth,
  getFirstDaysOfMonth,
  getLastDaysOfMonth,
  getNextMonth,
  getPreviousMonth,
} from 'utils/dateUtils'
import { Calendar } from './Calendar'

export type CalendarData = {
  date: Dayjs
  days: {
    previous: number[]
    current: number[]
    next: number[]
  }
}

export interface DatetimePickerProps {
  onChange: (value: string) => void
  value: string
  disabled?: boolean
  readOnly?: boolean
  useRange?: boolean
  placeholder?: string
  i18n?: string
  startFrom?: Date | null
  startWeekOn?: string
}

const DatetimePicker: FC<DatetimePickerProps> = ({
  onChange,
  value,
  disabled = false,
  readOnly = false,
  useRange = false,
  placeholder = '',
  i18n = '',
  startFrom = null,
  startWeekOn = 'sun',
}) => {
  const theme = useThemeContext().theme

  const [leftDate, setLeftDate] = useState<Dayjs>(
    dayjs(startFrom).isValid() ? dayjs(startFrom) : dayjs()
  )
  const [rightDate, setRightDate] = useState<Dayjs>(getNextMonth(dayjs()))
  const [rightMonthSelectorOpen, setRightMonthSelectorOpen] =
    useState<boolean>(false)
  const [leftMonthSelectorOpen, setLeftMonthSelectorOpen] =
    useState<boolean>(false)

  const [rightYearSelectorOpen, setRightYearSelectorOpen] =
    useState<boolean>(false)

  const [leftYearSelectorOpen, setLeftYearSelectorOpen] =
    useState<boolean>(false)

  const [hydrated, setHydrated] = useState(false) // todo: remove

  useEffect(() => {
    // todo: remove
    setHydrated(true)
  }, [])

  const context = useMemo(
    () => ({
      onChange,
      inputValue: value,
      disabled,
      readOnly,
      useRange,
      placeholder,
      i18n,
      startFrom,
      startWeekOn,
      leftDate,
      rightDate,
      rightMonthSelectorOpen,
      leftMonthSelectorOpen,
      rightYearSelectorOpen,
      leftYearSelectorOpen,
    }),
    [
      disabled,
      i18n,
      leftDate,
      leftMonthSelectorOpen,
      leftYearSelectorOpen,
      onChange,
      placeholder,
      readOnly,
      rightDate,
      rightMonthSelectorOpen,
      rightYearSelectorOpen,
      startFrom,
      startWeekOn,
      useRange,
      value,
    ]
  )

  const data: CalendarData[] = useMemo(
    () => [
      {
        date: leftDate,
        days: {
          previous: getLastDaysOfMonth(getPreviousMonth(leftDate), 3),
          current: getDaysInMonth(leftDate),
          next: getFirstDaysOfMonth(
            getNextMonth(leftDate),
            39 -
              (getLastDaysOfMonth(getPreviousMonth(leftDate)).length +
                getDaysInMonth(leftDate).length)
          ),
        },
      },
      {
        date: rightDate,
        days: {
          previous: getLastDaysOfMonth(getPreviousMonth(rightDate), 3),
          current: getDaysInMonth(rightDate),
          next: getFirstDaysOfMonth(
            getNextMonth(leftDate),
            39 -
              (getLastDaysOfMonth(getPreviousMonth(rightDate)).length +
                getDaysInMonth(rightDate).length)
          ),
        },
      },
    ],
    [leftDate, rightDate]
  )

  const handleDayClick = useCallback(
    (day: number, range: 'first' | 'second') => {
      if (range === 'first') {
        // do this
        console.log('day', day)
      } else {
        // do that
        console.log('day', day)
      }
    },
    []
  )

  const handleMonthClick = useCallback((range: 'first' | 'second') => {
    if (range === 'first') {
      setLeftYearSelectorOpen(false)
      setLeftMonthSelectorOpen((p) => !p)
    } else {
      setRightYearSelectorOpen(false)
      setRightMonthSelectorOpen((p) => !p)
    }
  }, [])

  const handleYearClick = useCallback((range: 'first' | 'second') => {
    if (range === 'first') {
      setLeftMonthSelectorOpen(false)
      setLeftYearSelectorOpen((p) => !p)
    } else {
      setRightMonthSelectorOpen(false)
      setRightYearSelectorOpen((p) => !p)
    }
  }, [])

  const handleSelectMonth = useCallback(
    (month: number, range: 'first' | 'second') => {
      const nextDate = dayjs().month(month)

      if (range === 'first') {
        setLeftDate(nextDate)
        setLeftMonthSelectorOpen(false)
      } else {
        setRightDate(nextDate)
        setRightMonthSelectorOpen(false)
      }
    },
    []
  )

  const handleSelectYear = useCallback(
    (year: number, range: 'first' | 'second') => {
      const nextDate = dayjs().year(year)
      if (range === 'first') {
        setLeftDate(nextDate)
        setLeftYearSelectorOpen(false)
      } else {
        setRightDate(nextDate)
        setRightYearSelectorOpen(false)
      }
    },
    []
  )

  const handleNextClick = useCallback(
    (range: 'first' | 'second') => {
      if (range === 'first') {
        setLeftDate(getNextMonth(leftDate))
      } else {
        setRightDate(getNextMonth(rightDate))
      }
    },
    [leftDate, rightDate]
  )

  const handlePreviousClick = useCallback(
    (range: 'first' | 'second') => {
      if (range === 'first') {
        setLeftDate(getPreviousMonth(leftDate))
      } else {
        setRightDate(getPreviousMonth(rightDate))
      }
    },
    [rightDate, leftDate]
  )

  if (!hydrated) return null // todo: remove

  return (
    <DatetimePickerContext.Provider value={context}>
      <div className={classNames(theme.base)}>
        <div className={classNames(theme.inner)}>
          <Calendar
            data={data[0]}
            onDayClick={(day) => handleDayClick(day, 'first')}
            onSelectMonth={(month) => handleSelectMonth(month, 'first')}
            onSelectYear={(year) => handleSelectYear(year, 'first')}
            onMonthClick={() => handleMonthClick('first')}
            onYearClick={() => handleYearClick('first')}
            onPreviousClick={() => handlePreviousClick('first')}
            onNextClick={() => handleNextClick('first')}
            monthSelectorOpen={leftMonthSelectorOpen}
            yearSelectorOpen={leftYearSelectorOpen}
          />
          {useRange && (
            <Calendar
              data={data[1]}
              onDayClick={(day) => handleDayClick(day, 'second')}
              onSelectMonth={(month) => handleSelectMonth(month, 'second')}
              onSelectYear={(year) => handleSelectYear(year, 'second')}
              onMonthClick={() => handleMonthClick('second')}
              onYearClick={() => handleYearClick('second')}
              onPreviousClick={() => handlePreviousClick('second')}
              onNextClick={() => handleNextClick('second')}
              monthSelectorOpen={rightMonthSelectorOpen}
              yearSelectorOpen={rightYearSelectorOpen}
            />
          )}
        </div>
      </div>
    </DatetimePickerContext.Provider>
  )
}

export default DatetimePicker
