import DatetimePicker from 'components/DatetimePicker'
import { useState } from 'react'

export default function Index() {
  const [value, setValue] = useState('')

  const onChange = (nextValue: string) => {
    setValue(nextValue)
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-1/2">
        <DatetimePicker
          value={value}
          onChange={onChange}
          i18n="sv"
          useRange={true}
        />
      </div>
    </div>
  )
}
