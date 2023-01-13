import { cn } from 'utils'
import { useField } from 'formik'
import React from 'react'
import Label from './Label'
import Error from './Error'
import Description from './Description'

export interface InputCheckBoxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  id?: string
  label?: string
  error?: any
  required?: boolean
  disabled?: boolean
  description?: string
}

const InputCheckBox: React.FC<InputCheckBoxProps> = ({
  label,
  id,
  required = false,
  disabled = false,
  description,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField<boolean>(props)
  const ref = React.useRef<HTMLInputElement>(null)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Toggle checkbox value on press Enter
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()

      helpers.setValue(!field.value)
    }

    props?.onKeyDown && props.onKeyDown(e)
  }

  const onClick = (e: React.MouseEvent<any, MouseEvent>) => {
    // Toggle checkbox value on click on it
    !disabled && helpers.setValue(!field.value)

    !disabled && props?.onClick && props.onClick(e)
  }

  return (
    <label className="flex" onClick={onClick}>
      <input
        ref={ref}
        type="checkbox"
        className="hidden"
        {...field}
        value={field.value ? 'true' : 'false'}
      />

      <div className="w-5 h-5 p-0.5">
        <div
          className={cn(
            'w-full h-full border rounded-sm flex justify-center items-center',
            !disabled
              ? field.value
                ? 'bg-blue-50 border-blue-50'
                : 'bg-white border-gray-80'
              : 'border-gray-90',
            'focus:outline focus:outline-blue-60 focus:outline-2 focus:border-white'
          )}
          tabIndex={0}
          onKeyDown={onKeyDown}
          {...props}
        >
          <i
            className={cn(
              'material-icons h-min w-min text-white select-none pointer-events-none text-[0.75rem] leading-[0.875rem]'
            )}
          >
            check
          </i>
        </div>
      </div>

      <div className="pl-2">
        <Label
          text={label}
          required={required}
          id={id}
          props={props}
          className={cn(disabled && 'text-gray-60')}
        />
        <Description text={description} />
      </div>
    </label>
  )
}

export default React.memo(InputCheckBox)
