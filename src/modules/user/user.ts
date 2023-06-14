import BaseComponent from '../../utils/block/block'
import template from './user.tmpl'
import './user.scss'

import Input from '../../components/input/input'

import store, { StoreEvents } from '../../utils/store'
import userController from '../../controllers/user.controller'
import { Indexed } from '../../utils/types'
import connect from '../../utils/connect'

class User extends BaseComponent {
  constructor(props:Indexed = {}) {
    const input = new Input({
      events: {
        change: (event: Event) => {
          const { target } = event
          const files = (target as HTMLInputElement).files

          if (!files) return

          userController.updateAvatar(files[0])
            .then((xhr: XMLHttpRequest) => {
              const user = JSON.parse(xhr.response)

              store.set('user.avatar', user.avatar)
              store.emit(StoreEvents.Updated)
            })
            .catch(error => {
              console.error(error)
            })
        }
      },
      name: 'file',
      type: 'file',
      wrapperClasses: 'hidden'
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

export default connect((User as typeof BaseComponent), mapUserToProps)
