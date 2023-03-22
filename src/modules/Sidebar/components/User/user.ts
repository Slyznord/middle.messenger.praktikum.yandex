import BaseComponent from '../../../../block/block'
import template from './user.tmpl'
import './user.scss'

export default class User extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}