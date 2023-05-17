import BaseComponent from '../../utils/block/block'
import template from './chat.tmpl'
import { props } from './types'
import './chat.scss'

import ChatControl from './components/control/control'
import ChatHeader from './components/header/header'
import Input from '../../components/input/input'
import User from '../user/user'

export default class Chat extends BaseComponent {
  constructor(props:props) {
    super('div', {
      ...props,
      activeDialog: null,
      control: new ChatControl({
        input: new Input({
          wrapperClasses: 'w-full',
          type: 'text',
          name: 'message',
          classes: 'w-full input input_message',
          placeholder: 'Сообщение...'
        })
      }),
      dialogs: [],
      header: new ChatHeader({
        wrapperClasses: 'w-full',
        user: new User({
          wrapperClasses: 'user',
          avatarClasses: 'user__avatar_sm',
        })
      }),
      wrapperClasses: 'chat'
    })
  }

  componentDidMount() {
    const { activeDialog = null } = this.props as props

    if (!activeDialog) {
      this.children.header.hide()
      this.children.control.hide()
    }
  }

  componentDidUpdate():boolean {
    const { activeDialog = null } = this.props as props

    if (!activeDialog) {
      this.children.header.hide()
      this.children.control.hide()
    } else {
      this.children.header.show()
      this.children.control.show()
    }

    return true
  }

  render () {
    return this.compile(template, this.props)
  }
}
