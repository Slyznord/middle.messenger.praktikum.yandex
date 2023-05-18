import BaseComponent from '../../utils/block/block'
import template from './user.tmpl'
import './user.scss'

import Input from '../../components/input/input'
import store, { StoreEvents } from '../../utils/store'
import userController from '../../controllers/user.controller'

export default class User extends BaseComponent {
  constructor(props:object) {
    const input = new Input({
      type: 'file',
      name: 'file',
      wrapperClasses: 'hidden',
      events: {
        change: (event:any) => {
          userController.updateAvatar(event.target.files[0]).then((xhr:XMLHttpRequest) => {
            const user = JSON.parse(xhr.response)

            store.set('user.avatar', user.avatar)
            store.emit(StoreEvents.Updated)
          })
        }
      }
    })

    super('div', {
      ...props,
      input: input
    })

    store.on(StoreEvents.Updated, () => {
      const state:any = store.getState()

      this.setProps({
        username: state.user.display_name || `${state.user.first_name} ${state.user.second_name}`,
        avatar: state.user.avatar
      })
    })
  }

  render () {
    return this.compile(template, this.props)
  }
}
