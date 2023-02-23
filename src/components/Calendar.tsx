import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import classNames from 'classnames'
import { useDatetimePickerContext } from 'contexts/DatetimePickerContext'
import { useThemeContext } from 'contexts/ThemeContext'
import { FC, useCallback, useState } from 'react'
import {
  generateArrayOfYears,
  getFormattedMonths,
  getFormattedWeekDays,
  getNextMonth,
  getPreviousMonth,
} from 'utils/dateUtils'

import { Selector } from './Selector'
import { loadI18n } from 'utils/i18nUtils'
import { CalendarProps, ThemeBoolReturnType } from 'types'

dayjs.extend(isBetween)

export const Calendar: FC<CalendarProps> = ({
  onNextClick,
  onSelectorClick,
  onPreviousClick,
  onSelectMonth,
  onSelectYear,
  onTimeChange,
  selectorOpen,
  data,
}) => {
  const { i18n, range, updateRange, hoveredDate, updateHoveredDate } =
    useDatetimePickerContext()
  loadI18n(i18n)

  const [yearInterval, setYearInterval] = useState(dayjs().year())

  const handleNextYearsClick = useCallback(() => {
    setYearInterval((p) => p + 13)
  }, [])

  const handlePreviousYearsClick = useCallback(() => {
    setYearInterval((p) => p - 13)
  }, [])

  const theme = useThemeContext().theme.calendar

  const handleDayClick = useCallback(
    (day: number, type: 'previous' | 'current' | 'next') => {
      const dates = {
        previous: getPreviousMonth(data.date),
        current: data.date,
        next: getNextMonth(data.date),
      }
      const nextDate = dates[type].date(day)

      // will start a new range on the first click after the previous range is selected
      if (range.start && range.end) {
        updateRange({ start: nextDate, end: null })
      }
      if (range.start && !range.end) {
        updateRange({ start: range.start, end: nextDate })
      }
      if (!range.start && range.end) {
        updateRange({ start: nextDate, end: range.end })
      }
      // this will allow the user to begin selecting range
      if (!range.start && !range.end) {
        updateRange({ start: nextDate, end: null })
      }

      updateHoveredDate(null)
    },
    [data.date, range.end, range.start, updateHoveredDate, updateRange]
  )

  const resolveHoverDay = useCallback(
    (day: number, type: 'next' | 'current' | 'previous') => {
      const selectedData = {
        previous: getPreviousMonth(data.date.date(day)),
        current: data.date.date(day),
        next: getNextMonth(data.date.date(day)),
      }

      const nextDate = selectedData[type]

      if (range.start && !range.end) {
        if (dayjs(nextDate).isBefore(range.start)) {
          updateRange({ start: null, end: range.start })
        }
        updateHoveredDate(nextDate)
      }

      if (!range.start && range.end) {
        if (dayjs(nextDate).isAfter(range.end)) {
          updateRange({ start: range.end, end: null })
        }
        updateHoveredDate(nextDate)
      }
    },
    [data.date, range.end, range.start, updateHoveredDate, updateRange]
  )

  // Returns ThemeBool
  const resolveHoverClass = useCallback(
    (day: number): ThemeBoolReturnType => {
      const selectedDate = data.date.date(day)

      if (range.start && range.end) {
        if (
          dayjs(selectedDate).isBetween(range.start, range.end, 'date', '()')
        ) {
          return 'true'
        }
      }

      if (
        range.start &&
        dayjs(selectedDate).isBetween(range.start, hoveredDate, 'date', '()')
      ) {
        return 'true'
      }

      if (
        range.end &&
        dayjs(selectedDate).isBetween(hoveredDate, range.end, 'day', '()')
      ) {
        return 'true'
      }

      return 'false'
    },
    [data.date, hoveredDate, range.end, range.start]
  )

  const resolveSelectedStartDayClass = useCallback(
    (day: number) => {
      const sameYear = data.date.year() === range.start?.year()
      const sameMonth = data.date.month() === range.start?.month()
      const sameDay = range.start?.date() === day

      return sameYear && sameMonth && sameDay
    },
    [data.date, range.start]
  )

  const resolveSelectedEndDayClass = useCallback(
    (day: number) => {
      const sameYear = data.date.year() === range.end?.year()
      const sameMonth = data.date.month() === range.end?.month()
      const sameDay = range.end?.date() === day

      return sameYear && sameMonth && sameDay
    },
    [data.date, range.end]
  )

  const resolveCurrentDateClass = useCallback(
    (day: number): ThemeBoolReturnType => {
      return dayjs().date(day).isSame(data.date, 'date') ? 'true' : 'false'
    },
    [data.date]
  )

  const resolveCurrentWeekdayClass = useCallback(
    (weekDay: number): ThemeBoolReturnType => {
      return dayjs().day(weekDay).isSame(data.date, 'day') ? 'true' : 'false'
    },
    [data.date]
  )

  const resolveHoveredEndDayClass = useCallback(
    (day: number): ThemeBoolReturnType => {
      return range.start && hoveredDate?.isSame(data.date.date(day))
        ? 'true'
        : 'false'
    },
    [data.date, hoveredDate, range.start]
  )

  const resolveHoveredStartDayClass = useCallback(
    (day: number): ThemeBoolReturnType => {
      return !range.start && hoveredDate?.isSame(data.date.date(day))
        ? 'true'
        : 'false'
    },
    [data.date, hoveredDate, range.start]
  )

  return (
    <div className={classNames(theme.base)}>
      <div className={classNames(theme.inner.base)}>
        <Selector
          date={data.date}
          onNextClick={selectorOpen ? handleNextYearsClick : onNextClick}
          onPreviousClick={
            selectorOpen ? handlePreviousYearsClick : onPreviousClick
          }
          onSelectorClick={onSelectorClick}
          selectorOpen={selectorOpen}
        />

        {!selectorOpen && (
          <>
            <div className={classNames(theme.inner.week.base)}>
              {getFormattedWeekDays(i18n).map(
                (weekDay: string, index: number) => (
                  <div
                    className={classNames(
                      theme.inner.week.item,
                      theme.inner.week.current[
                        resolveCurrentWeekdayClass(index)
                      ]
                    )}
                    key={`${weekDay}-${index}`}
                  >
                    <span>{weekDay.toUpperCase()}</span>
                  </div>
                )
              )}
            </div>
            <div className={classNames(theme.inner.calendar.base)}>
              {data.days.previous.map((day: number, index: number) => {
                return (
                  <button
                    className={classNames(theme.inner.previous.base)}
                    key={`${day}-${index}`}
                    onClick={() => handleDayClick(day, 'previous')}
                    onMouseOver={() => resolveHoverDay(day, 'previous')}
                  >
                    <span>{day}</span>
                  </button>
                )
              })}
              {data.days.current.map((day: number, index: number) => {
                return (
                  <button
                    className={classNames(
                      theme.inner.current.base,
                      theme.inner.current.hover[resolveHoverClass(day)],
                      theme.inner.current.current[resolveCurrentDateClass(day)],
                      theme.inner.current.start.selected[
                        resolveSelectedStartDayClass(day) ? 'true' : 'false'
                      ],
                      theme.inner.current.end.selected[
                        resolveSelectedEndDayClass(day) ? 'true' : 'false'
                      ],
                      theme.inner.current.end.hovered[
                        resolveHoveredEndDayClass(day)
                      ],
                      theme.inner.current.start.hovered[
                        resolveHoveredStartDayClass(day)
                      ]
                    )}
                    key={`${day}-${index}`}
                    onClick={() => handleDayClick(day, 'current')}
                    onMouseOver={() => resolveHoverDay(day, 'current')}
                  >
                    <span>{day}</span>
                  </button>
                )
              })}
              {data.days.next.map((day: number, index: number) => {
                return (
                  <button
                    className={classNames(theme.inner.next.base)}
                    key={`${day}-${index}`}
                    onClick={() => handleDayClick(day, 'next')}
                    onMouseOver={() => resolveHoverDay(day, 'next')}
                  >
                    <span>{day}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {selectorOpen && (
          <div className={classNames(theme.inner.selector.base)}>
            <div className={classNames(theme.inner.selector.items.base)}>
              {getFormattedMonths(data.date, i18n).map(
                (month, index: number) => (
                  <button
                    className={classNames(
                      theme.inner.selector.items.item,
                      theme.inner.current.current[
                        dayjs().month() === index ? 'true' : 'false'
                      ],
                      theme.inner.selector.current[
                        data.date.month() === index ? 'true' : 'false'
                      ]
                    )}
                    key={month}
                    onClick={() => onSelectMonth(index)}
                  >
                    <span>{month}</span>
                  </button>
                )
              )}
            </div>
            <div className={classNames(theme.inner.selector.separator)} />
            <div className={classNames(theme.inner.selector.items.base)}>
              {generateArrayOfYears(yearInterval, yearInterval + 11).map(
                (year: string) => {
                  return (
                    <button
                      onClick={() => onSelectYear(Number(year))}
                      key={year}
                      className={classNames(
                        theme.inner.selector.items.item,
                        theme.inner.current.current[
                          dayjs().year() === Number(year) ? 'true' : 'false'
                        ],
                        theme.inner.current.current[
                          data.date.year() === Number(year) ? 'true' : 'false'
                        ]
                      )}
                    >
                      <span>{year}</span>
                    </button>
                  )
                }
              )}
            </div>
          </div>
        )}
        <div className="px-4 py-2">
          {/* <Timepicker onChange={onTimeChange} /> */}
        </div>
      </div>
    </div>
  )
}
