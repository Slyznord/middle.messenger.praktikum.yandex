import BaseComponent from '../../utils/block/block'
import template from './sidebar.tmpl'
import './sidebar.scss';

import Button from '../../components/button/button'
import Container from '../../layouts/container/container'
import Dialog from './components/dialog/dialog'
import Input from '../../components/input/input'
import User from '../user/user'

import ChatApi from '../../api/chat.api'
import { router } from "../../index"

export default class Sidebar extends BaseComponent {
  constructor(props:any) {
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
              change: (event:any) => {
                this.setProps({ chatName: event.target.value })
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
                })
              }
            }
          })
        ]
      }),
      wrapperClasses: 'wrapper menu gap-10',
      user: new User({
        events: {
          click: () => {
            router.go('/settings')
          }
        },
        wrapperClasses: 'user'
      })
    })

    ChatApi.getChats().then((xhr:XMLHttpRequest) => {
      if (!xhr.response) return

      this.children.dialogs = JSON.parse(xhr.response).map((item:any) => {
        return new Dialog({
          wrapperClasses: 'dialog',
          avatar: item.avatar,
          name: item.title,
          message: item.last_message,
          events: {
            click: () => {
              console.log(item.id)
            }
          }
        })
      })

      this.eventBus().emit('flow:components-did-update')
    })

    this.children.chatParams.hide()
  }

  render () {
    return this.compile(template, this.props)
  }
}
