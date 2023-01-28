import React from 'react'
import { cn } from 'utils'
import MessageContainer from './MessageContainer'
import ModalContainer from './ModalContainer'
import TabMenu from './TabMenu'
import Topbar from './Topbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={cn('w-screen h-screen overflow-hidden flex')}>
      <TabMenu />
      <ModalContainer />
      <MessageContainer />

      <div className="w-full h-full overflow-auto text-white bg-main scrollbar-styled">
        <Topbar />

        <main id="main">{children}</main>
      </div>
    </div>
  )
}

export default React.memo(Layout)
