import HTTPTransport from '../utils/HTTPTransport'

const httpTransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats')

export default new class ChatAPI {
  getChats ():Promise<unknown> {
    return httpTransport.get('')
  }

  createChat (name:string):Promise<unknown> {
    return httpTransport.post('', { data: JSON.stringify({ title: name }) })
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