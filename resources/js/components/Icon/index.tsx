import { cn } from 'utils'
import React from 'react'

export type IconTypes = 'outlined' | 'round' | 'sharp' | 'two-tone'

interface IconProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string
  iconClassName?: string
  iconStyle?: React.CSSProperties
  type?: IconTypes
  onClick?: () => void
  onEnter?: () => void
  children: string
}

const Icon: React.FC<IconProps> = ({
  className,
  iconClassName,
  type = '',
  children,
  iconStyle,
  onClick,
  onEnter,
  ...props
}) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onEnter ? onEnter() : onClick && onClick()
    }

    props.onKeyDown && props.onKeyDown(e)
  }

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement

    target.classList.remove(
      'animate-press',
      'transition-colors',
      'duration-1000'
    )
    target.classList.add('bg-[#0000001a]')
  }

  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement

    target.classList.add('animate-press', 'transition-colors', 'duration-1000')
    target.classList.remove('bg-[#0000001a]')
  }

  return (
    <div
      className={cn(
        'icon cursor-pointer w-10 h-10 rounded-[0.25rem] border border-solid border-transparent flex items-center justify-center outline-none focus-visible:outline-blue-60',
        className
      )}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick && onClick}
      onMouseUp={onClick && onMouseUp}
      onMouseDown={onClick && onMouseDown}
      onKeyDown={onKeyDown}
      {...props}
    >
      <i
        className={cn(
          `material-icons${type && '-' + type}
          h-min w-min text-black select-none pointer-events-none dark:text-white`,
          iconClassName
        )}
        style={iconStyle}
      >
        {children}
      </i>
    </div>
  )
}

export default React.memo(Icon)
