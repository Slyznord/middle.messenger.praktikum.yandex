export default new class Validator {
	private readonly rules:object = {
		name: /^(?:[A-ZА-Я][a-zа-я]*)(?:-[A-ZА-Я][a-zа-я]*)?$/,
		login: /^(?=[a-zA-Z0-9._-]{3,20}$)(?!^\d+$)[a-zA-Z]+[a-zA-Z0-9_-]*$/,
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
		phone: /^\+?\d{10,15}$/,
		notEmpty: /.+/
	}

	public validate (element, rule):boolean {
		return this.rules[rule].test(element.value)
	}

	public validateAll(elements:HTMLInputElement[]):boolean {
		return Array.from(elements).every(item => this.validate(item, item.getAttribute('validate-rule')))
	}

	public getInvalidInputs(elements:HTMLInputElement[]):HTMLInputElement[] {
		return Array.from(elements).filter(item => !this.validate(item, item.getAttribute('validate-rule')))
	}
}

