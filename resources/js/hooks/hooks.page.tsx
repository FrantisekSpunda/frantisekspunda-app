import React from 'react'
import { PageBuilderProps } from 'types'
import { createContext, ReactNode, useContext, useState } from 'react'

// ts for ServicePage
type initialStateKeys = keyof PageBuilderProps
type initialStateValues = PageBuilderProps[initialStateKeys]
interface PageContextProps {
  page: PageBuilderProps
  // setPage: (prop: initialStateKeys, value: initialStateValues) => void
  // withPage: (dispatch: (prev: PageBuilderProps) => PageBuilderProps) => void
}

const PageContext = createContext<PageContextProps>({
  page: {
    title: '401',
    description: '',
  },
})

export const Page: React.FC<{
  children: ReactNode
  store: PageBuilderProps
}> = ({ children, store }) => {
  const [page, setState] = useState(store)

  const setPage = (prop: initialStateKeys, value: initialStateValues) => {
    setState((prev) => ({ ...prev, [prop]: value }))
  }

  const withPage = (dispatch: (prev: PageBuilderProps) => PageBuilderProps) => {
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
