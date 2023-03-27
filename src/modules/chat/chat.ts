import BaseComponent from '../../block/block'
import template from './chat.tmpl'
import './chat.scss'

export default class Chat extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }
}
