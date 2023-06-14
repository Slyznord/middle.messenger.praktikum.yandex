import AuthApi, { signupParams, signinParams } from '../api/auth.api'
import UserApi, { profile }  from '../api/user.api'
import { router } from '../index'
import store, { StoreEvents } from '../utils/store'

const authAPI = new AuthApi()

class UserController {
  createUser ({ first_name, second_name, login, email, password, phone }:signupParams):void {
    authAPI.signup({ first_name, second_name, login, email, password, phone })
      .then((result:object) => {
        store.set('user.id', result['id' as keyof typeof result])
        router.go('/messenger')
      })
      .catch(error => alert(error))
  }

  login ({ login, password }:signinParams):void {
    authAPI.signin({ login, password })
      .then(() => {
        router.go('/messenger')
      })
      .catch(error => {
        const { reason } = JSON.parse(error)

        if (reason === 'User already in system') {
          router.go('/messenger')
        }
      })
  }

  logout ():void {
    authAPI.logout()
      .then(() => {
        router.go('/')
      })
      .catch(error => alert(error))
  }

  getUser ():Promise<unknown> {
    return new Promise((resolve, reject) => {
      authAPI.getUser()
        .then((result:object) => {
          const data = JSON.parse(result['response' as keyof typeof result])

          store.set('user', data)
          store.emit(StoreEvents.Updated)
          resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  updateUser (profile:profile):Promise<unknown> {
    return new Promise((resolve, reject) => {
      UserApi.updateProfile(profile)
        .then((xhr:XMLHttpRequest) => {
          store.set('user', JSON.parse(xhr.response))
          store.emit(StoreEvents.Updated)
          resolve('')
        })
        .catch(error => reject(error))
    })
  }

  updatePassword ({ old_password, new_password }: { old_password: string, new_password:string }):Promise<unknown> {
    return new Promise((resolve, reject) => {
      UserApi.updatePassword(old_password, new_password)
        .then((result) => {
          resolve(result)
        })
        .catch(error => reject(error))
    })
  }

  updateAvatar (file:File):Promise<unknown> {
    const formData = new FormData()
    formData.append('avatar', file)

    return UserApi.updateAvatar(formData)
  }
}

export default new UserController()
