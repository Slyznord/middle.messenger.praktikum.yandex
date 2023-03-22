import BaseComponent from '../../block/block'
import template from './home.tmpl'

import Chat from '../../modules/Chat/chat'
import Sidebar from '../../modules/Sidebar/sidebar'

class Home extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}

export default new Home({
  parentClasses: 'flex flex-row gap-8 h-full w-full',
  sidebar: Sidebar,
  chat: new Chat({
    parentClasses: 'chat',
    content: '<span class="text-base font-medium text-secondary my-auto mx-auto">Выберите чат чтобы отправить сообщение</span>'
  })
})