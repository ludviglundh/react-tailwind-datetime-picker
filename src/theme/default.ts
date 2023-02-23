import { DatetimePickerTheme } from 'types'

const theme: DatetimePickerTheme = {
  base: 'h-fit border-2 border-gray-300 shadow-lg rounded-md border-b-2 relative',
  disabled: {
    true: 'border-gray-100 cursor-not-allowed',
    false: 'bg-white',
  },
  useDouble: {
    true: 'w-full ',
    false: 'w-fit max-md:h-fit',
  },
  inner: {
    base: 'flex flex-1 max-md:flex-col h-full',
    disabled:
      'absolute w-full h-full z-50 bg-gray-50 opacity-70 cursor-not-allowed',
  },
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
      base: 'flex flex-1 w-full flex-col',
      week: {
        base: 'grid grid-cols-7 gap-y-1  w-full tracking-wide pb-1 text-sm p-4',
        item: 'flex items-center justify-center w-full',
        current: {
          true: 'text-blue-600',
          false: 'text-gray-600',
        },
      },
      calendar: {
        base: 'grid grid-cols-7 gap-y-1 w-full pt-2 p-4 max-md:h-full',
      },

      previous: {
        base: 'flex items-center justify-center h-10 w-10 w-full text-gray-400',
        disabled: {
          true: 'line-through cursor-not-allowed',
          false: '',
        },
      },
      current: {
        base: 'flex items-center justify-center h-10 w-full',
        disabled: {
          true: 'line-through text-gray-400 cursor-not-allowed',
          false: '',
        },
        current: {
          true: 'text-blue-600',
          false: '',
        },
        start: {
          selected: {
            true: 'bg-blue-200 rounded-l-lg',
            false: '',
          },
          hovered: {
            true: 'bg-blue-200 rounded-l-lg',
            false: '',
          },
        },
        end: {
          selected: {
            true: 'bg-blue-200 rounded-r-lg',
            false: '',
          },
          hovered: {
            true: 'bg-blue-200 rounded-r-lg',
            false: '',
          },
        },
        hover: {
          true: 'bg-gray-200',
          false: '',
        },
      },
      next: {
        base: 'flex items-center justify-center h-10 w-10 w-full text-gray-400',
        disabled: {
          true: 'line-through cursor-not-allowed',
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
