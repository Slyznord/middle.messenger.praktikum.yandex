import HTTPTransport from '../utils/HTTPTransport'

const httpTransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats')

export default new class ChatAPI {
  getChats ():Promise<unknown> {
    return httpTransport.get('')
  }

  createChat (name:string):Promise<unknown> {
    return httpTransport.post('', { data: JSON.stringify({ title: name }) })
  }
}