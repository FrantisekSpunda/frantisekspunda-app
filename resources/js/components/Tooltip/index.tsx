import { cn } from 'utils'
import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  tooltipClassName?: string
}

const Tooltip: React.FC<
  TooltipProps & React.DOMAttributes<TooltipProps & HTMLDivElement>
> = ({
  children,
  text,
  className,
  tooltipClassName,
  position = 'bottom',
  ...props
}) => {
  const ref = React.useRef<HTMLSpanElement>(null)

  const show = () => {
    ref.current?.classList.add('opacity-100')
    ref.current?.classList.remove('opacity-0', '!delay-0')
  }

  const hide = () => {
    ref.current?.classList.add('opacity-0', '!delay-0')
    ref.current?.classList.remove('opacity-100')
  }

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      onClick={hide}
      className={cn('relative', className)}
      {...props}
    >
      {children}
      <span
        ref={ref}
        className={cn(
          position === 'bottom'
            ? 'top-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2'
            : position === 'top'
            ? 'bottom-[calc(100%_+_0.5rem)] left-1/2 -translate-x-1/2'
            : position === 'left'
            ? 'right-[calc(100%_+_0.5rem)] top-1/2 -translate-y-1/2'
            : position === 'right'
            ? 'left-[calc(100%_+_0.5rem)] top-1/2 -translate-y-1/2'
            : '',
          'opacity-0 p-1.5 rounded bg-gray-10 text-white text-caption absolute text-sm pointer-events-none select-none whitespace-nowrap z-tooltip transition-opacity duration-150',
          tooltipClassName
        )}
      >
        {text}
      </span>
    </div>
  )
}

export default React.memo(Tooltip)
