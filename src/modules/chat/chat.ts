import BaseComponent from '../../block/block'
import template from './chat.tmpl'
import './chat.scss'
import { props } from './types'

export default class Chat extends BaseComponent {
  constructor(props:props) {
    super('div', props)
  }

  render () {
    return this.compile(template, this.props)
  }

  componentDidMount() {
    if (!this.props.hasOwnProperty('dialogs')) {
      this.children.header.hide()
      this.children.control.hide()
    }
  }

  componentDidUpdate(oldProps, newProps): boolean {
    if (!this.props.hasOwnProperty('dialogs')) {
      this.children.header.hide()
      this.children.control.hide()
    } else {
      this.children.header.show()
      this.children.control.show()
    }

    return true
  }
}
