import React from 'react'
import { useStore } from 'hooks'
import { cn } from 'utils'
import MessageContainer from './MessageContainer'
import ModalContainer from './ModalContainer'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar'
import TabMenu from './TabMenu'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { store } = useStore()

  return (
    <div
      className={cn(
        'w-screen h-screen overflow-hidden flex',
        store.darkMode && 'dark'
      )}
    >
      <TabMenu />
      <ModalContainer />
      <MessageContainer />
      {/* {!!page.layout?.navigation && <Sidebar />} */}

      <div
        className={cn(
          store.sidebarOpened
            ? 'w-[calc(100vw_-_16rem)]'
            : 'w-[calc(100vw_-_4rem)]',
          'h-screen transition-[width] duration-300 text-black dark:text-white'
        )}
      >
        {/* {!!page.layout?.topbar && <Navbar />} */}

        <main
          id="main"
          className="w-full h-full overflow-auto bg-main scrollbar-styled"
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default React.memo(Layout)
