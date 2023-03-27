// Views
import Auth from '../Auth'
import Settings from './settings'

// Components, modules and layouts
import Button from '../../components/button/button'
import Container from '../../layouts/container/container'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import Text from '../../components/text/text'
import User from '../../modules/user/user'

// utils
import { render } from '../../utils/renderDOM'
import inputEvents from '../../utils/inputEvents'
import Validator from '../../utils/validator'
import Home from "../Home";

const buttons = {
	changeData: new Button('div', {
		classes: 'button_md button_primary',
		value: 'Изменить данные',
		events: {
			click: () => {
				settings.setProps({ isEditing: true })

				buttons.changeData.hide()
				buttons.changePassword.hide()
				buttons.logout.hide()
				buttons.saveData.show()
			}
		}
	}),
	changePassword: new Button('div', {
		classes: 'button_md button_primary',
		value: 'Изменить пароль',
		events: {
			click: () => {
				buttons.changeData.hide()
				buttons.changePassword.hide()
				buttons.logout.hide()
				buttons.savePassword.show()

				userDataForm.hide()
				userPasswordForm.show()
			}
		}
	}),
	logout: new Button('div', {
		classes: 'button_md button_error',
		value: 'Выйти',
		events: {
			click: () => {
				render('#app', Auth)
			}
		}
	}),
	saveData: new Button('button', {
		wrapperClasses: 'button button_md button_primary',
		value: 'Сохранить'
	}),
	savePassword: new Button('button', {
		wrapperClasses: 'button button_md button_primary',
		value: 'Сохранить пароль'
	})
}
const fields = {
	email: {
		input: new Input({
			validateRule: 'email',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'email',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	},
	login: {
		input: new Input({
			validateRule: 'login',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'login',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	},
	firstName: {
		input: new Input({
			validateRule: 'name',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'first_name',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	},
	secondName: {
		input: new Input({
			validateRule: 'name',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'second_name',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	},
	displayName: {
		input: new Input({
			validateRule: 'login',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'display_name',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	},
	phone: {
		input: new Input({
			validateRule: 'phone',
			wrapperClasses: 'flex flex-col items-start gap-1',
			type: 'text',
			name: 'phone',
			classes: 'input input_w-md input_fade',
			events: inputEvents
		}),
		label: new Text({
			classes: 'text-sm font-regular text-secondary',
			value: 'test'
		})
	}
}
const fieldsGroup = {
	email: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Почта'
			}),
			fields.email.label,
			fields.email.input
		],
		wrapperClasses: 'w-full'
	}),
	login: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Логин'
			}),
			fields.login.label,
			fields.login.input
		],
		wrapperClasses: 'w-full'
	}),
	firstName: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Имя'
			}),
			fields.firstName.label,
			fields.firstName.input
		],
		wrapperClasses: 'w-full'
	}),
	secondName: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Фамилия'
			}),
			fields.secondName.label,
			fields.secondName.input
		],
		wrapperClasses: 'w-full'
	}),
	displayName: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Имя в чате'
			}),
			fields.displayName.label,
			fields.displayName.input
		],
		wrapperClasses: 'w-full'
	}),
	phone: new Container({
		classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
		content: [
			new Text({
				classes: 'text-sm font-medium text-black',
				value: 'Телефон'
			}),
			fields.phone.label,
			fields.phone.input
		],
		wrapperClasses: 'w-full'
	})
}
const password = {
	old: new Input({
		validateRule: 'password',
		wrapperClasses: 'flex flex-col items-start gap-1 w-full mb-4',
		label: 'Старый пароль',
		type: 'password',
		name: 'old_password',
		classes: 'input input_fade w-full',
		events: inputEvents
	}),
	new: new Input({
		validateRule: 'password',
		wrapperClasses: 'flex flex-col items-start gap-1 w-full',
		label: 'Новый пароль',
		type: 'password',
		name: 'new_password',
		classes: 'input input_fade w-full',
		events: inputEvents
	})
}

const userDataForm = new Form({
	wrapperClasses: 'w-full',
	fields: [
		fieldsGroup.email,
		fieldsGroup.login,
		fieldsGroup.firstName,
		fieldsGroup.secondName,
		fieldsGroup.displayName,
		fieldsGroup.phone
	],
	controls: [
		buttons.changeData,
		buttons.changePassword,
		buttons.logout,
		buttons.saveData,
		buttons.savePassword
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

				buttons.changeData.show()
				buttons.changePassword.show()
				buttons.logout.show()
				buttons.saveData.hide()

				settings.setProps({ isEditing: false })
			}
		}
	}
})
const userPasswordForm = new Form({
	wrapperClasses: 'w-full',
	fields: [
		password.old,
		password.new
	],
	controls: [
		buttons.savePassword
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

				userPasswordForm.hide()
				buttons.changeData.show()
				buttons.changePassword.show()
				buttons.logout.show()
				buttons.savePassword.hide()
				userDataForm.show()
			}
		}
	}
})

const settings = new Settings({
	isEditing: false,
	form: [
		userDataForm,
		userPasswordForm
	],
	user: new User({
		avatarClasses: 'user__avatar_lg',
		usernameClasses: 'user__name_lg',
		wrapperClasses: 'flex flex-col items-center gap-3'
	}),
	wrapperClasses: 'wrapper wrapper_items-center rounded-md wrapper_fade wrapper_py-xl wrapper_my-auto wrapper_mx-auto wrapper_w-settings gap-10'
})

settings.componentDidMount = function () {
	if (this.props.isEditing) {
		for (let key in fields) {
			fields[key].input.show()
			fields[key].label.hide()
		}
	} else {
		for (let key in fields) {
			fields[key].input.hide()
			fields[key].label.show()
		}

		userPasswordForm.hide()
	}

	buttons.saveData.hide()
	buttons.savePassword.hide()
}

export default settings
