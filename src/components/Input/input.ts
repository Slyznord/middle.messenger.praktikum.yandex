import BaseComponent from '../../block/block'
import template from './input.tmpl'
import './input.scss'

export default class Input extends BaseComponent {
  constructor(props) {
    super('div', props)
  }

  render():HTMLElement {
    return this.compile(template, this.props)
  }
}