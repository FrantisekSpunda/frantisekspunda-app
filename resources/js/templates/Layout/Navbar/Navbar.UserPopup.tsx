import { Badge, Button, Hr, PopupMenuProps, Tooltip } from 'app/components'
import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import User from 'app/api/api.User'
import Api from 'app/api'
import { useMessage, usePage } from 'app/hooks'

const UserPupup: React.FC<PopupMenuProps<User.Data>> = ({ setOpen }) => {
  const router = useRouter()
  const { page } = usePage()
  const { setMessage } = useMessage()

  return (
    <div className="w-[15rem]">
      <Tooltip position="bottom" text="Upravit účet">
        <div
          onClick={() => router.push('/user-settings')}
          className="flex flex-col items-center p-4 cursor-pointer hover:bg-hover bg-gradient-to-br from-gray-95 to-white"
        >
          <div className="relative mb-4 overflow-hidden rounded-full w-11 h-11 bg-fill">
            <Image
              src={'/images/others/default_avatar.svg'}
              layout="fill"
              alt="profile image"
            />
          </div>
          <div>
            <p className="flex items-center justify-between mb-1 select-none">
              {page.auth?.username}
              {/* <Icon iconClassName="text-[16px] text-disabled">edit</Icon> */}
            </p>
            <p className="text-caption text-gray-50">{page.auth?.email}</p>
          </div>
        </div>
      </Tooltip>
      <Hr />
      <div className="px-4 py-3">
        <ul className="flex flex-wrap -m-1 [&>li]:m-1">
          <li>
            <Badge size={'big'} color="gray">
              admin
            </Badge>
          </li>
          <li>
            <Badge size={'big'} color="gray">
              zákaznická linka
            </Badge>
          </li>
          <li>
            <Badge size={'big'} color="gray">
              test role
            </Badge>
          </li>
          <li>
            <Badge size={'big'} color="gray">
              test role
            </Badge>
          </li>
        </ul>
      </div>
      <Hr />
      <div className="flex px-4 py-3">
        <Button
          color="secondary"
          icon={{
            name: 'logout',
            position: 'left',
            type: 'sharp',
          }}
          onClick={async () => {
            const { status } = await Api.logout()
            switch (status) {
              case 'success':
                router.push('/login')
              case 'error':
                setMessage({ type: 'error', text: 'Nebylo možné se odhlásit.' })
            }
          }}
          className="w-full"
        >
          Odhlásit se
        </Button>
        <Button
          color="secondary"
          icon={{
            name: page.layout.topbar?.userMenu.items[0].icon || 'settings',
            position: 'left',
          }}
          className="ml-2"
          onClick={() =>
            router.push(
              page.layout.topbar?.userMenu.items[0].route.url || '/settings'
            )
          }
        />
      </div>
    </div>
  )
}

export default React.memo(UserPupup)
