# React Tailwind Datetime Picker
<p align="center">
  <div align="center" width="100%"> 
    <img alt="React tailwind datetime picker calendar icon" src="https://raw.githubusercontent.com/ludviglundh/react-tailwind-datetime-picker/main/assets/calendar.svg?raw=true" width="100px">
    <img alt="React tailwind datetime picker clock icon" src="https://raw.githubusercontent.com/ludviglundh/react-tailwind-datetime-picker/main/assets/clock.svg?raw=true" width="100px">
  </div>
  <br />
  <p align="center">
    ⚠️ Please note that this is a work in progress. I'm learning npm and rollup as I go
  </p>
</p>


## Installation

### Install with npm
```
npm install react-tailwind-datetime-picker
```

### Install with yarn
```
yarn add react-tailwind-datetime-picker
```

Make sure to also install the peer dependencies as well.
```
"dayjs": "^1.11.7",
"react": "^17.0.2 || ^18.2.0"
```


## Features and Pipeline
Implemented as of current version:
* ✅ Dark mode
* ✅ Min- and Max Date
* ✅ Disabled Date's
* ✅ Typescript Support

Upcoming:
* ⬜ Timepicker
* ⬜ Localization support using i18n (en & sv works for now)
* ⬜ Custom Theme
* ⬜ React-hook-form Support

## Usage

##### Add the necessary tailwind configuration

```javascript
  // ...
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwind-datetime-picker/dist/index.esm.mjs',
  ],
  // ...
```
<br />

##### Usage in your app
```javascript
import { useState } from 'react'
import DatetimePicker from 'react-tailwind-datetime-picker'

const App = () => {
  const [value, setValue] = useState({
    start: new Date() || null,
    end: new Date().setMonth(1) || null
  })

  const handleValueChange = (nextValue) => {
    setValue(nextValue)
  }

  return (
    <div>
      <DatetimePicker onChange={handleValueChange} value={setValue} />
    </div>
  )
}

export default App
```