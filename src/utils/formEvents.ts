import Validator from './validator'
import { Indexed } from './types'

function onSubmit (event:Event):Promise<object> {
  return new Promise((resolve):void => {
    event.preventDefault()

    const { target } = event

    if (target === null) return

    const inputs:HTMLInputElement[] = Array.from((target as HTMLElement).querySelectorAll('input') || [])
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
      resolve(preparedData as Indexed)
    }
  })
}

export { onSubmit }