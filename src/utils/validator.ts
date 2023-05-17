import validatorRulesName from '../constants/validatorRulesName'

type Indexed = {
	[key:string]: any
}

export default new class Validator {
	private readonly rules:Indexed = {
		[validatorRulesName.NAME]: {
			regexp: /^(?:[A-ZА-Я][a-zа-я]*)(?:-[A-ZА-Я][a-zа-я]*)?$/,
			message: 'Первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
		},
		[validatorRulesName.LOGIN]: {
			regexp: /^(?=[a-zA-Z0-9._-]{3,20}$)(?!^\d+$)[a-zA-Z]+[a-zA-Z0-9_-]*$/,
			message: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).'
		},
		[validatorRulesName.EMAIL]: {
			regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			message: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'
		},
		[validatorRulesName.PASSWORD]: {
			regexp: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
			message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'
		},
		[validatorRulesName.PHONE]: {
			regexp: /^\+?\d{10,15}$/,
			message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.'
		},
		[validatorRulesName.NOT_EMPTY]: {
			regexp: /.+/,
			message: 'Поле не должно быть пустым'
		}
	}

	public validate (element:HTMLInputElement, rule:string):boolean {
		return this.rules[rule].regexp.test(element.value)
	}

	public validateAll(elements:HTMLInputElement[]):boolean {
		return Array.from(elements).every(item => this.validate(item, item.getAttribute('validate-rule') as string))
	}

	public getInvalidInputs(elements:HTMLInputElement[]):HTMLInputElement[] {
		return Array.from(elements).filter(item => !this.validate(item, item.getAttribute('validate-rule') as string))
	}

	public getErrorMessage (name:string) {
		return this.rules[name].message
	}
}

