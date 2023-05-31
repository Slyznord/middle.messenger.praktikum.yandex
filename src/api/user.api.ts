import HTTPTransport from '../utils/HTTPTransport'

export type profile = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

const httpTransport = new HTTPTransport('https://ya-praktikum.tech/api/v2/user')

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