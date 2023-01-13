import React from 'react'
import { cn } from 'utils'
import { FieldHelperProps, FieldInputProps } from 'formik'

export interface DataProps {
  id: number
  value: string
}

interface DataListProps {
  data: DataProps[]
  focused: number
  helpers: FieldHelperProps<string>
  field: FieldInputProps<string>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DataList = React.forwardRef<HTMLUListElement, DataListProps>(
  ({ data, focused, helpers, field, open, setOpen }, ref) => {
    // On click on value select it
    const onClick = (value: string) => {
      helpers.setValue(value)
      setOpen(false)
    }

    return (
      <ul
        onMouseDown={(e) => e.preventDefault()}
        className={cn(
          `
          scroll-smooth
          overflow-y-auto
          max-h-56
          absolute
          left-0
          top-[4,375rem]
          w-full
          z-20
          bg-gray-99 dark:bg-gray-10
          py-4
          flex flex-col
          opacity-0 
          pointer-events-none
          transition-opacity
          overflow-hidden
          shadow-[0px_3px_6px_-3px_rgba(23,24,24,0.08),0px_8px_20px_-4px_rgba(23,24,24,0.12)]
          scrollbar-styled
          rounded-b-lg
          `,
          open && 'opacity-100 pointer-events-auto'
        )}
        ref={ref}
      >
        {data?.map((item, key) => (
          <li
            key={item.id}
            className={cn(
              'w-full hover:bg-gray-60 cursor-pointer p-3 leading-5',
              focused === key && 'bg-gray-90 dark:bg-gray-20',
              field.value === item.value && 'bg-gray-90'
            )}
            onClick={() => onClick(item.value)}
          >
            <p>{item.value}</p>
          </li>
        ))}
      </ul>
    )
  }
)

DataList.displayName = 'DataList'

export default React.memo(DataList)
