import BaseComponent from '../../utils/block/block'
import template from './chat.tmpl'
import { props } from './types'
import './chat.scss'

import Button from '../../components/button/button'
import ChatHeader from './components/header/header'
import User from '../user/user'
import UserList from '../userList/userList'
import AddUser from '../addUserModal/addUser'

import ChatApi from '../../api/chat.api'
import ChatController from '../../controllers/chat.controller'

export default class Chat extends BaseComponent {
  constructor(props:props = {}) {
    super('div', {
      ...props,
      header: new ChatHeader({
        wrapperClasses: 'w-full',
        user: new User({
          wrapperClasses: 'user',
          avatarClasses: 'user__avatar_sm',
        }),
        buttons: [
          new Button('div', {
            classes: 'button button_sm button_primary',
            value: 'Добавить пользователя',
            events: {
              click: () => {
                this.children.addUserModal.setProps({ chatId: this.props.activeDialog })
                this.children.addUserModal.show()
              }
            }
          }),
          new Button('div', {
            classes: 'button button_sm button_outlined',
            value: 'Список пользователей',
            events: {
              click: () => {
                ChatApi.getChatUsers(this.props.activeDialog as number)
                  .then((xhr:XMLHttpRequest) => {
                    if (!xhr.response) return

                    this.children.userList.setProps({
                      users: JSON.parse(xhr.response),
                      chatId: this.props.activeDialog
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })

                this.children.userList.show()
              }
            }
          }),
          new Button('div', {
            classes: 'button button_sm button_primary button_error',
            value: 'Удалить чат',
            events: {
              click: () => {
                ChatApi.deleteChat(this.props.activeDialog as number)
                  .then((xhr:XMLHttpRequest) => {
                    if (!xhr.response) return

                    this.setProps({ activeDialog: null })

                    ChatController.updateChats().catch(error => {
                      console.error(error)
                    })
                  })
                  .catch(error => {
                    console.error(error)
                  })
              }
            }
          })
        ]
      }),
      activeDialog: null,
      dialogs: [],
      userList: new UserList({
        wrapperClasses: 'w-full',
        users: []
      }),
      addUserModal: new AddUser({
        wrapperClasses: 'w-full'
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

    this.children.userList.hide()
    this.children.addUserModal.hide()
  }

  componentDidUpdate():boolean {
    const { activeDialog = null } = this.props as props

    if (!activeDialog) {
      this.children.header.hide()
      this.children.control.hide()
    } else {
      this.children.header.show()
      this.children.control.show()

      setTimeout(() => {
        const chat:HTMLElement | null = document.querySelector('.chat__dialog')

        if (chat === null) return

        chat.scrollTop = chat.scrollHeight
      }, 1500)
    }

    return true
  }

  render () {
    return this.compile(template, this.props)
  }
}
