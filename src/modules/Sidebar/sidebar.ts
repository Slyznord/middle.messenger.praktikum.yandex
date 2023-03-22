import BaseComponent from '../../block/block'
import template from './sidebar.tmpl'
import './sidebar.scss';

import Dialog from './components/Dialog/dialog'
import Input from '../../components/Input/input'
import User from './components/User/user'

class Sidebar extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}

export default new Sidebar({
  dialogs: [
    new Dialog({
      parentClasses: 'dialog',
      name: 'Misha',
      message: 'Message',
      time: '12:00'
    }),
    new Dialog({
      parentClasses: 'dialog',
      name: 'Misha',
      message: 'Message',
      time: '12:00'
    })
  ],
  parentClasses: 'wrapper menu gap-10',
  search: new Input({
    parentClasses: 'w-full',
    type: 'text',
    name: 'search',
    classes: 'search__input input_bg-secondary w-full',
    placeholder: 'Поиск'
  }),
  user: new User({
    parentClasses: 'user'
  })
})