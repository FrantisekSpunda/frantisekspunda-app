import { cn } from 'utils'
import React from 'react'

const Hr: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <hr className={cn('block border-none h-[1px] bg-gray-90', className)} />
  )
}

export default React.memo(Hr)
