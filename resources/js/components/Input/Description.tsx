import React from 'react'
import { cn } from 'utils'

interface DescriptionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLInputElement
  > {
  text?: string
}

const Description: React.FC<DescriptionProps> = (props) => {
  return props.text ? (
    <p
      className={cn('text-base text-gray-30 mt-1', props.className)}
      {...props}
    >
      {props.text}
    </p>
  ) : null
}

export default React.memo(Description)
