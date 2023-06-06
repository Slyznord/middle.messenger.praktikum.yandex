import BaseComponent from '../../utils/block/block'
import template from './user.tmpl'
import './user.scss'

import Input from '../../components/input/input'

import store, { StoreEvents } from '../../utils/store'
import userController from '../../controllers/user.controller'
import { Indexed } from '../../utils/types'
import connect from '../../utils/connect'

class User extends BaseComponent {
  constructor(props:object = {}) {
    const input = new Input({
      type: 'file',
      name: 'file',
      wrapperClasses: 'hidden',
      events: {
        change: (event:Event) => {
          const { target } = event

          if (target === null) return

          userController.updateAvatar((target as HTMLInputElement).files[0])
            .then((xhr:XMLHttpRequest) => {
              const user = JSON.parse(xhr.response)

              store.set('user.avatar', user.avatar)
              store.emit(StoreEvents.Updated)
            })
            .catch(error => {
              console.error(error)
            })
        }
      }
    })

    super('div', {
      ...props,
      input
    })
  }

  render () {
    return this.compile(template, this.props)
  }
}

function mapUserToProps(state:Indexed) {
  return {
    user: state.user
  }
}

export default connect(User, mapUserToProps)
