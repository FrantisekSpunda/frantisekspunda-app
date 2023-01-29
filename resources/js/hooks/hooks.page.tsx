import React from 'react'
import { PageProps } from 'types'
import { createContext, ReactNode, useContext, useState } from 'react'

// ts for ServicePage
type initialStateKeys = keyof PageProps
type initialStateValues = PageProps[initialStateKeys]
interface PageContextProps {
  page: PageProps
  // setPage: (prop: initialStateKeys, value: initialStateValues) => void
  // withPage: (dispatch: (prev: PageProps) => PageProps) => void
}

const PageContext = createContext<PageContextProps>({
  page: {
    title: '401',
    description: '',
    widgets: [],
  },
})

export const Page: React.FC<{
  children: ReactNode
  store: PageProps
}> = ({ children, store }) => {
  const [page, setState] = useState(store)

  const setPage = (prop: initialStateKeys, value: initialStateValues) => {
    setState((prev) => ({ ...prev, [prop]: value }))
  }

  const withPage = (dispatch: (prev: PageProps) => PageProps) => {
    setState(dispatch)
  }

  return (
    <PageContext.Provider value={{ page: store }}>
      {children}
    </PageContext.Provider>
  )
}

/**
 * * Stores page data to access through whole application
 * @returns \{ page, setPage, withPage }
 */
export const usePage = (): PageContextProps => useContext(PageContext)
