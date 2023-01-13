import React from 'react'
import { useStore } from 'hooks'
import { cn } from 'utils'

const ModalContainer: React.FC = () => {
  const { store, setStore } = useStore()

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget === e.target &&
      setStore('modal', (prev) => ({ ...prev, open: false }))
  }

  return (
    <div
      className={cn(
        'absolute w-full h-full bg-black bg-opacity-10 top-0 left-0 z-modal backdrop-blur-sm transition-opacity',
        !store.modal?.open && 'opacity-0 pointer-events-none'
      )}
      onClick={onClick}
    >
      <menu className="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded shadow-md top-1/2 left-1/2">
        {store.modal.component}
      </menu>
    </div>
  )
}

export default React.memo(ModalContainer)
