import { useField } from 'formik'
import Label from './Label'
import { cn } from 'utils'
import React from 'react'
import styles from './styles'
import Description from './Description'

interface InputRadioProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  id: string
  label?: string
  disabled?: boolean
  description?: string
}

const InputRadio: React.FC<InputRadioProps> = ({
  label,
  id,
  disabled,
  checked,
  description,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)

  return (
    <>
      <label className="flex" htmlFor={id}>
        <div
          className={cn(
            'w-5 h-5 p-0.5 cursor-pointer',
            '[&>input:checked~span]:border-blue-50 [&>input:checked~span]:bg-blue-50',
            '[&>input:focus~span]:outline [&>input:focus~span]:outline-blue-60 [&>input:focus~span]:outline-2 [&>input:focus~span]:border-white'
          )}
        >
          <input
            type="radio"
            id={id}
            {...field}
            className="absolute opacity-0 pointer-events-none position"
          />
          <span
            className={cn(
              'h-4 w-4 block rounded-full border p-[4px]',
              disabled ? 'border-gray-90' : 'border-gray-80'
            )}
          >
            <div className="w-full h-full bg-white rounded-full" />
          </span>
        </div>

        <div className="pl-2">
          <Label
            props={props}
            text={label}
            className={cn('pointer-events-none', disabled && 'text-gray-60')}
          />
          <Description text={description} />
        </div>
      </label>
    </>
  )
}

export default React.memo(InputRadio)
