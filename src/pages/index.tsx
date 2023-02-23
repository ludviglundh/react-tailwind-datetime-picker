import DatetimePicker from 'components/DatetimePicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateRange } from 'types'

export default function Index() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null })

  const onChange = (range: DateRange) => {
    setValue(range)
  }

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  return (
    <div className="w-screen h-screen flex items-center justify-center h-full">
      <div className="w-1/2 max-md:w-full max-md:h-full container">
        <div className="flex flex-col flex-1 gap-4 h-full justify-center p-8">
          <span className="text-gray-600 text-lg font-semibold mt-8">
            Hello👋 Please select date and time 🗓
          </span>
          <DatetimePicker
            value={value}
            onChange={onChange}
            config={{
              i18n: 'sv',
              useDouble: true,
              // maxDate,
              // minDate,
              disabledDates: [
                dayjs('2023-03-02'),
                dayjs('2023-02-10'),
                dayjs('2023-01-31'),
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}
