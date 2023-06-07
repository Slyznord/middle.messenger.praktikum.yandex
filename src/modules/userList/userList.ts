import BaseComponent from '../../utils/block/block'
import template from './userList.tmp'
import './userList.scss'

import ChatApi from '../../api/chat.api'
import { Indexed } from '../../utils/types'

export default class UserList extends BaseComponent {
  constructor(props:Indexed) {
    super('div', props)
  }

  componentDidMount () {
    const closeButton:HTMLElement | null = this.element.querySelector('.modal__close')

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.hide()
      })
    }

    const users:HTMLElement[] = Array.from(document.querySelectorAll('.user-list__user') || [])

    if (users.length) {
      users.forEach((item:HTMLElement) => {
        if (item === null) return

        item.querySelector('.user-list__remove').addEventListener('click', () => {
          ChatApi.deleteUserFromChat(this.props.chatId, item.getAttribute('data-user-id'))
            .then((xhr:XMLHttpRequest) => {
              if (!xhr.response) return
              item.remove()
            })
            .catch(error => {
              console.error(error)
            })
        })
      })
    }
  }

  render () {
    return this.compile(template, this.props)
  }
}
