import BaseComponent from '../../block/block'
import template from './auth.tmpl'

export default class Auth extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}
