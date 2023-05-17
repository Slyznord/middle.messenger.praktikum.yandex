import Validator from './validator'

function onSubmit (event:any):Promise<object> {
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
      inputs.forEach((item:HTMLInputElement) => item.classList.remove('input_error'))
      console.log(preparedData)
      resolve(preparedData as any)
    }
  })
}

export { onSubmit }