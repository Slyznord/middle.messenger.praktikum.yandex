import ChatApi from '../api/chat.api'
import store, { StoreEvents } from '../utils/store'

export default new class ChatController {
  updateChats () {
    return new Promise((resolve, reject) => {
      ChatApi.getChats()
        .then((xhr:XMLHttpRequest) => {
          if (!xhr.response) return

          const chats = JSON.parse(xhr.response)

          store.set('chats', chats)
          store.emit(StoreEvents.Updated)

          resolve(chats)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
