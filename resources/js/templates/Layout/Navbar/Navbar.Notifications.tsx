import { Hr, Icon, Badge } from 'app/components'
import { cn } from 'app/utils'
import React from 'react'
import { useStore } from 'app/hooks'

const Notifications: React.FC = () => {
  return (
    <div className="w-[30rem]">
      {/* <p className="flex items-center justify-between p-3 select-none">
        Oznámení
        <Badge size="big" color="primary">
          {notificationsArr.length} nová oznámení
        </Badge>
      </p>
      <Hr />
      <ul className="pb-3">
        {notificationsArr.map((value, index) => (
          <li
            key={value.id}
            className="flex flex-row gap-3 p-3 pb-0 cursor-pointer hover:bg-hover"
          >
            <Icon
              iconClassName="text-secondary text-[20px]"
              className="w-5 h-5 p-0 pt-0.5"
            >
              {value.icon}
            </Icon>
            <article className="w-full">
              <p>{value.text}</p>
              <span className="text-neutral-50 text-caption">
                {value.dateTime}
              </span>
              <Hr
                className={cn(
                  'mt-4',
                  notificationsArr.length - 1 === index && 'bg-transparent'
                )}
              />
            </article>
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default React.memo(Notifications)
