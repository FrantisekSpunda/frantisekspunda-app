import { usePage, useStore } from 'app/hooks'
import { cn } from 'app/utils'
import Image from 'next/image'
import Link from 'next/link'
import logoDefault from 'public/images/logo/default.svg'
import logoMini from 'public/images/logo/mini.svg'
import React from 'react'
import { memo } from 'react'
import Close from './sidebar.close'
import List from './sidebar.list'

const Sidebar: React.FC = () => {
  const { store } = useStore()

  return (
    <nav
      id="sidebar"
      className={cn(
        store.sidebarOpened ? 'w-64' : 'w-[4.5rem]',
        'z-50 h-screen border-r border-gray-90 bg-[#0B0424] dark:bg-gray-10 transition-[width] duration-300 flex flex-nowrap flex-col relative'
      )}
    >
      <Link href={'/'}>
        <a
          className={cn(
            'block h-6 mt-6 mb-8 pb-8 relative outline-none focus-visible:outline-border-active outline-offset-1',
            store.sidebarOpened
              ? 'w-[4.75rem] ml-[2.125rem] animate-[show_150ms_ease-in] rounded'
              : 'w-10 ml-3 animate-[showToo_150ms_ease-in] rounded-full'
          )}
        >
          {store.sidebarOpened ? (
            <Image
              src={logoDefault}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <Image
              src={logoMini}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          )}
        </a>
      </Link>
      <menu className="flex flex-col w-full h-full">
        <List />
        <Close />
      </menu>
    </nav>
  )
}

export default memo(Sidebar)
