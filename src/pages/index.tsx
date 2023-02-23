import DatetimePicker from 'components/DatetimePicker'
import { useState } from 'react'

export default function Index() {
  const [value, setValue] = useState('')

  const onChange = (nextValue: string) => {
    setValue(nextValue)
  }

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
            }}
          />
        </div>
      </div>
    </div>
  )
}
