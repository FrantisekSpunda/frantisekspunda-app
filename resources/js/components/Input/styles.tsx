import { cn } from 'utils'
import { FieldMetaProps } from 'formik'

const styles = {
  container: (...className: string[]) => cn('w-full', ...className),
  control: (meta: FieldMetaProps<any>, ...className: string[]) =>
    cn(
      'w-full',
      'h-10',
      'flex',
      'items-center',
      'flex-nowrap',
      'outline-none',
      'text-black dark:text-white',
      'bg-white dark:bg-gray-10',
      'px-3',
      'border',
      'rounded',
      'border-border-default',
      'shadow-input-error',
      'shadow-transparent',
      'outline outline-offset-0',
      'shadow-[0px_1px_2px_#E1E1E1',
      'focus-within:outline-blue-60',
      'cursor-text',
      meta.touched && meta.error && '!border-red-50 shadow-red',
      ...className
    ),
}

export default styles
