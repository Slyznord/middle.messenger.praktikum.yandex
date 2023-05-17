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
import inputEvents from '../../utils/inputEvents'
import validatorRulesName from '../../constants/validatorRulesName'
import Validator from '../../utils/validator'
import template from './settings.tmpl'
import userController from '../../controllers/user.controller'
import { profile } from '../../api/user.api'
import store from '../../utils/store'
import connect from '../../utils/connect'
import { router } from '../../index'
import './settings.scss'

class Settings extends BaseComponent {
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
						userController.logout()
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

		super('div', {
			isEditingData: false,
			isEditingPassword: false,
			buttonBack: new Button('div', {
				classes: 'button_md button_primary settings__back',
				value: 'Назад',
				events: {
					click: () => {
						router.back()
					}
				}
			}),
			form: [
				new Form({
					wrapperClasses: 'w-full',
					fields: [
						new Container({
							name: 'email',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Почта'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.EMAIL,
									error: Validator.getErrorMessage(validatorRulesName.EMAIL),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'email',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						}),
						new Container({
							name: 'login',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Логин'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.LOGIN,
									error: Validator.getErrorMessage(validatorRulesName.LOGIN),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'login',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						}),
						new Container({
							name: 'first_name',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Имя'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.NAME,
									error: Validator.getErrorMessage(validatorRulesName.NAME),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'first_name',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						}),
						new Container({
							name: 'second_name',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Фамилия'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.NAME,
									error: Validator.getErrorMessage(validatorRulesName.NAME),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'second_name',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						}),
						new Container({
							name: 'display_name',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Имя в чате'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.LOGIN,
									error: Validator.getErrorMessage(validatorRulesName.LOGIN),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'display_name',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						}),
						new Container({
							name: 'phone',
							classes: 'container_items-center container_justify-between container_py-sm container_border-b w-full',
							content: [
								new Text({
									classes: 'text-sm font-medium text-black',
									value: 'Телефон'
								}),
								new Text({
									classes: 'text-sm font-regular text-secondary',
									value: ''
								}),
								new Input({
									validateRule: validatorRulesName.PHONE,
									error: Validator.getErrorMessage(validatorRulesName.PHONE),
									wrapperClasses: 'flex flex-col items-start gap-1',
									type: 'text',
									name: 'phone',
									classes: 'input input_w-md input_fade',
									events: inputEvents,
									value: ''
								})
							],
							wrapperClasses: 'w-full'
						})
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
							onSubmit(event).then((result:profile) => {
								userController.updateUser(result).then(() => {
									buttons.changeData.show()
									buttons.changePassword.show()
									buttons.logout.show()
									buttons.saveData.hide()
									buttons.cancelChangeData.hide()

									this.setProps({ isEditingData: false })
									this.onLoadedUserData()
								})
							})
						}
					}
				}),
				new Form({
					wrapperClasses: 'w-full',
					fields: [
						new Input({
							validateRule: validatorRulesName.PASSWORD,
							error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
							wrapperClasses: 'flex flex-col items-start gap-1 w-full mb-4',
							label: 'Старый пароль',
							type: 'password',
							name: 'old_password',
							classes: 'input input_fade w-full',
							events: inputEvents,
							value: ''
						}),
						new Input({
							validateRule: validatorRulesName.PASSWORD,
							error: Validator.getErrorMessage(validatorRulesName.PASSWORD),
							wrapperClasses: 'flex flex-col items-start gap-1 w-full',
							label: 'Новый пароль',
							type: 'password',
							name: 'new_password',
							classes: 'input input_fade w-full',
							events: inputEvents,
							value: ''
						})
					],
					controls: [
						buttons.savePassword,
						buttons.cancelChangePassword
					],
					events: {
						submit: (event:Event) => {
							onSubmit(event).then((result:any) => {
								userController.updatePassword(result).then(() => {
									this.setProps({ isEditingPassword: false })

									buttons.changeData.show()
									buttons.changePassword.show()
									buttons.logout.show()
									buttons.savePassword.hide()
									buttons.cancelChangePassword.hide()
								})
							})
						}
					}
				})
			],
			user: new User({
				avatarClasses: 'user__avatar_lg',
				usernameClasses: 'user__name_lg',
				wrapperClasses: 'flex flex-col items-center gap-3'
			}),
			wrapperClasses: 'wrapper wrapper_items-center rounded-md wrapper_fade wrapper_py-xl wrapper_my-auto wrapper_mx-auto wrapper_w-settings gap-10 relative'
		})

		buttons.saveData.hide()
		buttons.savePassword.hide()
		buttons.cancelChangeData.hide()
		buttons.cancelChangePassword.hide()

		userController.getUser().then(() => {
			this.onLoadedUserData()
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

	onLoadedUserData () {
		const state = store.getState()

		this.children.form[0].children.fields.forEach((container:any) => {
			container.children.content.forEach((field:any, index:number) => {
				if (!index) return

				field.setProps({ value: (state as any).user[container.props.name] })
			})
		})
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

function mapUserToProps(state:any) {
	return {
		user: state.user
	}
}

export default connect(Settings, mapUserToProps)