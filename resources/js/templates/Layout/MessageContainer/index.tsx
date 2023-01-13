import React from 'react'
import { useStore } from 'hooks'
import { cn } from 'utils'
import { Icon } from 'components'
import { IconType } from 'types'

export interface MessageProps {
  id?: number
  type: 'info' | 'warning' | 'error' | 'success'
  text: string
}

const messageTypes: {
  [x: string]: {
    className: string
    line: string
    icon: IconType
  }
} = {
  info: {
    className: '',
    line: 'bg-blue-60',
    icon: {
      name: 'info',
      className: 'text-blue-90',
    },
  },
  warning: {
    className: '',
    line: 'bg-primary-60',
    icon: {
      name: 'warning',
      className: 'text-primary-60',
    },
  },
  error: {
    className: '',
    line: 'bg-red-60',
    icon: {
      name: 'highlight_off',
      className: 'text-red-60',
    },
  },
  success: {
    className: '',
    line: 'bg-green-60',
    icon: {
      name: 'thumb_up_alt',
      className: 'text-green-80',
    },
  },
}

const Message: React.FC<MessageProps> = (message: MessageProps) => {
  const readTime = message.text.split(' ').length * 0.8 * 1000
  const { setStore } = useStore()

  const onClick = (id: number) => {
    setStore('message', (prev) => prev.filter((mess) => mess.id !== id))
  }

  React.useEffect(() => {
    setTimeout(() => {
      setStore('message', (prev) =>
        prev.filter((mess) => mess.id !== message.id)
      )
    }, readTime - 0.1)
  }, [])

  return (
    <li
      className={cn(
        'relative flex items-center py-3 pl-2 pr-6 mt-2 overflow-hidden rounded bg-primary-10 cursor-pointer',
        messageTypes[message.type].className
      )}
      onClick={() => onClick(message.id || 0)}
    >
      <Icon
        type={messageTypes[message.type].icon.type}
        className={cn(
          'mr-2',
          messageTypes[message.type].icon.containerClassName
        )}
        iconClassName={cn(
          'text-white',
          messageTypes[message.type].icon.className
        )}
      >
        {messageTypes[message.type].icon.name}
      </Icon>
      <span className="text-white">{message.text}</span>
      <div
        className={cn(
          'absolute bottom-0 left-0 h-1 bg-white !opacity-100 animate-extend',
          messageTypes[message.type].line
        )}
        style={{
          animationDuration: readTime + 'ms',
          animationTimingFunction: 'linear',
        }}
      />
    </li>
  )
}

const MessageContainer: React.FC = () => {
  const { store } = useStore()

  return (
    <ul
      className={cn(
        'absolute bottom-10 left-1/2 -transform-x-1/2 z-message flex flex-col transition-[height]'
      )}
    >
      {store.message.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </ul>
  )
}

export default React.memo(MessageContainer)
