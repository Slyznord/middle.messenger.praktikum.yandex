import Validator from './validator'

function onSubmit (event):Promise<string> {
  return new Promise((resolve):void => {
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
      resolve('')
    }
  })
}

export { onSubmit }