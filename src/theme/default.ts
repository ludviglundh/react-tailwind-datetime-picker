import { DatetimePickerTheme } from 'types'

const theme: DatetimePickerTheme = {
  base: 'bg-white w-full border-2 border-gray-300 shadow-lg rounded-md border-b-2 max-md:h-full',
  inner: 'flex flex-1 max-md:flex-col max-md:h-full',
  monthSelector: {
    base: 'w-full flex flex-initial items-center justify-between py-4',
    selector: {
      base: 'w-full flex flex-1 items-center justify-between px-4',
      previous:
        'flex items-center justify-center p-1.5 rounded-full hover:bg-gray-200 transition-hover duration-200 mr-2',
      month:
        'flex items-center flex-1 justify-center px-2 py-1.5 hover:bg-gray-200 rounded-md transition-hover duration-200',
      year: 'flex items-center flex-1 justify-center px-2 py-1.5 hover:bg-gray-200 rounded-md transition-hover duration-200',
      next: 'flex items-center justify-center p-1.5 rounded-full hover:bg-gray-200 transition-hover duration-200 ml-2',
    },
  },
  calendar: {
    base: 'flex flex-1 max-md:h-full',
    inner: {
      base: 'flex flex-1 w-full flex-col h-full',
      week: {
        base: 'grid grid-cols-7 gap-y-1 gap-x-1 w-full tracking-wide pb-1 text-sm p-4',
        item: 'flex items-center justify-center w-full text-gray-400',
      },
      calendar:
        'grid grid-cols-7 gap-y-1 gap-x-1 w-full pt-2 p-4 max-md:h-full',
      previous: {
        button: 'flex items-center justify-center h-10 w-full text-gray-400',
      },
      current: {
        button: 'flex items-center justify-center h-10 w-full text-gray-800',
      },
      next: {
        button: 'flex items-center justify-center h-10 w-full text-gray-400',
      },
      monthSelector: {
        base: 'w-full h-full grid grid-cols-2 gap-y-1 tracking-wide pb-4 px-4',
        item: 'flex flex-1 items-center justify-center hover:bg-gray-200 rounded-md transition-hover duration-200',
      },
      yearSelector: {
        base: 'w-full h-full grid grid-cols-2 gap-y-1 tracking-wide pb-4 px-14"',
        item: 'flex flex-1 items-center justify-center hover:bg-gray-200 rounded-md transition-hover duration-200',
      },
    },
  },
}

export default theme
