import { Icon } from 'app/components'
import { Tooltip, PopupMenu } from 'app/components'
import Notifications from './Navbar.Notifications'
import React from 'react'
import UserPopup from './Navbar.UserPopup'
import Search from './Navbar.Search'
import { useRouter } from 'next/router'
import Api from 'app/api'
import Image from 'next/image'
import logoDefaultInvert from 'public/images/logo/default-invert.svg'
import Link from 'next/link'
import { usePage } from 'app/hooks'

const Navbar: React.FC = () => {
  const { page } = usePage()
  const router = useRouter()

  return (
    <header
      id="navbar"
      className="w-full h-[4.5rem] flex flex-row flex-nowrap justify-between px-12 py-4 border-b border-gray-90 bg-white dark:bg-gray-10"
    >
      {/* NAVBAR LOGO when sidebar is hidden, there is no logo so logo must be here */}
      {!page.layout.navigation ? (
        <Link href={'/'}>
          <a className="block h-full w-[4.75rem] relative outline-none focus-visible:outline-border-active outline-offset-1 rounded mr-7">
            <Image
              src={logoDefaultInvert}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      ) : null}

      {/* SEARCH IN ADMIN input */}
      <Search />

      <div className="flex items-center justify-between">
        {/* NOTIFICATIONS */}
        {page.layout.topbar?.notifications ? (
          <PopupMenu
            position={['bottom', 'left']}
            trigger={(onClick, open) => (
              <Tooltip text="Oznámení">
                <Icon
                  type={open ? undefined : 'outlined'}
                  onClick={onClick}
                  badge={3}
                  tabIndex={0}
                >
                  notifications
                </Icon>
              </Tooltip>
            )}
          >
            <Notifications />
          </PopupMenu>
        ) : null}

        {/* LOGGED USER */}
        <PopupMenu
          position={['bottom', 'left']}
          trigger={(onClick) => (
            <button
              className="relative w-10 h-10 ml-6 overflow-hidden rounded-full cursor-pointer bg-gray-95 outline-blue-60"
              type="button"
              onClick={onClick}
            >
              <Image
                src={'/images/others/default_avatar.svg'}
                layout="fill"
                alt="profile image"
              />
            </button>
          )}
        >
          <UserPopup />
        </PopupMenu>
      </div>
    </header>
  )
}

export default React.memo(Navbar)
