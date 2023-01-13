import { useField } from 'formik'
import React from 'react'
import styles from './styles'
import Label from './Label'
import Error from './Error'
import Description from './Description'

export interface InputTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  name: string
  id?: string
  label?: string
  focused?: boolean
  value?: string
  error?: any
  placeholder?: string
  required?: boolean
  textareaClassName?: string
  transform?: 'capitalize' | 'uppercase' | 'lowercase'
  description?: string
}

const InputTextarea: React.FC<InputTextareaProps> = ({
  label,
  id,
  required = false,
  className,
  textareaClassName,
  description,
  ...props
}) => {
  const [field, meta] = useField<string>(props)

  return (
    <div className={styles.container(className || '')}>
      <Label
        text={label}
        required={required}
        id={id}
        props={props}
        className="mb-1"
      />

      <textarea
        className={styles.control(
          meta,
          'h-32 scrollbar-styled py-2.5 px-3.5 resize-none',
          textareaClassName || ''
        )}
        {...field}
        {...props}
        id={id || props.name}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete="do-not-autofill"
        autoCorrect="off"
      />
      <Error name={field.name} />
      <Description text={description} />
    </div>
  )
}

export default React.memo(InputTextarea)
