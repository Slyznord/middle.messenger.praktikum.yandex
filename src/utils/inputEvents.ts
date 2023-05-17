import Validator from './validator'

function validateInput (event:any) {
	const element = event.target
	const rule = element.getAttribute('validate-rule')

	if (Validator.validate(element, rule)) {
		element.classList.remove('input_error')
	} else {
		element.classList.add('input_error')
	}
}

export default {
	blur: validateInput,
	focus: validateInput
}
