import HTTPTransport from '../utils/HTTPTransport'
import { BASE_URL } from './constants'

export type profile = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

const httpTransport = new HTTPTransport(`${BASE_URL}/user`)

export default new class UserApi {
  updateProfile (profile:profile):Promise<unknown> {
    return httpTransport.put('/profile', { data: JSON.stringify(profile) })
  }

  updateAvatar (file:FormData):Promise<unknown> {
    return httpTransport.put('/profile/avatar', { data: file, isJSON: false })
  }

  updatePassword (oldPassword:string, newPassword:string):Promise<unknown> {
    return httpTransport.put('/password', { data: JSON.stringify({ oldPassword, newPassword }) })
  }

  searchUserByLogin (login:string):Promise<unknown> {
    return httpTransport.post('/search', {
      data: JSON.stringify({ login })
    })
  }
}