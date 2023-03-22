import BaseComponent from '../../block/block'
import template from './auth.tmpl'

import Button from '../../components/Button/button'
import Home from '../Home/home'
import Input from '../../components/Input/input'

import { render } from '../../utils/renderDOM'

class Auth extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}

export default new Auth({
  button: new Button({
    value: 'Войти',
    parentClasses: 'button button_w-full button_md button_primary',
    events: {
      click: () => {
        render('#app', Home)
      }
    }
  }),
  login: new Input({
    type: 'text',
    name: 'login',
    label: 'Логин',
    parentClasses: 'flex flex-col items-start gap-1',
    classes: 'input input_w-md input_fade'
  }),
  password: new Input({
    type: 'password',
    name: 'password',
    label: 'Пароль',
    parentClasses: 'flex flex-col items-start gap-1',
    classes: 'input input_w-md input_fade'
  }),
  parentClasses: 'wrapper wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'
})