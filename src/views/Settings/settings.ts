// Components, modules and layouts
import Button from '../../components/button/button'
import Container from '../../layouts/container/container'
import Form from '../../components/form/form'
import Input from '../../components/input/input'
import Text from '../../components/text/text'
import User from '../../modules/user/user'

// utils
import BaseComponent from '../../utils/block/block'
import { onSubmit } from '../../utils/formEvents'
import { router } from '../../index'
import inputEvents from '../../utils/inputEvents'
import validatorRulesName from '../../constants/validatorRulesName'
import Validator from '../../utils/validator'
import template from './settings.tmpl'
import './settings.scss'

export default class Settings extends BaseComponent {
	constructor() {
		const buttons = {
			changeData: new Button('div', {
				classes: 'button_md button_primary',
				value: 'Изменить данные',
				events: {
					click: () => {
						this.setProps({ isEditingData: true })

						buttons.changeData.hide()
						buttons.changePassword.hide()
						buttons.logout.hide()
						buttons.saveData.show()
						buttons.cancelChangeData.show()
					}
				}
			}),
			changePassword: new Button('div', {
				classes: 'button_md button_primary',
				value: 'Изменить пароль',
				events: {
					click: () => {
						this.setProps({ isEditingPassword: true })

						buttons.changeData.hide()
						buttons.changePassword.hide()
						buttons.logout.hide()
						buttons.savePassword.show()
						buttons.cancelChangePassword.show()
					}
				}
			}),
			logout: new Button('div', {
				classes: 'button_md button_error',
				value: 'Выйти',
				events: {
					click: () => {
						router.go('/')
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
			}),
			cancelChangeData: new Button('div', {
				classes: 'button button_md button_primary',
				value: 'Отмена',
				events: {
					click: () => {
						this.setProps({ isEditingData: false })

						buttons.changeData.show()
						buttons.changePassword.show()
						buttons.logout.show()
						buttons.saveData.hide()
						buttons.cancelChangeData.hide()
					}
				}
			}),
			cancelChangePassword: new Button('div', {
				classes: 'button button_md button_primary',
				value: 'Отмена',
				events: {
					click: () => {
						this.setProps({ isEditingPassword: false })

						buttons.changeData.show()
						buttons.changePassword.show()
						buttons.logout.show()
						buttons.savePassword.hide()
						buttons.cancelChangePassword.hide()
					}
				}
			})
		}
		const fields = {
			email: {
				input: new Input({
					validateRule: validatorRulesName.EMAIL,
					error: Validator.getErrorMessage(validatorRulesName.EMAIL),
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
					validateRule: validatorRulesName.LOGIN,
					error: Validator.getErrorMessage(validatorRulesName.LOGIN),
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
					validateRule: validatorRulesName.NAME,
					error: Validator.getErrorMessage(validatorRulesName.NAME),
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
					validateRule: validatorRulesName.NAME,
					error: Validator.getErrorMessage(validatorRulesName.NAME),
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
					validateRule: validatorRulesName.LOGIN,
					error: Validator.getErrorMessage(validatorRulesName.LOGIN),
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
					validateRule: validatorRulesName.PHONE,
					error: Validator.getErrorMessage(validatorRulesName.PHONE),
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
				validateRule: validatorRulesName.PASSWORD,
				error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
				wrapperClasses: 'flex flex-col items-start gap-1 w-full mb-4',
				label: 'Старый пароль',
				type: 'password',
				name: 'old_password',
				classes: 'input input_fade w-full',
				events: inputEvents
			}),
			new: new Input({
				validateRule: validatorRulesName.PASSWORD,
				error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
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
				buttons.savePassword,
				buttons.cancelChangeData
			],
			events: {
				submit: (event:Event) => {
					onSubmit(event).then(() => {
						buttons.changeData.show()
						buttons.changePassword.show()
						buttons.logout.show()
						buttons.saveData.hide()

						this.setProps({ isEditing: false })
					})
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
				buttons.savePassword,
				buttons.cancelChangePassword
			],
			events: {
				submit: (event:Event) => {
					onSubmit(event).then(() => {
						this.setProps({ isEditingPassword: false })

						buttons.changeData.show()
						buttons.changePassword.show()
						buttons.logout.show()
						buttons.savePassword.hide()
						buttons.cancelChangePassword.hide()
					})
				}
			}
		})

		buttons.saveData.hide()
		buttons.savePassword.hide()
		buttons.cancelChangeData.hide()
		buttons.cancelChangePassword.hide()

		super('div', {
			isEditingData: false,
			isEditingPassword: false,
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
	}

	onChangeUserData () {
		if (this.props.isEditingData) {
			this.children.form[0].children.fields.forEach((item:any) => {
				item.children.content[1].hide()
				item.children.content[2].show()
			})
		} else {
			this.children.form[0].children.fields.forEach((item:any) => {
				item.children.content[1].show()
				item.children.content[2].hide()
			})
		}

		this.children.form[1].hide()
	}

	onChangeUserPassword () {
		if (this.props.isEditingPassword) {
			this.children.form[0].hide()
			this.children.form[1].show()

			this.children.form[1].children.fields.forEach((item:any) => {
				item.show()
			})
		} else {
			this.children.form[0].show()
			this.children.form[1].hide()

			this.children.form[1].children.fields.forEach((item:any) => {
				item.hide()
			})
		}
	}

	componentDidMount() {
		this.onChangeUserData()
		this.onChangeUserPassword()
	}

	componentDidUpdate():boolean {
		this.onChangeUserData()
		this.onChangeUserPassword()
		return true
	}

	render () {
		return this.compile(template, this.props)
	}
}
