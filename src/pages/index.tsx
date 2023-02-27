import classNames from 'classnames'
import DatetimePicker from '../components/DatetimePicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { DateRange } from '../types'

export default function Index() {
  const [value, setValue] = useState<DateRange>({ start: null, end: null })
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const onChange = (range: DateRange) => {
    setValue(range)
  }

  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  return (
    <div className={classNames('h-screen w-screen max-md:h-full overflow-y-scroll overflow-x-hidden', theme)}>
      <div className="w-screen h-full flex items-start justify-center h-full dark:bg-slate-900 lg:pt-20">
        <div className="w-1/2 max-md:w-full max-md:h-full container">
          <div className="flex flex-col flex-1 gap-4 h-full justify-center p-8">
            <button
              onClick={() =>
                setTheme((p) => (p === 'light' ? 'dark' : 'light'))
              }
              className="text-6xl self-start max-md:text-5xl"
            >
              {theme === 'light' ? '🌚' : '🌞'}
            </button>
            <div className="flex flex-col justify-between items-center dark:text-white/70 text-gray-600 text-lg mt-8 gap-2">
              <span className="font-semibold ">
                Hello👋 Please select date and time 🗓
              </span>
              <div className="flex  gap-2">
                <span>Selected Time</span>
                {`${value.start ?? ''} - ${value.end ?? ''}`}
              </div>
            </div>
            <DatetimePicker
              value={value}
              onChange={onChange}
              config={{
                i18n: 'sv',
                useTimepicker: true

              }}
            />
          </div>
        </div>
      </div>
      </div>
    
  )
}
