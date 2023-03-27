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
import inputEvents from '../../utils/inputEvents'
import Validator from '../../utils/validator'

export default new Auth({
	form: new Form({
		classes: 'form_col-controls',
		fields: [
			new Input({
				validateRule: 'login',
				wrapperClasses: 'flex flex-col items-start gap-1',
				type: 'text',
				name: 'login',
				label: 'Логин',
				classes: 'input input_w-md input_fade',
				events: inputEvents
			}),
			new Input({
				validateRule: 'notEmpty',
				wrapperClasses: 'flex flex-col items-start gap-1',
				type: 'password',
				name: 'password',
				label: 'Пароль',
				classes: 'input input_w-md input_fade',
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
				event.preventDefault()

				const inputs = event.target.querySelectorAll('input')
				const preparedData = Array.from(inputs).reduce((obj:object, item:HTMLInputElement) => {
					const key:string = item.getAttribute('name') || ''
					return { ...obj, [key]: item.value }
				}, {})

				if (!Validator.validateAll(inputs)) {
					const invalidInputs = Validator.getInvalidInputs(inputs)
					invalidInputs.forEach(item => item.classList.add('input_error'))
				} else {
					inputs.forEach(item => item.classList.remove('input_error'))
					console.log(preparedData)
					render('#app', Home)
				}
			}
		}
	}),
	wrapperClasses: 'wrapper wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12'
})
