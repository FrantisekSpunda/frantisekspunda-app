import { Icon, Tooltip } from 'app/components'
import { useStore } from 'app/hooks'
import { cn } from 'app/utils'
import React from 'react'

const SidebarClose: React.FC = () => {
  const { store, setStore } = useStore()

  return (
    <Tooltip
      position="right"
      className={cn(
        store.sidebarOpened ? 'ml-6' : 'ml-3',
        'transition-[margin] mr-auto mt-auto mb-6'
      )}
      text={store.sidebarOpened ? 'zavřít panel' : 'otevřít panel'}
    >
      <Icon
        iconClassName="text-gray-70"
        className=" bg-background-inverse-active/10"
        onClick={() => setStore('sidebarOpened', 'toggle')}
      >
        {store.sidebarOpened ? 'chevron_left' : 'chevron_right'}
      </Icon>
    </Tooltip>
  )
}

export default React.memo(SidebarClose)
