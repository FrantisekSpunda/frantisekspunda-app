
import { useStore } from 'hooks'
import { MessageProps } from 'templates/Layout/MessageContainer'
import { newId } from 'utils';

const useMessage = () => {
  const { setStore } = useStore()

  const setMessage = (message: Partial<MessageProps>) => {
    const id = message.id || Number(newId().split('-')[1])

    setStore('message', (prev) => [...prev, {
      id: id,
      type: message.type || 'info',
      text: message.text || 'Nebyl zadán žádný text'
    }])
  }

  return {
    setMessage
  }
}

export default useMessage