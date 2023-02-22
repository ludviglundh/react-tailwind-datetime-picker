import classNames from 'classnames'
import { useDatetimePickerContext } from 'contexts/DatetimePickerContext'
import { useThemeContext } from 'contexts/ThemeContext'
import dayjs from 'dayjs'
import { FC, useCallback, useState } from 'react'
import {
  generateArrayOfYears,
  getFormattedMonths,
  getFormattedWeekDays,
} from 'utils/dateUtils'
import { CalendarData } from './DatetimePicker'
import { Selector } from './Selector'
import { Timepicker } from './Timepicker'

interface CalendarProps {
  onDayClick: (day: number) => void
  onNextClick: () => void
  onPreviousClick: () => void
  onMonthClick: () => void
  onYearClick: () => void
  onSelectMonth: (month: number) => void
  onSelectYear: (year: number) => void
  onTimeChange: (time: string) => void
  data: CalendarData
  monthSelectorOpen: boolean
  yearSelectorOpen: boolean
}

export const Calendar: FC<CalendarProps> = ({
  onDayClick,
  onNextClick,
  onMonthClick,
  onYearClick,
  onPreviousClick,
  onSelectMonth,
  onSelectYear,
  onTimeChange,
  monthSelectorOpen,
  yearSelectorOpen,
  data,
}) => {
  const [year, setYear] = useState(dayjs().year())
  const { i18n } = useDatetimePickerContext()

  const handleNextYearsClick = useCallback(() => {
    setYear((p) => p + 13)
  }, [])

  const handlePreviousYearsClick = useCallback(() => {
    setYear((p) => p - 13)
  }, [])

  const theme = useThemeContext().theme.calendar

  return (
    <div className={classNames(theme.base)}>
      <div className={classNames(theme.inner.base)}>
        <Selector
          date={data.date}
          onNextClick={yearSelectorOpen ? handleNextYearsClick : onNextClick}
          onPreviousClick={
            yearSelectorOpen ? handlePreviousYearsClick : onPreviousClick
          }
          onMonthClick={onMonthClick}
          onYearClick={onYearClick}
          monthSelectorOpen={monthSelectorOpen}
          yearSelectorOpen={yearSelectorOpen}
        />

        {!monthSelectorOpen && !yearSelectorOpen && (
          <>
            <div className={classNames(theme.inner.week.base)}>
              {getFormattedWeekDays().map((day: string, index: number) => (
                <div
                  className={classNames(theme.inner.week.item)}
                  key={`${day}-${index}`}
                >
                  <span>{day.toUpperCase()}</span>
                </div>
              ))}
            </div>
            <div className={classNames(theme.inner.calendar)}>
              {data.days.previous.map((date: number, index: number) => {
                return (
                  <button
                    className={classNames(theme.inner.previous.button)}
                    key={`${date}-${index}`}
                    onClick={() => onDayClick(date)}
                  >
                    <span>{date}</span>
                  </button>
                )
              })}
              {data.days.current.map((date: number, index: number) => {
                return (
                  <button
                    className={classNames(theme.inner.current.button)}
                    key={`${date}-${index}`}
                    onClick={() => onDayClick(date)}
                  >
                    <span>{date}</span>
                  </button>
                )
              })}
              {data.days.next.map((date: number, index: number) => {
                return (
                  <button
                    className={classNames(theme.inner.next.button)}
                    key={`${date}-${index}`}
                    onClick={() => onDayClick(date)}
                  >
                    <span>{date}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}

        {monthSelectorOpen && !yearSelectorOpen && (
          <div className={classNames(theme.inner.monthSelector.base)}>
            {getFormattedMonths(data.date, i18n).map((month, index: number) => (
              <button
                className={classNames(theme.inner.monthSelector.item)}
                key={month}
                onClick={() => onSelectMonth(index)}
              >
                {month}
              </button>
            ))}
          </div>
        )}

        {!monthSelectorOpen && yearSelectorOpen && (
          <div className={classNames(theme.inner.yearSelector.base)}>
            {generateArrayOfYears(year, year + 13).map((year: string) => {
              return (
                <button
                  onClick={() => onSelectYear(Number(year))}
                  key={year}
                  className={classNames(theme.inner.yearSelector.item)}
                >
                  {year}
                </button>
              )
            })}
          </div>
        )}
        <div className="px-4 py-2">
          <Timepicker onChange={onTimeChange} />
        </div>
      </div>
    </div>
  )
}
