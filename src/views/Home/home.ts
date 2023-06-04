// Components and modules
import Chat from '../../modules/chat/chat'
import ChatControl from '../../modules/chat/components/control/control'
import Input from '../../components/input/input'
import Sidebar from '../../modules/sidebar/sidebar'

import BaseComponent from '../../utils/block/block'
import template from './home.tmpl'
import connect from '../../utils/connect'
import userController from '../../controllers/user.controller'
import EventBus from '../../utils/event-bus'
import store from '../../utils/store'
import { Indexed } from '../../utils/types'

import ChatApi from '../../api/chat.api'
import Socket from '../../api/socket.api'

class Home extends BaseComponent {
  private socket:Socket

  constructor() {
    const eventBus = new EventBus()

    eventBus.on('update:chat', (chatID:number):void => {
      ChatApi.getChatToken(chatID)
        .then((xhr:XMLHttpRequest) => {
          if (!xhr.response) return
          if (this.socket) {
            this.socket.close()
          }

          const token = JSON.parse(xhr.response).token
          const state:Indexed = store.getState()
          this.socket = new Socket(`wss://ya-praktikum.tech/ws/chats/${state.user.id}/${chatID}/${token}`)

          this.socket.eventBus().on('flow:socket-did-open', () => {
            ChatApi.getNewMessageCount(chatID)
              .then((xhr:XMLHttpRequest) => {
                if (!xhr.response) return

                const { unread_count } = JSON.parse(xhr.response)

                this.socket.send({
                  content: `${unread_count}`,
                  type: 'get old'
                })
              })
              .catch(error => {
                throw new Error(error)
              })
          })

          this.socket.eventBus().on('flow:socket-get-message', (data:object) => {
            if (!Array.isArray(data)) return

            const sortedMessages = data.sort((a:Indexed<string>, b:Indexed<string>):number => {
              return new Date(a.time).getTime() - new Date(b.time).getTime()
            })
            const mappedDialogs = sortedMessages.map((item:Indexed<string>) => {
              const date = new Date(item.time)
              const getFormattedDate = (date:number) => date.toString().length > 1 ? date : `0${date}`

              item.classes = item.user_id === state.user.id ? 'chat__message_receiver' : 'chat__message_sender'
              item.time = `${getFormattedDate(date.getHours())}:${getFormattedDate(date.getMinutes())} ${getFormattedDate(date.getDate())}.${getFormattedDate(date.getMonth() + 1)}.${date.getFullYear()}`

              return item
            })

            this.children.chat.setProps({
              dialogs: mappedDialogs,
              activeDialog: chatID
            })
          })
        })
        .catch(error => {
          throw new Error(error)
        })
    })

    super('div', {
      wrapperClasses: 'flex flex-row gap-8 h-full w-full',
      chat: new Chat({
        control: new ChatControl({
          input: new Input({
            wrapperClasses: 'w-full',
            type: 'text',
            name: 'message',
            classes: 'w-full input input_message',
            placeholder: 'Сообщение...'
          }),
          events: {
            submit: (event:Event) => {
              event.preventDefault()

              const { target } = event

              if (target === null) return

              const input = (target as HTMLElement).querySelector('input')

              if (input === null) return
              if (input.value.trim() === '') {
                alert('Нельзя отправить пустое сообщение')
                return
              }

              this.socket.send({
                type: 'message',
                content: input?.value
              })

              this.socket.send({
                type: 'get old',
                content: '0'
              });

              input.value = ''
            }
          }
        })
      }),
      sidebar: new Sidebar({
        eventBus
      })
    })

    userController.getUser()
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

export default connect(Home, mapUserToProps)