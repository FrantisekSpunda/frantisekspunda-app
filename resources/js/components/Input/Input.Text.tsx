import React from 'react'
import { useField } from 'formik'
import { Icon } from 'components'
import { cn } from 'utils'
import styles from './styles'
import Error from './Error'
import Label from './Label'
import Description from './Description'

export interface InputTextProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  id?: string
  type?: React.HTMLInputTypeAttribute
  label?: string
  focused?: boolean
  value?: string
  required?: boolean
  placeholder?: string
  transform?: 'capitalize' | 'uppercase' | 'lowercase'
  icon?: string
  className?: string
  inputClassName?: string
  contentClassName?: string
  before?: React.ReactNode
  after?: React.ReactNode
  controlProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  description?: string
}

const InputText: React.FC<InputTextProps> = ({
  label,
  id,
  icon,
  required = false,
  transform,
  className,
  inputClassName,
  contentClassName,
  before,
  after,
  controlProps,
  description,
  ...props
}) => {
  const [field, meta] = useField<string>(props)
  const ref = React.useRef<HTMLInputElement>(null)

  // Handle changes for have format for telephone
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.type && props.type === 'tel') {
      e.target.value = e.target.value.replace(/[^\d]/g, '')

      if (e.target.value.length < 4) e.target.value = e.target.value
      else if (e.target.value.length < 7)
        e.target.value = `${e.target.value.slice(0, 3)} ${e.target.value.slice(
          3
        )}`
      else if (e.target.value.length <= 10)
        e.target.value = `${e.target.value.slice(0, 3)} ${e.target.value.slice(
          3,
          6
        )} ${e.target.value.slice(6, 9)}`
    }

    field.onChange(e)
  }

  // Focus input if clicked on container of input. Container is called `control`
  const controlOnClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    controlProps?.onClick && controlProps?.onClick(e)

    ref.current?.focus()
  }

  return (
    <div className={styles.container(className || '')}>
      <Label
        text={label}
        required={required}
        id={id}
        props={props}
        className="mb-1"
      />
      <div
        className={styles.control(meta, contentClassName || '')}
        {...controlProps}
        onClick={controlOnClick}
      >
        {!!icon && (
          <Icon
            iconClassName="text-[1.25rem] text-gray-40 dark:text-gray-80"
            className="w-5 h-5 mr-2"
          >
            {icon}
          </Icon>
        )}
        {!!before && before}
        <input
          ref={ref}
          className={cn(
            'w-full h-full relative outline-none text-black text-base placeholder-disabled bg-transparent dark:text-white dark:placeholder:text-gray-90 autofill-style-disable',
            inputClassName
          )}
          type={props.type || 'text'}
          placeholder={props.placeholder}
          id={id || props.name}
          autoComplete="do-not-autofill"
          autoCorrect="nolol"
          {...field}
          {...props}
          style={{ textTransform: transform }}
          onChange={onChange}
        />
        {!!after && after}
      </div>
      <Error name={field.name} />
      <Description text={description} />
    </div>
  )
}

export default React.memo(InputText)
