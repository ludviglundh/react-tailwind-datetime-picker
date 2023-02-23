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
import { CalendarData, DateRange, DatetimePickerProps } from 'types'

const DatetimePicker: FC<DatetimePickerProps> = ({
  onChange,
  value,
  disabled = false,
  config: {
    i18n = '',
    useDouble = true,
    startFrom = null,
    maxDate = null,
    minDate = null,
  } = {},
}) => {
  const theme = useThemeContext().theme

  const [leftDate, setLeftDate] = useState<Dayjs>(
    dayjs(startFrom).isValid() ? dayjs(startFrom) : dayjs()
  )
  const [rightDate, setRightDate] = useState<Dayjs>(getNextMonth(leftDate))

  const [leftSelectorOpen, setLeftSelectorOpen] = useState<boolean>(false)
  const [rightSelectorOpen, setRightSelectorOpen] = useState<boolean>(false)

  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null)

  const [hydrated, setHydrated] = useState(false) // todo: remove

  useEffect(() => {
    // todo: remove
    setHydrated(true)
  }, [])

  const context = useMemo(
    () => ({
      i18n,
      useDouble,
      startFrom,
      maxDate,
      minDate,
      onChange,
      inputValue: value,
      disabled,
      leftDate,
      rightDate,
      leftSelectorOpen,
      rightSelectorOpen,
      range,
      // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
      updateRange: (range: DateRange) => setRange(range),
      hoveredDate,
      updateHoveredDate: (date: Dayjs | null) => setHoveredDate(date),
    }),
    [
      disabled,
      hoveredDate,
      i18n,
      leftDate,
      leftSelectorOpen,
      maxDate,
      minDate,
      onChange,
      range,
      rightDate,
      rightSelectorOpen,
      startFrom,
      useDouble,
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

  const handleSelectorClick = useCallback((range: 'first' | 'second') => {
    if (range === 'first') {
      setLeftSelectorOpen((p) => !p)
    } else {
      setRightSelectorOpen((p) => !p)
    }
  }, [])

  const handleSelectMonth = useCallback(
    (month: number, range: 'first' | 'second') => {
      if (range === 'first') {
        const nextDate = dayjs(leftDate).month(month)
        setLeftDate(nextDate)
      } else {
        const nextDate = dayjs(rightDate).month(month)

        setLeftDate(getPreviousMonth(nextDate))
      }
    },
    [leftDate, rightDate]
  )

  const handleSelectYear = useCallback(
    (year: number, range: 'first' | 'second') => {
      if (range === 'first') {
        const nextDate = dayjs(leftDate).year(year)
        setLeftDate(nextDate)
      } else {
        const nextDate = dayjs(rightDate).year(year)
        setRightDate(nextDate)
      }
    },
    [leftDate, rightDate]
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

  const handleLeftTimeChange = useCallback(
    (time: string, range: 'first' | 'second') => {
      const [hours, minutes, seconds] = time.split(':')

      if (range === 'first') {
        const nextDate = leftDate
          .hour(Number(hours))
          .minute(Number(minutes))
          .second(Number(seconds))
        setLeftDate(nextDate)
      } else {
        const nextDate = rightDate
          .hour(Number(hours))
          .minute(Number(minutes))
          .second(Number(seconds))
        setRightDate(nextDate)
      }
    },
    [leftDate, rightDate]
  )

  if (!hydrated) return null // todo: remove

  return (
    <DatetimePickerContext.Provider value={context}>
      <div
        id="base"
        className={classNames(
          theme.base,
          theme.disabled[disabled ? 'true' : 'false'],
          theme.useDouble[useDouble ? 'true' : 'false']
        )}
      >
        {disabled && <div className={theme.inner.disabled} />}
        <div className={classNames(theme.inner.base)}>
          <Calendar
            data={data[0]}
            onSelectMonth={(month) => handleSelectMonth(month, 'first')}
            onSelectYear={(year) => handleSelectYear(year, 'first')}
            onSelectorClick={() => handleSelectorClick('first')}
            onPreviousClick={() => handlePreviousClick('first')}
            onNextClick={() => handleNextClick('first')}
            selectorOpen={leftSelectorOpen}
            onTimeChange={(time: string) => handleLeftTimeChange(time, 'first')}
          />

          {useDouble && (
            <Calendar
              data={data[1]}
              onSelectMonth={(month) => handleSelectMonth(month, 'second')}
              onSelectYear={(year) => handleSelectYear(year, 'second')}
              onSelectorClick={() => handleSelectorClick('second')}
              onPreviousClick={() => handlePreviousClick('second')}
              onNextClick={() => handleNextClick('second')}
              selectorOpen={rightSelectorOpen}
              onTimeChange={(time: string) =>
                handleLeftTimeChange(time, 'second')
              }
            />
          )}
        </div>
      </div>
    </DatetimePickerContext.Provider>
  )
}

export default DatetimePicker
