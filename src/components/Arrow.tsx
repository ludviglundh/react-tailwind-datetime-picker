import type { FC } from 'react'
import type { ArrowProps } from '../types'
import classNames from 'classnames'

export const Arrow: FC<ArrowProps> = ({ className }) => {
  return (
    <div
      className={classNames(
        className,
        'absolute top-12 left-2 h-6 w-6 rotate-45 border-t border-l border-gray-300 bg-white z-20 bg-white rounded-[3px]'
      )}
    ></div>
  )
}
