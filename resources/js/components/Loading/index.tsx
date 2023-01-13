import { cn } from 'utils'
import React from 'react'
import styles from './Loading.module.scss'

interface LoadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  spinnerClassName?: string
}

const Loading: React.FC<LoadingProps> = ({
  className,
  spinnerClassName,
  ...props
}) => {
  return (
    <div className={cn('w-8 h-8', className)} {...props}>
      <svg
        className={cn(styles.spinner, 'stroke-primary-40', spinnerClassName)}
        viewBox="0 0 50 50"
      >
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  )
}

export default React.memo(Loading)
