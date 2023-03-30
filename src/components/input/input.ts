import BaseComponent from '../../block/block'
import template from './input.tmpl'
import './input.scss'
import { props } from './types'

export default class Input extends BaseComponent {
  constructor(props:props) {
    super('div', props)
  }

  render():DocumentFragment {
    return this.compile(template, this.props)
  }
}
