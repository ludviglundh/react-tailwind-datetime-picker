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
        'flex items-center  w-fit justify-start px-2 py-1.5 hover:bg-gray-200 rounded-md transition-hover duration-200',
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
        current: {
          true: '',
          false: '',
        },
        start: {
          selected: {
            true: 'bg-blue-200 rounded-tl-md rounded-bl-md',
            false: '',
          },
        },
        end: {
          selected: {
            true: 'bg-blue-200',
            false: '',
          },
        },
        hover: {
          true: 'bg-gray-200',
          false: '',
        },
        range: {
          true: 'bg-gray-200',
          false: '',
        },
      },
      current: {
        button: 'flex items-center justify-center h-10 w-full text-gray-800',
        current: {
          true: 'text-blue-600',
          false: '',
        },
        start: {
          selected: {
            true: 'bg-blue-200 rounded-l-ld rounded-l-lg',
            false: '',
          },
        },
        end: {
          selected: {
            true: 'bg-blue-200 rounded-r-lg rounded-r-lg',
            false: '',
          },
        },
        hover: {
          true: 'bg-gray-200',
          false: '',
        },
        range: {
          true: 'bg-gray-200',
          false: '',
        },
      },
      next: {
        button: 'flex items-center justify-center h-10 w-full text-gray-400',
        current: {
          true: '',
          false: '',
        },
        start: {
          selected: {
            true: 'bg-blue-200',
            false: '',
          },
        },
        end: {
          selected: {
            true: 'bg-blue-200',
            false: '',
          },
        },
        hover: {
          true: '',
          false: '',
        },
        range: {
          true: 'bg-gray-200',
          false: '',
        },
      },
      selector: {
        base: 'flex flex-1 items-center justify-between gap-8 px-4 py-2',
        separator: 'h-5/6 w-[3px] bg-gray-300 my-20 ',
        current: {
          true: 'text-blue-600',
          false: '',
        },
        items: {
          base: 'grid grid-cols-2 gap-y-1 tracking-wide w-full',
          item: 'flex flex-1 items-center justify-center hover:bg-gray-200 rounded-md transition-hover duration-200 p-3',
        },
      },
    },
  },
}

export default theme
