import type { Time, TimepickerProps } from '../types'
import { FC, useEffect } from 'react'
import { ClockIcon } from '../icons/Clock'
import { useCallback, useMemo, useRef, useState } from 'react'
import { generateHoursMinutesAndSeconds } from '../utils/dateUtils'
import { Arrow } from './Arrow'
import classNames from 'classnames'
import dayjs from 'dayjs'
import useOutsideClick from '../hooks/useOutsideClick'

// TODO: scroll time item into view when pressing "Now" button
export const Timepicker: FC<TimepickerProps> = ({
  onChange,
  hoursLabel = 'Hours',
  minutesLabel = 'Minutes',
  secondsLabel = 'Seconds',
  placeholder = '00:00:00',
  label = '',
  nowButtonLabel = '',
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [selectedTime, setSelectedTime] = useState<Time>({
    hour: '00',
    minute: '00',
    second: '00',
  })

  const [value, setValue] = useState<string>('')

  const [open, setOpen] = useState<boolean>(false)

  const { hours, minutes, seconds } = generateHoursMinutesAndSeconds()

  useOutsideClick(dropdownRef, () => {
    if (open) setOpen(false)

    if (value.includes(':')) return
    const [hour, minute, second] = value.replace(/..\B/g, '$&:').split(':')
    setSelectedTime({
      hour: hour ?? '',
      minute: minute ?? '',
      second: second ?? '',
    })
  })

  const handleManualInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (!value.match(/^$|[0-9, :]/g)) return
    setValue(value)
  }

  const handleSelectTime = useCallback(
    ({
      hour,
      minute,
      second,
    }: {
      hour?: string
      minute?: string
      second?: string
    }) => {
      setSelectedTime((prev) => ({
        hour: hour ?? prev.hour,
        minute: minute ?? prev.minute,
        second: second ?? prev.second,
      }))

      onChange(selectedTime)
    },
    [onChange, selectedTime]
  )

  const handleNowClick = useCallback(() => {
    const nextTime: Time = {
      hour: dayjs().hour().toString(),
      minute: dayjs().minute().toString(),
      second: dayjs().second().toString(),
    }

    setSelectedTime(nextTime)

    onChange(nextTime)
  }, [onChange])

  useEffect(() => {
    setValue(
      `${selectedTime.hour}:${selectedTime.minute}:${selectedTime.second}`
    )
  }, [selectedTime.hour, selectedTime.minute, selectedTime.second])

  const handleInputClick = () => {
    setOpen((p) => !p)
  }

  const list = 'flex flex-col flex-1 gap-2 overflow-y-scroll scrollbar-thin'
  const item =
    'text-center px-2 hover:bg-blue-400 dark:hover:bg-blue-600 cursor-pointer rounded-md transition-hover duration-200'

  const content = useMemo(
    () => (
      <div className="flex flex-col flex-1 w-full h-full gap-4">
        <div className="flex flex-1 gap-4 h-full w-full justify-around max-h-60">
          <div className="flex flex-col items-center gap-2">
            <span>{hoursLabel}</span>
            <ul className={list}>
              {hours.map((hour: string) => {
                const selected = hour === selectedTime.hour

                return (
                  <li
                    key={hour}
                    className={classNames(
                      item,
                      selected ? 'bg-blue-400 dark:bg-blue-600' : ''
                    )}
                    onClick={() => handleSelectTime({ hour })}
                  >
                    {hour}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span>{minutesLabel}</span>
            <ul className={list}>
              {minutes.map((minute: string) => {
                const selected = minute === selectedTime.minute
                return (
                  <li
                    key={minute}
                    className={classNames(
                      item,
                      selected ? 'bg-blue-400 dark:bg-blue-600' : ''
                    )}
                    onClick={() => handleSelectTime({ minute })}
                  >
                    {minute}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span>{secondsLabel}</span>
            <ul className={list}>
              {seconds.map((second: string) => {
                const selected = second === selectedTime.second
                return (
                  <li
                    key={second}
                    className={classNames(
                      item,
                      selected ? 'bg-blue-400 dark:bg-blue-600' : ''
                    )}
                    onClick={() => handleSelectTime({ second })}
                  >
                    {second}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8">
          <button
            onClick={handleNowClick}
            className="flex border-2 rounded-lg border-slate-400 items-center w-fit hover:bg-slate-400 hover:text-white transition-hover duration-200"
          >
            <span className="w-full px-2 py-1">{nowButtonLabel}</span>
          </button>
        </div>
      </div>
    ),
    [
      handleNowClick,
      handleSelectTime,
      hours,
      hoursLabel,
      minutes,
      minutesLabel,
      nowButtonLabel,
      seconds,
      secondsLabel,
      selectedTime.hour,
      selectedTime.minute,
      selectedTime.second,
    ]
  )

  return (
    <div className="w-full h-full relative flex flex-col dark:text-white/70">
      <span className="pl-px">{label}</span>
      <input
        onClick={handleInputClick}
        onChange={handleManualInput}
        type="text"
        value={value}
        placeholder={placeholder}
        maxLength={6}
        className={classNames(
          'w-full rounded-md border-2 border-gray-300 outline outline-transparent focus:border-gray-400 dark:bg-slate-800 dark:border-slate-700 dark:text-white/70'
        )}
      />
      <button className="absolute top-[14px] right-2 h-full">
        <ClockIcon className="w-6 h-6 stroke-slate-400" />
      </button>
      <Arrow className={classNames(open ? '' : 'hidden')} />
      <div
        ref={dropdownRef}
        className={classNames(
          open ? 'block' : 'hidden',
          'absolute z-10 top-[85px] left-[-12px] bg-white  border border-gray-300 h-fit w-full rounded-md p-4 transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 border-2'
        )}
      >
        {content}
      </div>
    </div>
  )
}
