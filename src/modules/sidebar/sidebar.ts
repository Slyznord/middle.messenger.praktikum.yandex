import BaseComponent from '../../utils/block/block'
import template from './sidebar.tmpl'
import './sidebar.scss';

import Button from '../../components/button/button'
import Container from '../../layouts/container/container'
import Dialog from './components/dialog/dialog'
import Input from '../../components/input/input'
import User from '../user/user'

import ChatApi from '../../api/chat.api'
import { router } from '../../index'

type message = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  }
}

export default class Sidebar extends BaseComponent {
  constructor(props:object = {}) {
    super('div', {
      ...props,
      control: new Button('div', {
        classes: 'button button_md button_primary',
        value: 'Создать чат',
        events: {
          click: () => {
            this.children.chatParams.show()
          }
        }
      }),
      chatParams: new Container({
        chatName: '',
        classes: 'flex-col w-full gap-2',
        content: [
          new Input({
            wrapperClasses: 'w-full',
            type: 'text',
            name: 'chat-name',
            classes: 'search__input input_bg-secondary w-full',
            placeholder: 'Название чата',
            events: {
              change: (event:Event) => {
                const { target } = event

                this.setProps({ chatName: (target as HTMLInputElement).value })
              }
            }
          }),
          new Button('div', {
            classes: 'button button_md button_outlined',
            value: 'Создать',
            events: {
              click: () => {
                ChatApi.createChat(this.props.chatName).then(() => {
                  this.children.chatParams.hide()
                  this.updateChats()
                })
              }
            }
          })
        ]
      }),
      wrapperClasses: 'wrapper menu gap-10',
      user: new User({
        events: {
          click: (event:Event) => {
            event.preventDefault()
            router.go('/settings')
          }
        },
        wrapperClasses: 'user'
      })
    })

    this.updateChats()
    this.children.chatParams.hide()
  }

  updateChats () {
    ChatApi.getChats().then((xhr:XMLHttpRequest) => {
      if (!xhr.response) return

      this.children.dialogs = JSON.parse(xhr.response).map((item:message) => {
        let time = undefined

        if (item.last_message?.time) {
          const date = new Date(item.last_message.time)
          time = `${date.getHours()}:${date.getMinutes()}`
        }

        return new Dialog({
          wrapperClasses: 'dialog',
          avatar: item.avatar,
          name: item.title,
          message: item.last_message?.content,
          time,
          unread_count: item.unread_count,
          events: {
            click: () => {
              this.props.eventBus.emit('update:chat', item.id)
            }
          }
        })
      })

      this.eventBus().emit('flow:components-did-update')
    })
  }

  render () {
    return this.compile(template, this.props)
  }
}
