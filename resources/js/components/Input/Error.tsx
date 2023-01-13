import { cn } from 'utils'
import { ErrorMessageProps, ErrorMessage } from 'formik'
import React from 'react'
import Icon from '../Icon'

const Error: React.FC<ErrorMessageProps> = ({ className, ...props }) => (
  <ErrorMessage
    {...props}
    render={(message: string) => (
      <span
        className={cn(
          'flex text-base h-min w-full mt-1 text-red-50',
          className
        )}
      >
        <Icon
          iconClassName="text-red-50 dark:text-red-50 text-[1rem] w-4 h-4 p-0"
          className="w-5 h-5 mr-1"
        >
          error
        </Icon>
        {message}
      </span>
    )}
  />
)

export default React.memo(Error)
