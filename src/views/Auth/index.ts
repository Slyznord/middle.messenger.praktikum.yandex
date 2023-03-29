// Views
import Auth from './auth'
import Home from '../Home'
import Registration from '../Registration'

// Components
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'

// utils
import { render } from '../../utils/renderDOM'
import { onSubmit } from '../../utils/formEvents'
import inputEvents from '../../utils/inputEvents'
import Validator from '../../utils/validator'
import validatorRulesName from '../../constants/validatorRulesName'

export default new Auth({
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
						render('#app', Registration)
					}
				}
			})
		],
		events: {
			submit: (event) => {
				onSubmit(event).then(() => {
					render('#app', Home)
				})
			}
		}
	}),
	wrapperClasses: 'wrapper wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'
})
