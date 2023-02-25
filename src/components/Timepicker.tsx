import type { FC } from 'react'
import classNames from 'classnames'
import useOutsideClick from '../hooks/useOutsideClick'
import { ClockIcon } from '../icons/Clock'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Time } from '../types'
import { generateHoursMinutesAndSeconds } from '../utils/dateUtils'
import { Arrow } from './Arrow'

interface TimepickerProps {
  onChange: (selectedTime: string) => void
  value?: string
  hoursLabel?: string
  minutesLabel?: string
  secondsLabel?: string
  placeholder?: string
}

export const Timepicker: FC<TimepickerProps> = ({
  onChange,
  hoursLabel = 'Hours',
  minutesLabel = 'Minutes',
  secondsLabel = 'Seconds',
  placeholder = '00:00:00',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [selectedTime, setSelectedTime] = useState<Time>({
    hour: '00',
    minute: '00',
    second: '00',
  })

  const [open, setOpen] = useState<boolean>(false)

  const { hours, minutes, seconds } = generateHoursMinutesAndSeconds()

  useOutsideClick(ref, () => {
    setOpen(false)
  })

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
    },
    []
  )

  // useEffect(() => {

  // }, [])

  const handleInputClick = () => {
    setOpen((p) => !p)
  }

  const list = 'flex flex-col gap-2 overflow-y-scroll scrollbar-thin'
  const item =
    'text-center px-2 hover:bg-gray-200 cursor-pointer rounded-md transition-hover duration-200'

  const content = useMemo(
    () => (
      <div className="flex gap-4 h-full">
        <div className="flex flex-col items-center gap-2">
          <span>{hoursLabel}</span>
          <ul className={list}>
            {hours.map((hour) => (
              <li
                key={hour}
                className={item}
                onClick={() => handleSelectTime({ hour })}
              >
                {hour}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>{minutesLabel}</span>
          <ul className={list}>
            {minutes.map((minute) => (
              <li
                key={minute}
                className={item}
                onClick={() => handleSelectTime({ minute })}
              >
                {minute}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>{secondsLabel}</span>
          <ul className={list}>
            {seconds.map((second) => (
              <li
                key={second}
                className={item}
                onClick={() => handleSelectTime({ second })}
              >
                {second}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    [
      handleSelectTime,
      hours,
      hoursLabel,
      minutes,
      minutesLabel,
      seconds,
      secondsLabel,
    ]
  )

  return (
    <div className="w-full h-full relative">
      <input
        onClick={handleInputClick}
        type="text"
        value={`${selectedTime.hour}:${selectedTime.minute}.${selectedTime.second}`}
        placeholder={placeholder}
        className={classNames(
          'w-full rounded-md border-2 border-gray-300 outline outline-transparent focus:border-gray-400'
        )}
      />
      <button className="absolute top-0 right-2 h-full">
        <ClockIcon className="w-6 h-6 stroke-gray-400" />
      </button>
      <Arrow className={classNames(open ? '' : 'hidden')} />
      <div
        ref={ref}
        className={classNames(
          open ? 'block' : 'hidden',
          'absolute z-10 top-[60px] left-[-12px] bg-white border border-gray-300 h-60 w-fit rounded-md p-4 transition-all duration-200'
        )}
      >
        {content}
      </div>
    </div>
  )
}
