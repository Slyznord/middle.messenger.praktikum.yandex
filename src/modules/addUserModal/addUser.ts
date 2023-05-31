import BaseComponent from '../../utils/block/block'
import template from './addUser.tmpl'
import './addUser.scss'

import Input from '../../components/input/input'

import ChatApi from '../../api/chat.api'
import UserApi from '../../api/user.api'

export default class UserList extends BaseComponent {
  constructor(props:object) {
    super('div', {
      ...props,
      searchUser: new Input({
        wrapperClasses: 'w-full',
        type: 'text',
        name: 'user',
        classes: 'w-full input input_message',
        placeholder: 'Введите имя пользователя',
        events: {
          input: (event:Event) => {
            const { target } = event

            if ((target as HTMLInputElement).value.length > 3) {
              UserApi.searchUserByLogin((target as HTMLInputElement).value).then((xhr:XMLHttpRequest) => {
                if (!xhr.response) return

                const response = JSON.parse(xhr.response)
                this.setProps({ users: response })

                const users = Array.from(document.querySelectorAll('.add-user__item') || [])

                if (!users.length) return

                users.forEach((user:HTMLElement) => {
                  user.querySelector('.add-user__icon')?.addEventListener('click', () => {
                    const userId:string | null = user.getAttribute('data-user-id')

                    if (userId === null) return

                    ChatApi.addUser(parseInt(userId), this.props.chatId).then((xhr:XMLHttpRequest) => {
                      if (!xhr.response) return
                      console.log(xhr.response)
                    })
                  })
                })
              })
            }
          }
        }
      })
    })
  }

  componentDidMount() {
    const closeButton:HTMLElement | null = this.element.querySelector('.modal__close')

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.hide()
      })
    }
  }

  render () {
    return this.compile(template, this.props)
  }
}
