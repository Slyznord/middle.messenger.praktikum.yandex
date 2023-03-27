// Views
import Auth from '../Auth/index'
import Home from '../Home'
import Registration from './registration'

// Components
import Button from '../../components/button/button'
import Form from '../../components/form/form'
import Input from '../../components/input/input'

// utils
import { render } from '../../utils/renderDOM'
import inputEvents from '../../utils/inputEvents'
import Validator from '../../utils/validator'

export default new Registration({
	wrapperClasses: 'wrapper wrapper_fade wrapper_px-lg wrapper_py-lg wrapper_my-auto wrapper_mx-auto wrapper_items-center rounded-md gap-12',
	form: new Form({
		wrapperClasses: 'form_col-controls',
		controls: [
			new Button('button', {
				wrapperClasses: 'button button_w-full button_md button_primary w-full',
				value: 'Зарегистрироваться'
			}),
			new Button('div', {
				wrapperClasses: 'w-full',
				classes: 'text-sm font-medium text-primary cursor-pointer',
				value: 'Войти',
				events: {
					click: () => {
						render('#app', Auth)
					}
				}
			})
		],
		fields: [
			new Input({
				validateRule: 'email',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Почта',
				name: 'email',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'login',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Логин',
				name: 'login',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'name',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Имя',
				name: 'first_name',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'name',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Фамилия',
				name: 'second_name',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'phone',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Телефон',
				name: 'phone',
				type: 'number',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'password',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Пароль',
				name: 'password',
				type: 'password',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: 'password',
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Пароль (еще раз)',
				name: 'password_confirm',
				type: 'password',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
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
	})
})
