import { Hr, Icon, Tooltip } from 'app/components'
import { usePage, useStore } from 'app/hooks'
import { cn } from 'app/utils'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { PageBuilderProps_layout_navigation } from 'app/templates/Page/types'

const SidebarList: React.FC = () => {
  const { page } = usePage()

  return (
    <ul className={cn('h-full px-4')}>
      {page.layout.navigation?.map((item, i) => (
        <div key={i} className="">
          <ul>
            {item.label === '#' ? (
              <Hr className="my-3 h-[2px] bg-white/10 transition-[margin]" />
            ) : null}
            {item.label && item.label !== '#' ? (
              <span className="text-base uppercase text-gray-60">
                {item.label}
              </span>
            ) : null}
            {item.items?.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </ul>
        </div>
      ))}
    </ul>
  )
}

// base classes for item with icon
const itemClasses =
  'flex items-center w-full h-10 text-gray-60 text-button whitespace-nowrap cursor-pointer select-none hover:bg-background-inverse-hover/5 active:bg-background-inverse-active/10 transition-[padding] rounded  outline-none focus-visible:outline-border-active outline-offset-1'

const Item: React.FC<{
  item: PageBuilderProps_layout_navigation[number]
}> = ({ item }) => {
  const { store } = useStore()
  const { page } = usePage()
  const { push } = useRouter()
  const openInitial = React.useMemo(
    () =>
      !!item.children?.find((child) => child.route.name === page.route?.name),
    [item.children, page.route?.name]
  )

  const [state, setState] = React.useState({
    open: store.sidebarOpened ? openInitial : false,
    focused: false,
  })

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setState((prev) => ({ open: prev.open, focused: true }))
  }

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    e.relatedTarget && e.currentTarget.contains(e.relatedTarget)
      ? setState({ open: true, focused: true })
      : setState({ open: false, focused: false })
  }

  const isSelected = useMemo(
    () =>
      item.route.name === page.route?.name
        ? true
        : !store.sidebarOpened &&
          item.children?.find((item) => item.route.name === page.route?.name)
        ? true
        : false,
    [item.route.name, item.children, page.route?.name, store.sidebarOpened]
  )

  // React.useEffect(() => {
  //   item.children && setState(openInitial)
  // }, [item, store.sidebarOpened])

  return (
    <div
      onBlur={(e) => item.children?.length && !store.sidebarOpened && onBlur(e)}
      onFocus={onFocus}
    >
      <Tooltip
        position="right"
        tooltipClassName={cn(store.sidebarOpened ? 'hidden' : '', 'delay-500')}
        text={item.label}
      >
        <button
          onClick={
            item.children?.length
              ? () => setState((prev) => ({ ...prev, open: !prev.open }))
              : () => push(item.route.url)
          }
          className={cn(
            'relative',
            isSelected && 'bg-background-inverse-active/10',
            store.sidebarOpened
              ? 'px-3 [&>span]:opacity-100 [&>span]:delay-200'
              : 'px-2.5 [&>span]:opacity-0',
            itemClasses
          )}
        >
          <Icon
            iconClassName={cn(isSelected ? 'text-primary-60' : 'text-gray-70')}
            className="pointer-events-none !w-5 !h-5 mr-2"
            type={item.icon.type}
          >
            {item.icon.name || 'assessment'}
          </Icon>
          <span
            className={cn(
              'transition-[opacity] pointer-events-none z-10',
              isSelected ? 'text-primary-60' : 'text-gray-90'
            )}
          >
            {item.label}
          </span>
          {item.children?.length ? (
            <Icon
              className={cn(
                store.sidebarOpened ? 'opacity-100 delay-200' : 'opacity-0',
                'ml-auto pointer-events-none transition-opacity'
              )}
              iconClassName="text-gray-70"
            >
              {state.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            </Icon>
          ) : null}
        </button>
      </Tooltip>
      <div
        className={cn(
          !store.sidebarOpened
            ? cn(
                'h-screen overflow-hidden absolute top-0 w-44 left-[calc(100%_+_1px)] opacity-0 pointer-events-none bg-white -z-100 transition-all',
                state.open &&
                  '!w-60 shadow-[16px_0_16px_-16px] path shadow-black_12 opacity-100 pointer-events-auto'
              )
            : 'ml-3'
        )}
      >
        {!store.sidebarOpened && (
          <p className="p-3 mt-6 border-b border-black_8">{item.label}</p>
        )}

        {!!item.children && (
          <ItemList list={item.children} opened={state.open} />
        )}
      </div>
    </div>
  )
}

const ItemList: React.FC<{
  list: PageBuilderProps_layout_navigation
  opened: boolean
}> = ({ list, opened }) => {
  const { store } = useStore()
  const { page } = usePage()
  const { push } = useRouter()
  const openInitial = React.useMemo(
    () => list.map((item) => item.route.name === page.route?.name),
    [list, page.route?.name]
  )
  const [open, setOpen] = React.useState(openInitial)

  // React.useEffect(() => {
  //   setOpen(openInitial)
  // }, [opened, openInitial])

  return (
    <ul
      className={cn(
        'overflow-hidden',
        opened ? 'block' : 'hidden',
        store.sidebarOpened ? '' : 'pl-6'
      )}
    >
      {list.map((item, i) => (
        <li key={i}>
          <button
            onClick={
              item.route.url
                ? () => item.route.url && push(item.route.url)
                : item.children
                ? () =>
                    setOpen((prev) =>
                      prev.map((value, j) => (j !== i ? false : !value))
                    )
                : () => {}
            }
            className={cn(
              itemClasses,
              'justify-between rounded',
              item.route.name === page.route?.name &&
                'bg-background-inverse-active/10 text-primary-60',
              store.sidebarOpened ? 'pr-9 pl-5' : 'p-4 w-full'
            )}
          >
            {item.label}
            {item.children?.length ? (
              <Icon
                className={cn('opacity-100 pointer-events-none')}
                iconClassName="text-disabled"
              >
                {open[i] ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
              </Icon>
            ) : null}
          </button>
          {!!item.children && (
            <ItemList list={item.children} opened={open[i]} />
          )}
        </li>
      ))}
    </ul>
  )
}

export default React.memo(SidebarList)
