import React from 'react'

const tabMenu = [
  {
    name: 'Přeskočit na hlavní obsah',
    id: 'main',
  },
  {
    name: 'Přeskočit do menu',
    id: 'navbar',
  },
]

const TabMenu: React.FC = () => {
  const navigate = (id?: string) => {
    const container = document.getElementById(id || '') || document.body

    const focusable = container.querySelectorAll(
      'button, [href], input, [tabindex="0"]'
    )

    const first = focusable[0] as HTMLElement
    first.focus()
  }

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement

    navigate(target.id)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement

    e.key === 'Enter' && navigate(target.dataset.id)
  }

  return (
    <div className="fixed flex-col h-screen left-5 top-5 z-[100] [&>a]:block [&>a]:bg-white [&>a]:p-2 [&>a]:underline [&>a]:text-blue-60 [&>a]:outline-gray-60 focus:[&>a]:border-dotted [&>a]:pointer-events-none [&>a]:opacity-0 focus:[&>a]:opacity-100 focus:[&>a]:pointer-events-auto pointer-events-none focus-within:pointer-events-auto ">
      {tabMenu.map((item, key) => (
        <a
          key={key}
          data-id={item.id}
          tabIndex={0}
          onClick={onClick}
          onKeyDown={onKeyDown}
        >
          {item.name}
        </a>
      ))}
    </div>
  )
}

export default TabMenu
