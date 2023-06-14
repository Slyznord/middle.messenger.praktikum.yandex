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

        const removeButton:HTMLElement | null = item.querySelector('.user-list__remove') || null
        const buttonID:string | null | undefined = removeButton?.getAttribute('data-user-id')

        if (!(removeButton && buttonID)) return

        removeButton.addEventListener('click', () => {
          ChatApi.deleteUserFromChat((this.props.chatId as number), parseInt(buttonID))
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
