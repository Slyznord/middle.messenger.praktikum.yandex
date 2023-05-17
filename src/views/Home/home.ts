// Components and modules
import Chat from '../../modules/chat/chat'
import Sidebar from '../../modules/sidebar/sidebar'

import BaseComponent from '../../utils/block/block'
import template from './home.tmpl'
import connect from '../../utils/connect'
import userController from '../../controllers/user.controller'

class Home extends BaseComponent {
  constructor() {
    super('div', {
      wrapperClasses: 'flex flex-row gap-8 h-full w-full',
      chat: new Chat({}),
      sidebar: new Sidebar({})
    })

    userController.getUser()
  }

  render () {
    return this.compile(template, this.props)
  }
}

function mapUserToProps(state:any) {
  return {
    user: state.user
  }
}

export default connect(Home, mapUserToProps)