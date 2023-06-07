import Validator from './validator'

function validateInput (event:Event) {
	const { target } = event

	if (target === null) return

	const rule = (target as HTMLInputElement).getAttribute('validate-rule') || ''

	if (Validator.validate((target as HTMLInputElement), rule)) {
		(target as HTMLInputElement).classList.remove('input_error')
	} else {
		(target as HTMLInputElement).classList.add('input_error')
	}
}

export default {
	blur: validateInput,
	focus: validateInput
}
