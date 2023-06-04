import HTTPTransport from '../utils/HTTPTransport'
import { BASE_URL } from './constants'

const httpTransport = new HTTPTransport(`${BASE_URL}/auth`)

export type signupParams = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type signinParams = {
  login: string,
  password: string
}

export default class AuthApi {
  signup ({ first_name, second_name, login, email, password, phone }:signupParams):Promise<unknown> {
    return httpTransport.post('/signup', { data: JSON.stringify({ first_name, second_name, login, email, password, phone }) })
  }

  signin ({ login, password }:signinParams):Promise<unknown> {
    return httpTransport.post('/signin', { data: JSON.stringify({ login, password }) })
  }

  logout ():Promise<unknown> {
    return httpTransport.post('/logout')
  }

  getUser ():Promise<unknown> {
    return httpTransport.get('/user')
  }
}
