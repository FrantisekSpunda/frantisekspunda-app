import { useStore } from 'hooks'
import { cn, newId } from 'utils'
import React from 'react'
import getColors, { btnColors } from './colors'
import Icon from '../Icon'
import { IconType } from 'types'
import Loading from '../Loading'

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /**
   * 44 -> h-11
   * 36 -> h-9
   * 24 -> h-6
   */
  size?: '40' | '32' | '24'
  color?: btnColors
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  submit?: boolean
  icon?: { position?: 'left' | 'right' } & IconType
  loading?: boolean
}

/**
 * Primary UI component for user interaction
 */
const Button: React.FC<ButtonProps> = ({
  size = '40',
  id,
  className,
  children,
  submit = false,
  color = 'primary',
  icon,
  loading = false,
  ...props
}) => {
  const colors = getColors()
  const [btnId, setId] = React.useState('')

  React.useEffect(() => {
    setId(id || newId())
  }, [])

  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement

    target.classList.remove('transition-colors', 'duration-300')
    props.onMouseEnter && props.onMouseEnter(e)
  }

  const down = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement

    target.classList.remove('transition-colors', 'duration-300')
  }

  const up = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => {
    const target = e.target as HTMLButtonElement

    target.classList.add('transition-colors', 'duration-300')
  }

  const ButtonIcon = (show?: boolean) =>
    show && icon ? (
      <Icon
        className={cn(
          '!w-5 !h-5',
          children ? (icon.position === 'right' ? 'ml-1' : 'mr-1') : '',
          icon.containerClassName
        )}
        iconClassName={cn('text-[20px]', icon.className)}
        type={icon.type}
      >
        {icon.name}
      </Icon>
    ) : null

  return (
    <button
      id={btnId}
      type={submit ? 'submit' : 'button'}
      onMouseDown={(e) => {
        down(e), props.onMouseDown && props.onMouseDown(e)
      }}
      onMouseUp={(e) => {
        up(e), props.onMouseUp && props.onMouseUp(e)
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={(e) => {
        down(e), props.onMouseLeave && props.onMouseLeave(e)
      }}
      onKeyDown={(e) => {
        e.key === 'Enter' && down(e)
        props.onKeyDown && props.onKeyDown(e)
      }}
      onKeyUp={(e) => {
        e.key === 'Enter' && up(e)
        props.onKeyUp && props.onKeyUp(e)
      }}
      style={{ height: Number(size) / 16 + 'rem' }}
      className={cn(
        color && 'button--' + color,
        'flex items-center border px-6 rounded-sm outline-blue-60 outline-offset-[3px] uppercase italic',
        children
          ? icon
            ? icon?.position === 'right'
              ? 'pr-3'
              : 'pl-3'
            : ''
          : 'px-1.5',
        loading && 'justify-center',
        className
      )}
      {...props}
    >
      {!loading ? (
        <>
          {ButtonIcon(!icon?.position || icon?.position === 'left')}
          {children}
          {ButtonIcon(icon?.position === 'right')}
        </>
      ) : (
        <Loading spinnerClassName="!stroke-white" className="!w-6 !h-6" />
      )}
      <style>
        {`
        #${btnId} {
          color: ${colors[color].color};
          background-color: ${colors[color].bg};
          border-color: ${colors[color].border};
        }
        #${btnId} i {
          color: ${colors[color].icon};
        }

        #${btnId}:hover {
          color: ${colors[color].hover?.color || colors[color].color};
          background-color: ${colors[color].hover?.bg || colors[color].bg};
          border-color: ${colors[color].hover.border || colors[color].border};
        }
        #${btnId}:hover i {
          color: ${colors[color].hover.icon || colors[color].icon};
        }

        #${btnId}:active {
          color: ${colors[color].active?.color || colors[color].color};
          background-color: ${colors[color].active?.bg || colors[color].bg};
          border-color: ${colors[color].active?.border || colors[color].border};
        }
        #${btnId}:active i {
          color: ${colors[color].active.icon || colors[color].icon};
        }

        #${btnId}.disabled {
          color: ${colors[color].active?.color || colors[color].color};
          background-color: ${colors[color].active?.bg || colors[color].bg};
          border-color: ${colors[color].active?.border || colors[color].border};
        }
        #${btnId}.disabled i {
          color: ${colors[color].disabled.icon || colors[color].icon};
        }
        `}
      </style>
    </button>
  )
}

export default React.memo(Button)
