import HTTPTransport from '../utils/HTTPTransport'
import { BASE_URL } from './constants'

const httpTransport = new HTTPTransport(`${BASE_URL}/chats`)

export default new class ChatAPI {
  getChats ():Promise<unknown> {
    return httpTransport.get('')
  }

  createChat (name:string):Promise<unknown> {
    return httpTransport.post('', { data: JSON.stringify({ title: name }) })
  }

  deleteChat (chatId:number):Promise<unknown> {
    return httpTransport.delete('', { data: JSON.stringify({ chatId }) })
  }

  getChatToken (id:number):Promise<unknown> {
    return httpTransport.post(`/token/${id}`)
  }

  getNewMessageCount (id:number):Promise<unknown> {
    return httpTransport.get(`/new/${id}`)
  }

  getChatUsers (id:number):Promise<unknown> {
    return httpTransport.get(`/${id}/users`)
  }

  deleteUserFromChat (chatId:number, userId:number):Promise<unknown> {
    return httpTransport.delete('/users', {
      data: JSON.stringify({
        users: [userId],
        chatId
      })
    })
  }

  addUser (userId:number, chatId:number):Promise<unknown> {
    return httpTransport.put('/users', {
      data: JSON.stringify({
        users: [userId],
        chatId
      })
    })
  }
}
