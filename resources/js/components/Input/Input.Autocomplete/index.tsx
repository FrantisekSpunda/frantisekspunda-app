import InputText, { InputTextProps } from '../Input.Text'
import React from 'react'
import { cn } from 'utils'
import { useField } from 'formik'
import DataList from './DataList'
import config from 'config'

export interface DataProps {
  id: number
  name: string
  type: 'earlier' | 'searched'
  subname?: string
  list?: string
  tags?: string[]
}

interface InputAutocompleteProps extends InputTextProps {
  data: DataProps[]
}

const InputAutocomplete: React.FC<InputAutocompleteProps> = ({
  data,
  className,
  ...props
}) => {
  const [field, meta, helpers] = useField(props)
  const [focused, setFocused] = React.useState(-1)
  const [searched, setSearched] = React.useState('')
  const focusedId = data[focused]?.id || 0

  // const dataUpdate = [{
  //   id: 0,
  //   name: 'Vyhledat',
  //   type: ''
  // }]

  // If is select open this will change focus
  // If is select closed this will change DATA and focus
  const arrowControl = (key: 'ArrowDown' | 'ArrowUp') => {
    setFocused((prev) => {
      prev === -1 && setSearched(field.value)

      const value =
        key === 'ArrowDown'
          ? prev === data.length - 1
            ? -1
            : prev + 1
          : prev === -1
          ? data.length - 1
          : prev - 1

      return value
    })
  }

  // * handeling keybord control
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') arrowControl(e.key)

    if (e.key === 'Enter') {
      e.preventDefault()

      console.log('autocomplete', data[focused])
    }
  }

  React.useEffect(() => {
    const focusedValue = data[focused]
    if (focusedValue?.type === 'earlier') {
      helpers.setValue(focusedValue.name)
    }
    if (focused === -1) helpers.setValue(searched)
  }, [data, focusedId])

  return (
    <div
      className={cn(
        'w-full relative [&>ul]:focus-within:opacity-100 [&>ul]:focus-within:pointer-events-auto',
        className
      )}
    >
      <InputText {...props} {...field} onKeyDown={onKeyDown}></InputText>
      <DataList data={data} focused={focused} />
    </div>
  )
}

export default React.memo(InputAutocomplete)
