import type { FC } from 'react'
import classNames from 'classnames'
import { useDatetimePickerContext } from 'contexts/DatetimePickerContext'
import { useThemeContext } from 'contexts/ThemeContext'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleChevronLeftIcon,
  DoubleChevronRightIcon,
} from 'icons'
import { getFormattedMonth, getFormattedYear } from 'utils/dateUtils'
import { loadI18n } from 'utils/i18nUtils'
import { CalendarData } from './DatetimePicker'

interface SelectorProps {
  onNextClick: () => void
  onPreviousClick: () => void
  onMonthClick: () => void
  onYearClick: () => void
  monthSelectorOpen: boolean
  yearSelectorOpen: boolean
  date: CalendarData['date']
}

export const Selector: FC<SelectorProps> = ({
  onNextClick,
  onPreviousClick,
  onMonthClick,
  onYearClick,
  monthSelectorOpen,
  yearSelectorOpen,
  date,
}) => {
  const theme = useThemeContext().theme.monthSelector
  const { i18n } = useDatetimePickerContext()
  loadI18n(i18n)

  return (
    <div className={classNames(theme.base)} id="month-selector">
      <div className={classNames(theme.selector.base)}>
        {!monthSelectorOpen && (
          <button
            onClick={onPreviousClick}
            className={classNames(theme.selector.previous)}
          >
            {yearSelectorOpen ? <DoubleChevronLeftIcon /> : <ChevronLeftIcon />}
          </button>
        )}
        <button
          onClick={onMonthClick}
          className={classNames(theme.selector.month)}
        >
          <span>{getFormattedMonth(date, i18n)}</span>
        </button>
        <button
          onClick={onYearClick}
          className={classNames(theme.selector.year)}
        >
          <span>{getFormattedYear(date, i18n)}</span>
        </button>
        {!monthSelectorOpen && (
          <button
            onClick={onNextClick}
            className={classNames(theme.selector.next)}
          >
            {yearSelectorOpen ? (
              <DoubleChevronRightIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
