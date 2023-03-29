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
import { onSubmit } from '../../utils/formEvents'
import inputEvents from '../../utils/inputEvents'
import validatorRulesName from '../../constants/validatorRulesName'
import Validator from '../../utils/validator'
import ValidatorRulesName from "../../constants/validatorRulesName";

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
				validateRule: validatorRulesName.EMAIL,
				error: Validator.getErrorMessage(validatorRulesName.EMAIL),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Почта',
				name: 'email',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.LOGIN,
				error: Validator.getErrorMessage(validatorRulesName.LOGIN),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Логин',
				name: 'login',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.NAME,
				error: Validator.getErrorMessage(validatorRulesName.NAME),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Имя',
				name: 'first_name',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.NAME,
				error: Validator.getErrorMessage(validatorRulesName.NAME),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Фамилия',
				name: 'second_name',
				type: 'text',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.PHONE,
				error: Validator.getErrorMessage(validatorRulesName.PHONE),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Телефон',
				name: 'phone',
				type: 'number',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.PASSWORD,
				error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
				wrapperClasses: 'flex flex-col gap-1',
				label: 'Пароль',
				name: 'password',
				type: 'password',
				classes: 'w-full input input_fade input_w-md',
				events: inputEvents
			}),
			new Input({
				validateRule: validatorRulesName.PASSWORD,
				error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
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
				onSubmit(event).then(() => {
					render('#app', Home)
				})
			}
		}
	})
})
