import { cn } from 'utils'
import React from 'react'
import Tooltip from '../Tooltip'

interface LabelProps {
  text?: string
  required?: boolean
  id?: string
  props?: any
  className?: string
}

/**
 * This is default label for inputs. Put it to every input if is possible
 *
 * @param text text of label
 * @param required (if is input required)
 * @param id (id of input)
 * @param props (props of input)
 */
const Label: React.FC<LabelProps> = ({
  text,
  required,
  id,
  props,
  className,
}) =>
  text ? (
    <label
      className={cn(
        'flex',
        'transition-transform',
        'text-button',
        'select-none',
        'before:block',
        className
      )}
      htmlFor={id || props.name}
    >
      {text}{' '}
      {!!required && (
        <Tooltip
          text="povinné pole"
          className="px-1 cursor-help"
          position="right"
        >
          <span className="text-caption text-red-50">*</span>
        </Tooltip>
      )}
    </label>
  ) : null
export default React.memo(Label)
