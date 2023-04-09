// Components
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'

// utils
import BaseComponent from '../../utils/block/block'
import { onSubmit } from '../../utils/formEvents'
import inputEvents from '../../utils/inputEvents'
import Validator from '../../utils/validator'
import validatorRulesName from '../../constants/validatorRulesName'
import { router } from '../../index'
import template from './auth.tmpl'

export default class Auth extends BaseComponent {
  constructor() {
    super('div', {
      classes: 'form_col-controls',
      form: new Form({
        classes: 'form_col-controls',
        fields: [
          new Input({
            validateRule: validatorRulesName.LOGIN,
            wrapperClasses: 'flex flex-col items-start gap-1',
            type: 'text',
            name: 'login',
            label: 'Логин',
            classes: 'input input_w-md input_fade',
            error: Validator.getErrorMessage(validatorRulesName.LOGIN),
            events: inputEvents
          }),
          new Input({
            validateRule: validatorRulesName.NOT_EMPTY,
            wrapperClasses: 'flex flex-col items-start gap-1',
            type: 'password',
            name: 'password',
            label: 'Пароль',
            classes: 'input input_w-md input_fade',
            error: Validator.getErrorMessage(validatorRulesName.NOT_EMPTY),
            events: inputEvents
          })
        ],
        controls: [
          new Button('button', {
            wrapperClasses: 'button button_w-full button_md button_primary',
            value: 'Войти'
          }),
          new Button('div', {
            wrapperClasses: 'button text-sm font-medium text-primary cursor-pointer',
            value: 'Нет аккаунта?',
            events: {
              click: () => {
                router.go('/sign-up')
              }
            }
          })
        ],
        events: {
          submit: (event:Event) => {
            onSubmit(event).then(() => {
              router.go('/messenger')
            })
          }
        }
      }),
      wrapperClasses: 'wrapper wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'
    })
  }

  render () {
    return this.compile(template, this.props)
  }
}
